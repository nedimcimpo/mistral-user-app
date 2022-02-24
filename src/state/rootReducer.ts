import { combineReducers } from '@reduxjs/toolkit';

import permissionsReducers from 'state/reducers/permissionsReducers';
import userReducers from 'state/reducers/usersReducers';

export default combineReducers({
	permissions: permissionsReducers,
	users: userReducers,
});
