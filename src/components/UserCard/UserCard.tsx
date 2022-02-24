import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import { getUser, showDeleteModal } from 'state/actions/usersActions';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { selectDeleteUserRequest } from 'state/selectors/usersSelectors';

type UserProps = {
	user: {
		[key: string]: any;
	};
	openDeleteUserModal: () => void;
};

export default function UserCard({ user }: UserProps) {
	const { id, username, firstName, lastName, email, status } = user;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const deleteUserRequest = useAppSelector(selectDeleteUserRequest);

	const handleOpenDeleteUserModal = (id: number) => {
		dispatch(getUser({ id }));
		dispatch(showDeleteModal());
	};

	return (
		<div className="rounded bg-neutral-800 m-2 p-4 w-[calc(50%-16px)] flex hover:bg-gray-800 relative">
			<div className="mr-4">
				<img src={`https://eu.ui-avatars.com/api/?name=${firstName + lastName}`} className="rounded" alt={firstName} />
			</div>
			<div>
				<div className="h-8 flex items-center">
					<span>Username:&nbsp;</span>
					<span>{username}</span>
				</div>
				<div className="h-8 flex items-center">
					<span>First Name:&nbsp;</span>
					<span>{firstName}</span>
				</div>
				<div className="h-8 flex items-center">
					<span>Last Name:&nbsp;</span>
					<span>{lastName}</span>
				</div>
				<div className="h-8 flex items-center">
					<span>Email:&nbsp;</span>
					<span>{email}</span>
				</div>

				<div className="h-8 flex items-center">
					<span>Status:&nbsp;</span>
					<span className={`${status ? 'text-green-600' : 'text-red-600'}`}>{status ? 'Active' : 'Inactive'}</span>
				</div>
			</div>
			<div className="absolute bottom-4 right-4">
				<Button label="Edit" onClick={() => navigate(id)} disabled={deleteUserRequest} className="mr-2" />
				<Button label="Delete" onClick={() => handleOpenDeleteUserModal(id)} disabled={deleteUserRequest} className="mr-2" />
				<Button label="Assign permission" onClick={() => navigate(`/assign/${id}`)} disabled={deleteUserRequest} />
			</div>
		</div>
	);
}
