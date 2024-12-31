import { mathJaxManager } from '@/utils';

export const setupMathJax = async () => {
	await mathJaxManager.init();
};
