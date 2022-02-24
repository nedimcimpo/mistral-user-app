import { createAction } from '@reduxjs/toolkit';

import { globalAction, initAction } from '../global/globalAction';
import { GET_USERS, GET_USER, EDIT_USER, DELETE_USER, ADD_USER, SHOW_DELETE_MODAL, HIDE_DELETE_MODAL } from '../constants';
import { UsersService } from 'services/UsersService';

export const getUsers = (params?: any) => {
	return globalAction(`users/${GET_USERS}`, UsersService.getUsers, params);
};

export const getUser = (params: any) => {
	return globalAction(`users/${GET_USER}`, UsersService.getUser, params);
};

export const editUser = (params: any) => {
	return globalAction(`users/${EDIT_USER}`, UsersService.editUser, params);
};

export const deleteUser = (params: any) => {
	return globalAction(`users/${DELETE_USER}`, UsersService.deleteUser, params);
};

export const addUser = (params: any) => {
	return globalAction(`users/${ADD_USER}`, UsersService.addUser, params);
};

export const getUserInit = () => initAction(`users/${GET_USER}/init`);
export const editUserInit = () => initAction(`users/${EDIT_USER}/init`);
export const deleteUserInit = () => initAction(`users/${DELETE_USER}/init`);
export const addUserInit = () => initAction(`users/${ADD_USER}/init`);

export const showDeleteModal = createAction(`users/${SHOW_DELETE_MODAL}`);
export const hideDeleteModal = createAction(`users/${HIDE_DELETE_MODAL}`);
