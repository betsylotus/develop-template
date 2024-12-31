import type { App } from 'vue';

import { setupElementPlus, setupMathJax } from './modules';

const setupPlugins = (app: App) => {
	setupElementPlus(app);
};

export { setupPlugins, setupMathJax };
