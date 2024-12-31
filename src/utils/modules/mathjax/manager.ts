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
			tex: {
				inlineMath: [
					['$', '$'],
					['\\(', '\\)']
				],
				displayMath: [
					['$$', '$$'],
					['\\[', '\\]']
				],
				processEscapes: true
			},
			options: {
				skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
			},
			startup: {
				typeset: false
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
				script.src =
					'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
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
