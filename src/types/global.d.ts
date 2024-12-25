// Vite
declare type Recordable<T = any> = Record<string, T>;

// 运行环境
type ViteUserNodeEnv = 'development' | 'production' | 'test';

// 打包压缩格式的类型声明
type ViteCompression = 'gzip' | 'brotli' | 'gzip,brotli' | 'none';

declare interface ViteEnv {
	VITE_USER_NODE_ENV: ViteUserNodeEnv;
	VITE_GLOB_APP_TITLE: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_REPORT: boolean;
	VITE_ROUTER_MODE: 'hash' | 'history';
	VITE_BUILD_COMPRESS: ViteCompression;
	VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
	VITE_DROP_CONSOLE: boolean;
	VITE_DEVTOOLS: boolean;
	VITE_PUBLIC_PATH: string;
	VITE_API_URL: string;
	VITE_CDN: boolean;
	VITE_SENTRY_AUTH_TOKEN: string;
}

interface ImportMetaEnv extends ViteEnv {
	__: unknown;
}

// app信息
declare const __APP_INFO__: {
	pkg: {
		name: string;
		version: string;
		dependencies: Recordable<string>;
		devDependencies: Recordable<string>;
	};
	lastBuildTime: string;
};
