import Axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosError,
	type AxiosResponse
} from 'axios';
import type { RequestMethods } from './types.d';

const defaultConfig: AxiosRequestConfig = {
	// 默认地址请求地址，可在 .env.** 文件中修改
	baseURL: import.meta.env.VITE_API_URL as string,
	// 跨域时候允许携带凭证
	withCredentials: true,
	// 请求超时时间
	timeout: 1000 * 30,
	headers: {
		'Content-Type': 'application/json'
	}
};

class RequestHttp {
	constructor() {
		// 初始化请求拦截
		this.httpInterceptorsRequest();
		// 初始化响应拦截
		this.httpInterceptorsResponse();
	}

	/** 初始化配置对象 */
	private static initConfig: AxiosRequestConfig = {};

	/** 保存当前`Axios`实例对象 */
	private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

	/** 请求拦截 */
	private httpInterceptorsRequest(): void {
		RequestHttp.axiosInstance.interceptors.request.use(
			(config) => {
				if (config.headers && typeof config.headers.set === 'function') {
					config.headers.set('x-access-token', `${'adminadmin'}`);
				}
				return config;
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);
	}

	/** 响应拦截 */
	private httpInterceptorsResponse(): void {
		const instance = RequestHttp.axiosInstance;
		instance.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response;
				return data;
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);
	}

	/** 通用请求工具函数 */
	public request<T>(
		method: RequestMethods,
		url: string,
		param?: AxiosRequestConfig,
		axiosConfig?: AxiosRequestConfig
	): Promise<T> {
		const config = {
			method,
			url,
			...param,
			...axiosConfig
		} as AxiosRequestConfig;

		// 单独处理自定义请求/响应回调
		return new Promise((resolve, reject) => {
			RequestHttp.axiosInstance
				.request(config)
				.then((response: any) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	/** 单独抽离的`post`工具函数 */
	public post<T, P>(
		url: string,
		params?: AxiosRequestConfig<P>,
		config?: AxiosRequestConfig
	): Promise<T> {
		return this.request<T>('post', url, params, config);
	}

	/** 单独抽离的`get`工具函数 */
	public get<T, P>(
		url: string,
		params?: AxiosRequestConfig<P>,
		config?: AxiosRequestConfig
	): Promise<T> {
		return this.request<T>('get', url, params, config);
	}
}

export const http = new RequestHttp();
