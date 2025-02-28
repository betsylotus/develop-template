import type { RouteRecordRaw } from 'vue-router';

// 静态路由
export const staticRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/mathjax'
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import('@/views/HomeView/index.vue')
	},
	{
		path: '/mathjax',
		name: 'MathJax',
		component: () => import('@/views/MathJax/index.vue')
	},
	{
		path: '/fileUpload',
		name: 'FileUpload',
		component: () => import('@/views/FileUpload/index.vue')
	}
];
