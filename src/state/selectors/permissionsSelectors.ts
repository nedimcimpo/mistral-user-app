import { RootState } from '../store';

export const selectPermissions = (state: RootState) => state.permissions.data;
