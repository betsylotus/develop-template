import type { App } from 'vue';

import { setupElementPlus } from './modules';

export const setupPlugins = (app: App) => {
	setupElementPlus(app);
};
