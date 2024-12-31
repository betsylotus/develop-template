import type { RouteRecordRaw } from 'vue-router';

// 静态路由
export const staticRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('@/App.vue')
	}
];
