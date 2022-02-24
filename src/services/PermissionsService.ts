import { api } from 'utils/ApiClient';

export const PermissionsService = {
	getPermissions: (): Promise<any> => api.get('/permissions'),
};
