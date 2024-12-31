export interface MathJaxConfig {
	tex: {
		inlineMath: string[][];
		displayMath: string[][];
		processEscapes: boolean;
	};
	options: {
		skipHtmlTags: string[];
	};
	startup: {
		typeset: boolean;
	};
}

declare global {
	interface Window {
		MathJax: any;
	}
}
