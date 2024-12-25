import type { RouteRecordRaw } from 'vue-router';

// 静态路由
export const staticRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('@/views/HomeView/index.vue'),
		meta: {
			title: '主页'
		}
	}
];
