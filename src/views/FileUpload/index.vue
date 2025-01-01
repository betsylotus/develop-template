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

const { loading, error, initOSS, uploadFile } = useOss();

const handleUpload = async (options: any) => {
	try {
		await uploadFile(options.file.name, options.file);
		options.onSuccess();
	} catch (e) {
		options.onError(e);
	}
};

onMounted(() => {
	initOSS();
});
</script>
