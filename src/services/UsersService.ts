import qs from 'qs';
import { api } from 'utils/ApiClient';

export const UsersService = {
	getUsers: (params: any): Promise<any> => api.get(`/users?${qs.stringify(params)}`),
	getUser: (params: any): Promise<any> => api.get(`/users/${params.id}`),
	editUser: (params: any): Promise<any> => api.put(`/users/${params.id}`, params.data),
	deleteUser: (params: any): Promise<any> => api.delete(`/users/${params.id}`),
	addUser: (data: any): Promise<any> => api.post(`/users`, data)
};
