import OSS from 'ali-oss';
import { ref } from 'vue';
// import { getOssToken } from '@/api';

export function useOss() {
	const client = ref<any>(null);
	const loading = ref(false);
	const error = ref<string>('');

	const initOSS = async () => {
		try {
			loading.value = true;
			/* const { code, data } = await getOssToken({
				header: {
					schoolId: '275'
				},
				body: { stsType: 2, accountId: '181797' }
			});

			if (code === 0 && data) {
				const {
					aliyunAccessKeyId,
					aliyunAccessKeySecret,
					region,
					aliyunBucketName,
					aliyunSecurityToken
				} = data;

				client.value = new OSS({
					region,
					secure: true,
					accessKeyId: aliyunAccessKeyId,
					accessKeySecret: aliyunAccessKeySecret,
					bucket: aliyunBucketName,
					stsToken: aliyunSecurityToken,
					// 设置更长的超时时间
					timeout: 120000
				});
			} */
		} catch (e: any) {
			error.value = '初始化OSS失败: ' + e.message;
			console.error(e);
		} finally {
			loading.value = false;
		}
	};

	// 初始化分片上传
	const initMultipartUpload = async (objectName: string) => {
		if (!client.value) {
			throw new Error('OSS客户端未初始化');
		}
		try {
			const result = await client.value.initMultipartUpload(objectName);
			return result.uploadId;
		} catch (e: any) {
			error.value = '初始化分片上传失败：' + e.message;
			throw e;
		}
	};

	// 修改上传分片的函数，保留 ETag 的原始格式
	const uploadPart = async (
		objectName: string,
		uploadId: string,
		partNumber: number,
		chunk: Blob
	) => {
		if (!client.value) throw new Error('OSS客户端未初始化');
		try {
			const result = await client.value.uploadPart(
				objectName,
				uploadId,
				partNumber,
				chunk
			);
			// 保持 ETag 的原始格式，不做处理
			return {
				number: partNumber,
				etag: result.etag
			};
		} catch (e: any) {
			error.value = `上传分片${partNumber}失败: ${e.message}`;
			throw e;
		}
	};

	// 修改完成分片上传的函数
	const completeMultipartUpload = async (
		objectName: string,
		uploadId: string,
		parts: Array<{ number: number; etag: string }>
	) => {
		if (!client.value) {
			throw new Error('OSS客户端未初始化');
		}
		try {
			// 直接构造数组格式
			const formattedParts = parts
				.sort((a, b) => a.number - b.number)
				.map((part) => ({
					number: part.number,
					etag: part.etag
				}));

			console.log(
				'Debug - formattedParts:',
				JSON.stringify(formattedParts, null, 2)
			);

			// 确保使用正确的参数顺序和格式调用
			const result = await client.value.completeMultipartUpload(
				objectName,
				uploadId,
				formattedParts
				// {}, // 添加空的 options 参数
				// {} // 添加空的 headers 参数
			);
			return result;
		} catch (e: any) {
			console.error('Complete multipart upload error:', e);
			error.value = '完成分片上传失败: ' + e.message;
			throw e;
		}
	};

	const uploadLargeFile = async (file: File, objectName: string) => {
		// 1. 初始化分片上传
		const uploadId = await initMultipartUpload(objectName);

		// 2. 将文件分片
		const chunkSize = 1024 * 1024; // 1MB per chunk
		const chunks = Math.ceil(file.size / chunkSize);
		const parts = [];

		// 3. 上传所有分片

		for (let i = 0; i < chunks; i++) {
			const start = i * chunkSize;
			const end = Math.min(file.size, start + chunkSize);
			const chunk = file.slice(start, end);

			const result = await uploadPart(objectName, uploadId, i + 1, chunk);
			parts.push(result);
		}

		// 4. 所有分片上传完成后，调用完成接口
		const completeResult = await completeMultipartUpload(
			objectName,
			uploadId,
			parts
		);
		console.log('uploadLargeFile-completeResult', completeResult);
		return completeResult;
	};

	// 检查分片上传任务
	const listParts = async (objectName: string, uploadId: string) => {
		if (!client.value) throw new Error('OSS客户端未初始化');
		try {
			const result = await client.value.listParts(objectName, uploadId);
			return result.parts || [];
		} catch (e: any) {
			error.value = '获取分片列表失败：' + e.message;
			throw e;
		}
	};

	// 分片上传实现
	const resumableUpload = async (
		objectName: string,
		file: File,
		chunkSize: number
	) => {
		if (!client.value) throw new Error('OSS客户端未初始化');
		loading.value = true;
		error.value = '';

		try {
			const result = await client.value.multipartUpload(objectName, file, {
				// 并发上传分片数
				parallel: 4,
				// 分片大小
				partSize: chunkSize,
				// 2分钟超时
				timeout: 120000,
				// 上传进度
				progress: (p: number, checkpoint: any) => {
					// 可以通过 checkpoint 记录断点信息
					console.log('上传进度：', p * 100 + '%');
				},
				headers: {
					'Content-Type': file.type
				}
			});
			// 构造文件 URL
			const fileUrl = `https://${client.value.options.bucket}.${client.value.options.region}.aliyuncs.com/${objectName}`;

			return {
				...result,
				url: fileUrl,
				name: objectName
			};
		} catch (e: any) {
			if (e.code === 'ConnectionTimeoutError') {
				error.value = '上传超时，请重试';
			} else {
				error.value = '上传失败：' + e.message;
			}
			throw e;
		} finally {
			loading.value = false;
		}
	};

	// 上传文件
	const uploadFile = async (filename: string, fileData: File) => {
		try {
			if (!client.value) {
				throw new Error('OSS客户端未初始化');
			}
			const result = await client.value.put(filename, fileData);
			return result;
		} catch (e) {
			error.value = '上传文件失败';
			console.error(e);
			throw e;
		}
	};

	return {
		client,
		loading,
		error,
		initOSS,
		uploadFile,
		resumableUpload,
		initMultipartUpload,
		uploadPart,
		completeMultipartUpload,
		listParts,
		uploadLargeFile
	};
}
