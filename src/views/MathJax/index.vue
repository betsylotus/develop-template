<template>
	<div class="mathjax-container">
		<MathContent :items="questionList"></MathContent>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { getQuestionList } from '@/api';

const questionList = ref<any[]>([]);

const fetchData = async () => {
	try {
		const { code, data } = await getQuestionList();
		if (code == 0) {
			questionList.value = data;
		}
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

onMounted(async () => {
	await fetchData();
});
</script>

<style scoped lang="less">
.mathjax-container {
	width: 100%;
	height: 100%;
}
</style>
