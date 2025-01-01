import { http } from '@/utils';

export const getOssToken = (params: any) => {
	return http.post('', params);
};
