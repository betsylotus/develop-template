export interface MathJaxConfig {
	loader: {
		load: string[];
		source: {
			development: boolean;
		};
		timeout: number;
	};
	tex: {
		inlineMath: string[][];
		displayMath: string[][];
		processEscapes: boolean;
		packages: {
			'[+]': string[];
		};
	};
	options: {
		skipHtmlTags: string[];
		enableMenu: boolean;
	};
	startup: {
		typeset: boolean;
	};
	svg: {
		scale: number;
		minScale: number;
		maxScale: number;
		fontCache: string;
		mtextInheritFont: boolean;
		merrorInheritFont: boolean;
		mathmlSpacing: boolean;
	};
	chtml: {
		scale: number;
		minScale: number;
		matchFontHeight: boolean;
		displayAlign: string;
		displayIndent: string;
		adaptiveCSS: boolean;
		exFactor: number;
		mtextInheritFont: boolean;
		merrorInheritFont: boolean;
	};
	output: {
		displayOverflow: string;
		linebreaks: {
			inline: boolean;
			width: string;
		};
	};
}

declare global {
	interface Window {
		MathJax: any;
	}
}
