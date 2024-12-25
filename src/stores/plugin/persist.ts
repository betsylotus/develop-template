import type { Pinia } from 'pinia';
import {
	createPersistedState,
	type Serializer
} from 'pinia-plugin-persistedstate';
import { type Encryption, EncryptionFactory } from '@/utils';
import { isDevMode } from '@/utils';

// aes encryption key
const cacheCipher = {
	key: '_11111000001111@',
	iv: '@11111000001111_'
};

const { pkg, lastBuildTime } = __APP_INFO__;
const { name } = pkg;
const PERSIST_KEY_PREFIX: string = name;

const persistEncryption: Encryption = EncryptionFactory.createAesEncryption({
	key: cacheCipher.key,
	iv: cacheCipher.iv
});

// 自定义序列化器，用于序列化和反序列化存储数据
const customSerializer = (): Serializer => {
	if (!isDevMode()) {
		// 除了dev环境，其他的都加密
		return {
			deserialize: (value) => {
				const decrypted = persistEncryption.decrypt(value);
				return JSON.parse(decrypted);
			},
			serialize: (value) => {
				const serialized = JSON.stringify(value);
				return persistEncryption.encrypt(serialized);
			}
		};
	} else {
		return {
			deserialize: (value) => {
				return JSON.parse(value);
			},
			serialize: (value) => {
				return JSON.stringify(value);
			}
		};
	}
};

const createPersistedStateOptions = (keyPrefix: string) => {
	return {
		storage: localStorage,
		key: (id: any) => `${keyPrefix}__${id}`,
		serializer: customSerializer()
	};
};

export const registerPiniaPersistPlugin = (pinia: Pinia) => {
	pinia.use(
		createPersistedState(createPersistedStateOptions(PERSIST_KEY_PREFIX))
	);
};
