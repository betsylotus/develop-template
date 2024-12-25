import type { VNode } from 'vue';
import type Vue from 'vue';

declare module '*.tsx' {
	import Vue from 'compatible-vue';
	export default Vue;
}
