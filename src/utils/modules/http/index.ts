import Axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosError,
	type AxiosResponse
} from 'axios';

// 创建增强Promise的类型定义
type EnhancedPromise<T> = Promise<T> & { cancel?: () => void };

// 定义请求URL的接口
interface RequestUrlConfig {
	url: string;
	// 是否拼接baseurl
	withBaseURL?: boolean;
	// 是否需要取消请求
	withCancel?: boolean;
}

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

class HttpRequest {
	private axiosInstance: AxiosInstance = Axios.create(defaultConfig);

	// 存储pending中的请求
	private pendingRequests: Map<string, AbortController> = new Map();

	constructor() {
		// 初始化请求拦截
		this.httpInterceptorsRequest();
		// 初始化响应拦截
		this.httpInterceptorsResponse();
	}

	/**
	 * 处理URL配置
	 * @param urlConfig URL配置对象或字符串
	 */
	private handleUrl(urlConfig: RequestUrlConfig | string): AxiosRequestConfig {
		if (typeof urlConfig === 'string') {
			return {};
		}

		const config: AxiosRequestConfig = {};
		if (!urlConfig.withBaseURL) {
			// 如果withBaseURL为false或者undefined ，设置baseURL为空
			config.baseURL = '';
		}
		return config;
	}

	/**
	 * 获取实际URL
	 * @param urlConfig URL配置对象或字符串
	 */
	private getActualUrl(urlConfig: RequestUrlConfig | string): string {
		return typeof urlConfig === 'string' ? urlConfig : urlConfig.url;
	}

	/**
	 * 生成请求的唯一key
	 * @param url 请求URL
	 * @param config 请求配置
	 */
	private generateRequestKey(url: string, config: AxiosRequestConfig): string {
		const { method = 'get', params, data } = config;
		// 将URL、method以及参数组合成一个唯一字符串
		return [
			url,
			method.toLowerCase(),
			params ? JSON.stringify(params) : '',
			data ? JSON.stringify(data) : '',
			Date.now() // 添加时间戳保证唯一性
		].join('&');
	}

	// 添加请求到队列
	private addPendingRequest(
		url: string,
		controller: AbortController,
		config: AxiosRequestConfig
	) {
		const requestKey = this.generateRequestKey(url, config);
		this.pendingRequests.set(requestKey, controller);
		return requestKey; // 返回生成的key，用于后续移除
	}

	// 从队列中移除请求
	private removePendingRequest(requestKey: string) {
		this.pendingRequests.delete(requestKey);
	}

	// 取消指定URL的请求（需要完整requestKey）
	public cancelRequest(requestKey: string) {
		const controller = this.pendingRequests.get(requestKey);
		if (controller) {
			controller.abort();
			this.removePendingRequest(requestKey);
		}
	}

	// 取消所有pending中的请求
	public cancelAllRequests() {
		this.pendingRequests.forEach((controller) => {
			controller.abort();
		});
		this.pendingRequests.clear();
	}

	/** 请求拦截 */
	private httpInterceptorsRequest(): void {
		this.axiosInstance.interceptors.request.use(
			(config) => {
				if (config.headers && typeof config.headers.set === 'function') {
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
		this.axiosInstance.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response;
				return data;
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);
	}

	// 修改请求方法
	private request<T>(
		config: AxiosRequestConfig,
		withCancel?: boolean
	): EnhancedPromise<T> {
		// 创建 AbortController
		const controller = new AbortController();

		const url = this.getActualUrl(config.url as string);

		// 如果存在相同请求，则取消之前的请求
		// this.cancelRequest(url);

		// 将新请求添加到队列，并获取唯一key
		const requestKey = this.addPendingRequest(url, controller, config);

		// 添加 signal 到请求配置
		config.signal = controller.signal;

		// 创建取消函数
		const cancel = () => {
			this.cancelRequest(requestKey);
		};

		// 创建请求Promise
		const promise = new Promise<T>((resolve, reject) => {
			this.axiosInstance
				.request(config)
				.then((res) => {
					this.removePendingRequest(requestKey);
					resolve(res as T);
				})
				.catch((err) => {
					this.removePendingRequest(requestKey);
					reject(err);
				});
		});

		// 根据withCancel参数决定返回类型
		// return withCancel ? { promise, cancel } : promise;

		// 创建增强的Promise对象
		const enhancedPromise = promise as EnhancedPromise<T>;

		// 如果需要取消功能，则添加cancel方法
		if (withCancel) {
			enhancedPromise.cancel = cancel;
		}

		return enhancedPromise;
	}

	/** 常用请求方法封装 */
	get<T = any>(
		urlConfig: RequestUrlConfig | string,
		params?: object,
		_object = {}
	): EnhancedPromise<T> {
		const actualUrl = this.getActualUrl(urlConfig);
		const withCancel =
			typeof urlConfig !== 'string' && urlConfig.withCancel === true;
		const config: AxiosRequestConfig = {
			...this.handleUrl(urlConfig),
			..._object,
			url: actualUrl,
			method: 'get',
			params
		};
		return this.request<T>(config, withCancel);
	}

	post<T = any>(
		urlConfig: RequestUrlConfig | string,
		params?: object | string,
		_object = {}
	): EnhancedPromise<T> {
		const actualUrl = this.getActualUrl(urlConfig);
		const withCancel =
			typeof urlConfig !== 'string' && urlConfig.withCancel === true;
		const config: AxiosRequestConfig = {
			...this.handleUrl(urlConfig),
			..._object,
			url: actualUrl,
			method: 'post',
			data: params
		};
		return this.request<T>(config, withCancel);
	}

	put<T = any>(
		urlConfig: RequestUrlConfig | string,
		params?: object,
		_object = {}
	): EnhancedPromise<T> {
		const actualUrl = this.getActualUrl(urlConfig);
		const withCancel =
			typeof urlConfig !== 'string' && urlConfig.withCancel === true;
		const config: AxiosRequestConfig = {
			...this.handleUrl(urlConfig),
			..._object,
			url: actualUrl,
			method: 'put',
			data: params
		};
		return this.request<T>(config, withCancel);
	}

	delete<T = any>(
		urlConfig: RequestUrlConfig | string,
		params?: any,
		_object = {}
	): EnhancedPromise<T> {
		const actualUrl = this.getActualUrl(urlConfig);
		const withCancel =
			typeof urlConfig !== 'string' && urlConfig.withCancel === true;
		const config: AxiosRequestConfig = {
			...this.handleUrl(urlConfig),
			..._object,
			url: actualUrl,
			method: 'delete',
			params
		};
		return this.request<T>(config, withCancel);
	}
}

export const httpRequest = new HttpRequest();
