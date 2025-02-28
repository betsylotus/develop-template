import { httpRequest } from '@/utils/modules/http';

/* export const getQuestionList = (params: any) => {
	return httpRequest.post('/api/question/list', params);
}; */

export const getQuestionList = (params?: any) => {
	return httpRequest.post(
		{
			url: '/api/question/list',
			withBaseURL: false,
			withCancel: true
		},
		params
	);
};
