import { defineStore } from 'pinia';

export const useCounterStore = defineStore({
	id: 'counter',
	state: () => ({
		count: 10
	}),
	getters: {},
	actions: {}
});
