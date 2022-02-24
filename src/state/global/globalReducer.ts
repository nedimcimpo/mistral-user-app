import { createReducer } from '@reduxjs/toolkit';
import { STATUS } from 'utils/constants';

export interface DataState {
	[key: string]: any;
}

const initialState: DataState = {
	data: null,
	status: STATUS.INIT,
	error: null
};

export default function globalReducer(name: string, customActionHandlers = {}) {
	return createReducer(initialState, {
		[`${name}/init`]: (state: { status: number; data: null; error: null }) => ({
			...state,
			status: STATUS.INIT,
			data: null,
			error: null
		}),
		[`${name}/pending`]: (state: { status: number; data: null; error: null }) => ({
			...state,
			status: STATUS.PENDING,
			data: null,
			error: null
		}),
		[`${name}/rejected`]: (state: { status: number; data: null; error: object }, action: { error: object }) => ({
			...state,
			status: STATUS.FULFILLED,
			data: null,
			error: action.error
		}),
		[`${name}/fulfilled`]: (state: { status: number; data: object; error: null }, action: { payload: { data: any } }) => ({
			...state,
			status: STATUS.FULFILLED,
			data: action.payload,
			error: null
		}),
		...customActionHandlers
	});
}
