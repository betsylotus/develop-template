<template>
	<div class="file-upload-contaier">
		<el-upload multiple :http-request="handleUpload" :disabled="loading">
			<el-button type="primary" :loading="loading">
				{{ loading ? '上传中...' : '上传文件' }}
			</el-button>
		</el-upload>
		<el-alert v-if="error" :title="error" type="error" show-icon />
	</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useOss } from '@/hooks';

const { loading, error, initOSS, resumableUpload, uploadLargeFile } = useOss();

const handleUpload = async (options: any) => {
	try {
		const result = await resumableUpload(
			options.file.name,
			options.file,
			// 1MB 分片大小
			1024 * 1024
		);

		console.log('resumableUpload-result', result);

		options.onSuccess();
	} catch (e) {
		options.onError(e);
	}
};

/* const handleUpload = async (options: any) => {
	try {
		const result = await uploadLargeFile(options.file, options.file.name);

		console.log('handleUpload-result', result);

		options.onSuccess();
	} catch (e) {
		options.onError(e);
	}
}; */

onMounted(() => {
	initOSS();
});
</script>
