<template>
	<canvas ref="canvasRef"></canvas>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { paintBoard } from '@/utils';

const canvasRef = ref<HTMLCanvasElement>();

onMounted(() => {
	paintBoard.initCanvas(canvasRef.value as HTMLCanvasElement);
});
</script>

<style lang="less" scoped>
.fabric-container {
	width: 100%;
	height: 100%;
}
</style>
