import { type App, type Component } from 'vue';

import * as globComponents from './modules';

export const setupGlobComponents = (app: App) => {
	// 全局注册组件
	Object.keys(globComponents).forEach((key) => {
		app.component(key, (globComponents as { [key: string]: Component })[key]);
	});
};
