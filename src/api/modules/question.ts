import { http } from '@/utils';

interface QuestionResponse {
	code: number;
	data: any[];
	message?: string;
}

export const getQuestionList = (): Promise<QuestionResponse> => {
	return http.post('/api/question/list');
};
