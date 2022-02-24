import axios, { AxiosResponse, /*AxiosRequestConfig*/ } from 'axios';

const ApiClient = axios.create({
	baseURL: 'https://6214db4589fad53b1f219a01.mockapi.io'
});

const responseBody = (response: AxiosResponse) => response.data;

// here ih case we use auth we can put token and also we can catch errors from server and log them to sentry or wherever we want
/*ApiClient.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		if (token) {
			config.headers!.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);*/

export const api = {
	get: (url: string, params?: {}) => ApiClient.get(url, params).then(responseBody),
	post: (url: string, params: {}) => ApiClient.post(url, params).then(responseBody),
	put: (url: string, params: {}) => ApiClient.put(url, params).then(responseBody),
	delete: (url: string, params?: {}) => ApiClient.delete(url, params).then(responseBody)
};
