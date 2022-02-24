import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Users from 'components/Users';
import UserEdit from 'components/UserEdit';
import AssignPermission from 'components/AssignPermission';

const routes = [
	{
		id: 'users',
		path: '/',
		Component: Users,
	},
	{
		id: 'edit-user',
		path: '/:id',
		Component: UserEdit,
	},
	{
		id: 'create-user',
		path: '/create',
		Component: UserEdit,
	},
	{
		id: 'assign-permission',
		path: '/assign/:id',
		Component: AssignPermission,
	}
];

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Users />} />
				{routes?.map(({ id, path, Component }) => (
					<Route key={id} path={path} element={<Component />} />
				))}
				{<Route path="*" element={<div>not found</div>} />}
			</Routes>
		</BrowserRouter>
	);
}
