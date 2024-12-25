import type { FileValidationError } from './enum';

/**
 * 文件验证选项接口
 */
export interface ValidateOptions {
	maxSize?: number; // 最大文件大小（MB）
	checkSize?: boolean; // 是否检查文件大小
	strictMode?: boolean; // 是否启用严格模式（魔数验证）
	checkExtension?: boolean; // 是否检查文件扩展名
	imageMaxWidth?: number; // 图片最大宽度
	imageMaxHeight?: number; // 图片最大高度
	checkImageDimension?: boolean; // 是否检查图片尺寸
	allowedTypes?: string[]; // 允许的文件类型
	allowedCategories?: string[]; // 允许的文件分类
	customValidator?: (file: File) => Promise<ValidateResult>; // 自定义验证函数
	validateMimeType?: boolean; // 是否验证 MIME 类型
	allowedExtensions?: string[]; // 允许的文件扩展名
}

/**
 * 验证结果接口
 */
export interface ValidateResult {
	valid: boolean;
	message?: string;
	error?: Error;
	errorType?: FileValidationError;
	details?: Record<string, any>;
}

/**
 * 文件类型分类接口
 */
export interface FileTypeCategory {
	name: string;
	types: string[];
	maxSize?: number;
	description?: string;
	allowedExtensions?: string[];
	imageMaxWidth?: number;
	imageMaxHeight?: number;
}
