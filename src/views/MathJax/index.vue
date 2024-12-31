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

const params = ref({
	header: {
		schoolId: '244',
		accountId: '422751',
		keyword: '',
		limit: 10,
		offset: 1
	},
	questionSearchDTO: {
		baseSectionId: '101003',
		baseSubjectId: '103002',
		chapterCodes: [],
		knowledgeCodes: [],
		functionCodes: [],
		isStrictMatching: 0,
		sort: 1,
		sortType: 4,
		baseGradeCodes: null,
		questionTypes: null,
		difficulty: null,
		dataSourceIds: null,
		provinceId: ''
	},
	basketKey: '730e0150-d872-4b7c-9d13-4ebc4b7a1736',
	searchType: null
});

const fetchData = async () => {
	try {
		const res = await axios.post(
			'https://api.songguoedu.com/api/resource/resource/question/schoolQuestionPage',
			params.value
		);

		const {
			data: {
				data: { records }
			}
		} = res;

		questionList.value = records;
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
