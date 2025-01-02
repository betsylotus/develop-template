import Axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosError,
	type AxiosResponse
} from 'axios';

const defaultConfig: AxiosRequestConfig = {
	// 默认地址请求地址，可在 .env.** 文件中修改
	// baseURL: import.meta.env.VITE_API_URL as string,
	// 跨域时候允许携带凭证
	withCredentials: true,
	// 请求超时时间
	timeout: 1000 * 30,
	headers: {
		'Content-Type': 'application/json'
	}
};

class RequestHttp {
	/** 保存当前`Axios`实例对象 */
	private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

	constructor() {
		// 初始化请求拦截
		this.httpInterceptorsRequest();
		// 初始化响应拦截
		this.httpInterceptorsResponse();
	}

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

	/** 常用请求方法封装 */
	get(url: string, params?: object, _object = {}): Promise<any> {
		return RequestHttp.axiosInstance.get(url, { params, ..._object });
	}
	post(url: string, params?: object | string, _object = {}): Promise<any> {
		return RequestHttp.axiosInstance.post(url, params, _object);
	}
	put(url: string, params?: object, _object = {}): Promise<any> {
		return RequestHttp.axiosInstance.put(url, params, _object);
	}
	delete(url: string, params?: any, _object = {}): Promise<any> {
		return RequestHttp.axiosInstance.delete(url, { params, ..._object });
	}
}

export const http = new RequestHttp();
