import type { MathJaxConfig } from './types';

export class MathJaxManager {
	private static instance: MathJaxManager;
	private initializationPromise: Promise<void> | null = null;

	private constructor() {}

	public static getInstance(): MathJaxManager {
		if (!MathJaxManager.instance) {
			MathJaxManager.instance = new MathJaxManager();
		}
		return MathJaxManager.instance;
	}

	private getConfig(): MathJaxConfig {
		return {
			loader: {
				// 加载特定组件
				load: [
					// TeX 输入
					'input/tex',
					// MathML 输入
					'input/mml',
					// AsciiMath 输入
					'input/asciimath',

					// CommonHTML 输出
					'output/chtml',

					// SVG 输出
					// 'output/svg',

					// 物理公式扩展
					'[tex]/physics',
					// 化学公式扩展
					'[tex]/mhchem',

					// 颜色扩展
					'[tex]/color',
					// 边框扩展
					'[tex]/bbox',
					// 粗体符号扩展
					'[tex]/boldsymbol'
				],
				// 开发相关配置
				source: {
					// 是否使用开发版本（未压缩的源码）
					development: true
				},
				// 加载超时设置
				timeout: 60 * 1000 // 加载超时时间（毫秒）
			},
			tex: {
				// 定义行内数学公式的分隔符
				inlineMath: [
					['$', '$'],
					['\\(', '\\)']
				],
				// 定义块级数学公式的分隔符
				displayMath: [
					['$$', '$$'],
					['\\[', '\\]']
				],
				// 允许使用反斜杠 \ 来转义数学符号
				processEscapes: true,
				packages: {
					'[+]': ['physics', 'mhchem'] // 启用扩展包
				}
			},
			options: {
				// 忽略这些标签中的数学公式
				skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
				// 关闭右键菜单
				enableMenu: false
			},
			startup: {
				// 关闭自动渲染，使用 手动渲染
				typeset: false
			},
			// SVG 输出
			svg: {
				// 输出比例
				scale: 1,
				// 最小缩放
				minScale: 0.5,
				// 最大缩放
				maxScale: 3,
				// 字体缓存策略
				fontCache: 'local',
				// mtext 元素是否继承页面字体
				mtextInheritFont: false,
				// merror 元素是否继承页面字体
				merrorInheritFont: true,
				// 是否使用 MathML 间距规则
				mathmlSpacing: false
			},
			// CommonHTML 输出
			chtml: {
				// 输出比例
				scale: 1,
				// 最小缩放
				minScale: 0.5,

				// 显示对齐方式 ('left', 'center', 'right')
				displayAlign: 'center',
				// 显示缩进
				displayIndent: '0',

				// 是否使用自适应CSS

				// 推荐在以下场景禁用
				// 当您的页面：
				// - 包含大量数学公式
				// - 需要快速渲染
				// - 公式类型比较固定
				adaptiveCSS: false,

				// 推荐在以下场景启用
				// 当您的页面：
				// - 数学公式较少
				// - 动态加载内容
				// - 内存使用敏感
				// - 初始加载时间重要
				// adaptiveCSS: true,

				// 基于 ex 高度的缩放因子
				// ex 高度 = 字体大小的一半
				// 例如：
				// 如果字体大小是 16px
				// 则 1ex = 16px × 0.5 = 8px
				exFactor: 0.5,

				// 是否匹配周围文本的行高
				matchFontHeight: true,

				// mtext 是否继承页面字体
				// mtextInheritFont: true 时
				// mtext 文本将：
				// 1. 使用页面的字体样式
				// 2. 继承父元素的字体属性
				// 3. 保持与周围文本一致的外观
				// 适用于：
				// - 需要与页面文本保持一致性
				// - 多语言支持（特别是中文、日文等）
				// - 品牌字体统一

				// mtextInheritFont: false 时
				// mtext 文本将：
				// 1. 使用 MathJax 的数学字体
				// 2. 可能与周围文本看起来不一致
				// 适用于：
				// - 需要数学风格的一致性
				// - 使用特殊数学字体
				// - 传统数学排版
				mtextInheritFont: true,

				// 错误信息是否继承页面字体
				// merrorInheritFont: true 时
				// 错误信息将：
				// 1. 使用页面的字体样式
				// 2. 继承父元素的字体属性
				// 3. 更容易阅读和识别

				// merrorInheritFont: false 时
				// 错误信息将：
				// 1. 使用 MathJax 的默认数学字体
				// 2. 可能不易阅读
				merrorInheritFont: true
			},
			output: {
				// 控制公式溢出时的行为
				// 'scroll' 时，公式溢出时会显示滚动条
				// 'auto' 时，公式溢出时会自动判断
				// 'truncate' 时，公式溢出时会截断溢出部分
				// 'hidden' 时，公式溢出时会隐藏溢出部分
				displayOverflow: 'auto',

				linebreaks: {
					// 是否允许内联公式换行
					inline: false,
					// 换行宽度
					width: '100%'
				}
			}
		};
	}

	public init(): Promise<void> {
		if (this.initializationPromise) {
			return this.initializationPromise;
		}

		if (window.MathJax) {
			console.log('MathJax already initialized');
			return Promise.resolve();
		}

		this.initializationPromise = new Promise((resolve, reject) => {
			try {
				window.MathJax = this.getConfig();

				const script = document.createElement('script');
				// 使用 tex-mml-chtml.js
				script.src =
					'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';

				// 使用 tex-svg.js
				// script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';

				script.async = true;

				script.onload = () => {
					console.log('MathJax loaded successfully');
					resolve();
				};

				script.onerror = () => {
					console.error('Failed to load MathJax');
					reject();
				};
				document.head.appendChild(script);
			} catch (error) {
				console.error('MathJax initialization error:', error);
				reject(error);
			}
		});

		return this.initializationPromise;
	}

	public async renderElement(element: HTMLElement): Promise<void> {
		try {
			await this.init();

			if (window.MathJax?.typesetPromise) {
				await window.MathJax.typesetPromise([element]);
			}
		} catch (error) {
			console.error('MathJax rendering error:', error);
		}
	}
}
