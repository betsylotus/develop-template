import type {
	Method,
	AxiosError,
	AxiosResponse,
	AxiosRequestConfig
} from 'axios';

export type RequestMethods = Extract<
	Method,
	'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>;

export default class RequestHttp {
	request<T>(
		method: RequestMethods,
		url: string,
		param?: AxiosRequestConfig,
		axiosConfig?: AxiosRequestConfig
	): Promise<T>;
	post<T, P>(url: string, params?: P, config?: AxiosRequestConfig): Promise<T>;
	get<T, P>(url: string, params?: P, config?: AxiosRequestConfig): Promise<T>;
}
