// 引入样式
import '@/styles';

import App from '@/App.vue';
import { createApp } from 'vue';

import { setupStore } from '@/stores';
import { setupPlugins } from '@/plugins';
import { setupRouter, router } from '@/router';
import { setupDirectives } from '@/directives';
import { setupGlobComponents } from '@/components';

import { setupMathJax } from '@/plugins';

const bootstrap = async () => {
	// 确保 MathJax 在应用启动前加载
	await setupMathJax();

	const app = createApp(App);

	// 配置store
	setupStore(app);

	// 配置路由
	setupRouter(app);

	await router.isReady();

	// 配置插件
	setupPlugins(app);

	// 配置指令
	setupDirectives(app);

	// 配置自定义组件
	setupGlobComponents(app);

	app.mount('#app');
};

bootstrap();
