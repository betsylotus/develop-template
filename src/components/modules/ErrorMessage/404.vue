<template>
	<div class="not-container">
		<div class="not-detail">
			<h2>404</h2>
			<h4>抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️</h4>
			<el-button type="primary" @click="router.back"> 返回上一页 </el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped lang="less"></style>
