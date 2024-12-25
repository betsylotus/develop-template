import type { RouteRecordRaw } from 'vue-router';

export const errorRoutes: RouteRecordRaw[] = [
	{
		// 解决刷新页面,route warnings
		path: '/:pathMatch(.*)*',
		component: () => import('@/components/modules/ErrorMessage/404.vue')
	}
];
