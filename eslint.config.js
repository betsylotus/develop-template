import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default [
	{
		name: 'app/files-to-lint',
		files: ['**/*.{ts,mts,tsx,vue}']
	},

	{
		name: 'app/files-to-ignore',
		ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
	},

	...pluginVue.configs['flat/essential'],
	...vueTsEslintConfig(),
	skipFormatting,
	{
		rules: {
			// vue规则
			'vue/multi-word-component-names': 0,

			// typescript规则
			'@typescript-eslint/no-unused-vars': 0,
			'@typescript-eslint/no-explicit-any': 0,
			'@typescript-eslint/no-empty-object-type': 0,
			'@typescript-eslint/no-unused-expressions': 0,
			'@typescript-eslint/ban-ts-comment': 0
		}
	},
	{
		// 忽略文件
		ignores: [
			'**/dist',
			'./src/main.ts',
			'.vscode',
			'.idea',
			'*.sh',
			'**/node_modules',
			'*.md',
			'*.woff',
			'*.woff',
			'*.ttf',
			'yarn.lock',
			'package-lock.json',
			'/public',
			'/docs',
			'**/output',
			'.husky',
			'.local',
			'/bin',
			'Dockerfile'
		]
	}
];
