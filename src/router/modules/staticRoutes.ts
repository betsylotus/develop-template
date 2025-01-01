import type { RouteRecordRaw } from 'vue-router';

// 静态路由
export const staticRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/mathjax'
	},
	{
		path: '/home',
		component: () => import('@/views/HomeView/index.vue')
	},
	{
		path: '/mathjax',
		component: () => import('@/views/MathJax/index.vue')
	},
	{
		path: '/fileUpload',
		component: () => import('@/views/FileUpload/index.vue')
	}
];
