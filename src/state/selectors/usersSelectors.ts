import { RootState } from '../store';
import { STATUS } from 'utils/constants';

export const selectUsers = (state: RootState) => state.users.getUsers.data;
export const selectUsersRequest = (state: RootState) => state.users.getUsers.status === STATUS.PENDING;

export const selectUser = (state: RootState) => state.users.getUser.data;
export const selectUserRequest = (state: RootState) => state.users.getUser.status === STATUS.PENDING;

export const selectDeleteUserRequest = (state: RootState) => state.users.deleteUser.status === STATUS.PENDING;
export const selectDeleteUserSuccess = (state: RootState) => state.users.deleteUser.status === STATUS.FULFILLED;

export const selectEditUserRequest = (state: RootState) => state.users.editUser.status === STATUS.PENDING;
export const selectEditUserSuccess = (state: RootState) => state.users.editUser.status === STATUS.FULFILLED;

export const selectAddUserSuccess = (state: RootState) => state.users.addUser.status === STATUS.FULFILLED;

export const selectDeleteUserModal = (state: RootState) => state.users.deleteUserModal.show;
