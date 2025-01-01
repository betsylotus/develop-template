import OSS from 'ali-oss';
import { ref } from 'vue';
import { getOssToken } from '@/api';

export function useOss() {
	const client = ref<any>(null);
	const loading = ref(false);
	const error = ref<string>('');

	const initOSS = async () => {
		try {
			loading.value = true;
			const { code, data } = await getOssToken({});

			if (code === 0 && data) {
				const {
					aliyunAccessKeyId,
					aliyunAccessKeySecret,
					region,
					aliyunBucketName,
					aliyunSecurityToken
				} = data;

				client.value = new OSS({
					region,
					secure: true,
					accessKeyId: aliyunAccessKeyId,
					accessKeySecret: aliyunAccessKeySecret,
					bucket: aliyunBucketName,
					stsToken: aliyunSecurityToken
				});
			}
		} catch (e) {
			error.value = '初始化OSS失败';
			console.error(e);
		} finally {
			loading.value = false;
		}
	};

	const uploadFile = async (filename: string, fileData: File) => {
		try {
			if (!client.value) {
				throw new Error('OSS客户端未初始化');
			}
			const result = await client.value.put(filename, fileData);
			return result;
		} catch (e) {
			error.value = '上传文件失败';
			console.error(e);
			throw e;
		}
	};

	return {
		client,
		loading,
		error,
		initOSS,
		uploadFile
	};
}
