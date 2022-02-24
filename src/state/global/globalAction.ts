import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

export const initAction = (prefix: string) => createAction(prefix)();

export const globalAction = (prefix: string, service: (params: {}) => any, params = {}) => {
	return createAsyncThunk(prefix, async (prefix, { rejectWithValue }) => {
		try {
			return await service(params);
		} catch (err:any) {
			if (!err.response) {
				throw err;
			}
			return rejectWithValue({});
		}
	})();
};
