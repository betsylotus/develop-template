import {
	type Router,
	createRouter,
	createWebHistory,
	createWebHashHistory
} from 'vue-router';
import { type App } from 'vue';
import { staticRoutes, errorRoutes } from './modules';

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];

type modeType = 'hash' | 'history';
const mode: modeType = import.meta.env.VITE_ROUTER_MODE;

const routerMode = {
	hash: () => createWebHashHistory(),
	history: () => createWebHistory()
};

// 创建路由实例
export const router: Router = createRouter({
	history: routerMode[mode](),
	routes: [...staticRoutes, ...errorRoutes],
	// 是否应该禁止尾部斜杠,默认为false
	strict: false,
	scrollBehavior: () => ({
		left: 0,
		top: 0
	})
});

router.beforeEach(() => {});

router.afterEach(() => {});

router.onError((error) => {
	console.warn('路由错误', error.message);
});

// 配置路由器
export const setupRouter = (app: App<Element>) => {
	app.use(router);
};

export const resetRouter = () => {
	router.getRoutes().forEach((route) => {
		const { name } = route;
		if (name && !WHITE_NAME_LIST.includes(name as string)) {
			router.hasRoute(name) && router.removeRoute(name);
		}
	});
};
