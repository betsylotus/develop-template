<template>
	<div class="mathjax-container">
		<MathContent :items="questionList"></MathContent>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { mathJaxManager } from '@/utils';

import axios from 'axios';

const questionList = ref<any[]>([]);

const fetchData = async () => {
	try {
		const res = await axios.post('/api/question/list');
		questionList.value = res.data.data.list;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

onMounted(async () => {
	await mathJaxManager.init();
	await fetchData();
});
</script>

<style scoped lang="less">
.mathjax-container {
	width: 100%;
	height: 100%;
}
</style>
