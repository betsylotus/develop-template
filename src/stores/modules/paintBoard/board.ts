import { defineStore } from 'pinia';
import { ActionMode } from '@/constants';
export const useBoardStore = defineStore('board', {
	state: () => ({
		mode: ActionMode.FREE_DRAW
	}),
	getters: {},
	actions: {}
});
