import { defineStore } from 'pinia';

export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		username: 'admin'
	}),
	getters: {},
	actions: {}
});
