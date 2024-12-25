import type { PluginOption } from 'vite';
import { cdn } from './cdn';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import removeConsole from 'vite-plugin-remove-console';
// import { sentryVitePlugin } from '@sentry/vite-plugin';

const createVitePlugins = (
	viteEnv: ViteEnv
): (PluginOption | PluginOption[])[] => {
	const {
		VITE_DEVTOOLS,
		VITE_REPORT,
		VITE_DROP_CONSOLE,
		VITE_CDN,
		VITE_SENTRY_AUTH_TOKEN
	} = viteEnv;
	return [
		vue(),
		// vue 可以使用 jsx/tsx 语法
		vueJsx(),
		// devTools
		VITE_DEVTOOLS &&
			vueDevTools({
				launchEditor: 'code'
			}),
		/* sentryVitePlugin({
			// 组织名称
			org: '4508282715439104',
			// 要接入监控系统的项目
			project: '4508282723631104',
			// sentry管理后台平台地址，与dsn相呼应
			url: 'https://e58addca6004335b4bdda79026cb806b@o4508278619176960.ingest.us.sentry.io/4508282723631104',
			// 上传SourceMap的路径代码，一般我们只会分析js文件代码
			include: './dist/js',
			ignore: ['node_modules', 'vite.config.ts'],
			// 尤一定要先清洗再上传，否则资源越积越多
			cleanArtifacts: true, // 先清理再上传
			// 线上对应的url资源的相对路径
			urlPrefix: '~/js',
			authToken: VITE_SENTRY_AUTH_TOKEN,
			release: VITE_SOURCEMAP_RELEASE
		}), */
		// 打包压缩配置
		createCompression(viteEnv),
		// 是否生成包预览，分析依赖包大小做优化处理
		VITE_REPORT &&
			(visualizer({
				filename: 'stats.html',
				gzipSize: true,
				brotliSize: true
			}) as PluginOption),
		// 删除console
		VITE_DROP_CONSOLE &&
			removeConsole({
				external: ['src/assets/iconfont/iconfont.js']
			})
		// VITE_CDN ? cdn : null
	];
};

const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
	const {
		VITE_BUILD_COMPRESS = 'none',
		VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
	} = viteEnv;

	const compressList = VITE_BUILD_COMPRESS.split(',');

	const plugins: PluginOption[] = [];

	if (compressList.includes('gzip')) {
		plugins.push(
			viteCompression({
				ext: '.gz',
				algorithm: 'gzip',
				deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
			})
		);
	}
	if (compressList.includes('brotli')) {
		plugins.push(
			viteCompression({
				ext: '.br',
				algorithm: 'brotliCompress',
				deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
			})
		);
	}
	return plugins;
};

export { createVitePlugins };
