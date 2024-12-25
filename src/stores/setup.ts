import type { Pinia } from 'pinia';

import type { App } from 'vue';

import { createPinia } from 'pinia';

import { registerPiniaPersistPlugin } from './plugin/persist';

let pinia: Pinia;

// 初始化pinia
export const setupStore = (app: App) => {
	pinia = createPinia();
	registerPiniaPersistPlugin(pinia);
	app.use(pinia);
	return pinia;
};

// 重置pinia
export const resetAllStores = () => {
	if (!pinia) {
		console.error('Pinia is not installed');
		return;
	}
	const allStores = (pinia as any)._s;
	for (const [_key, store] of allStores) {
		store.$reset();
	}
};
