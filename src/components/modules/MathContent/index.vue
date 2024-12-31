<template>
	<div class="math-content">
		<div
			v-for="(item, index) in items"
			:key="index"
			class="math-item"
			v-html="renderMathContent(item.title, index)"
			ref="mathElements"
		></div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import type { MathContentProps } from './types';
import { mathJaxManager } from '@/utils';

const props = defineProps<MathContentProps>();
const mathElements = ref<HTMLElement[]>([]);

const renderMathJax = async (element: HTMLElement) => {
	if (element) {
		await mathJaxManager.renderElement(element);
	}
};

const renderMathContent = (content: string, index: number) => {
	if (!content) return '';

	nextTick(() => {
		if (mathElements.value[index]) {
			renderMathJax(mathElements.value[index]);
		}
	});

	return content;
};

onMounted(async () => {
	await nextTick();
	for (const element of mathElements.value) {
		await renderMathJax(element);
	}
});
</script>

<style scoped>
.math-content {
	width: 100%;
}

.math-item {
	margin-bottom: 5rem;
	border: 1px solid #ccc;
}
</style>
