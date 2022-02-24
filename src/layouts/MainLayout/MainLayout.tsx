import React, { useEffect } from 'react';

// hooks
import { useAppDispatch } from 'hooks/useRedux';

// state
import { getUsers } from 'state/actions/usersActions';
import { getPermissions } from 'state/actions/permissionsActions';

// components
import DeleteUserModal from 'components/DeleteUserModal';

type Props = {
	children: JSX.Element;
};

export default function MainLayout({ children }: Props) {
	const dispatch = useAppDispatch();


	useEffect(() => {
		dispatch(getUsers());
		dispatch(getPermissions());
	}, [dispatch]);

	return (
		<div className="relative pb-40">
			<header className="h-40 flex justify-center items-center bg-neutral-900">
				<h1 className="uppercase text-3xl">user management app</h1>
			</header>
			<div className="container mx-auto min-h-screen">{children}</div>
			<DeleteUserModal />
			<footer className="absolute bottom-0 h-40 flex justify-center items-center w-full">All Right Reserved</footer>
		</div>
	);
}
