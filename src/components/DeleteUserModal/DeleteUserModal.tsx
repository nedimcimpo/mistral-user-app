import React from 'react';

// hooks
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

// state
import { deleteUser, getUserInit, hideDeleteModal } from 'state/actions/usersActions';
import { selectDeleteUserModal, selectUser } from 'state/selectors/usersSelectors';

// components
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'components/Modal';
import Button from 'components/Button';

export default function DeleteUserModal() {
	const dispatch = useAppDispatch();
	const deleteUserModal = useAppSelector(selectDeleteUserModal);
	const user = useAppSelector(selectUser);

	const closeModal = () => {
		dispatch(getUserInit());
		dispatch(hideDeleteModal());
	};

	const handleDeleteUser = () => {
		dispatch(deleteUser({ id: user?.id }));
		closeModal();
	};

	return (
		<Modal show={deleteUserModal} closeModal={closeModal}>
			<ModalHeader title="Delete User" />
			<ModalBody show>
				<div>
					Are you sure you want to delete user: {user?.firstName} {user?.lastName}
				</div>
			</ModalBody>
			<ModalFooter>
				<div className="flex w-full mt-10">
					<Button label="Confirm" className="w-full mr-2" onClick={handleDeleteUser} />
					<Button label="Cancel" className="w-full ml-2" onClick={closeModal} />
				</div>
			</ModalFooter>
		</Modal>
	);
}
