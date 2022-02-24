import { combineReducers, createReducer } from '@reduxjs/toolkit';

import globalReducer from '../global/globalReducer';
import {
	ADD_USER,
	DELETE_USER,
	EDIT_USER,
	GET_USER,
	GET_USERS,
	HIDE_DELETE_MODAL,
	SHOW_DELETE_MODAL
} from '../constants';

const modal = createReducer(
	{ show: false },
	{
		[`users/${SHOW_DELETE_MODAL}`]: () => ({
			show: true
		}),
		[`users/${HIDE_DELETE_MODAL}`]: () => ({
			show: false
		}),
	}
);

export default combineReducers({
	getUsers: globalReducer(`users/${GET_USERS}`),
	getUser: globalReducer(`users/${GET_USER}`),
	editUser: globalReducer(`users/${EDIT_USER}`),
	deleteUser: globalReducer(`users/${DELETE_USER}`),
	addUser: globalReducer(`users/${ADD_USER}`),
	deleteUserModal: modal
});
