import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// hooks
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

// state
import { addUser, editUser, editUserInit, getUser, getUserInit, getUsers } from 'state/actions/usersActions';
import { selectEditUserSuccess, selectUser, selectUserRequest } from 'state/selectors/usersSelectors';
import { selectPermissions } from 'state/selectors/permissionsSelectors';

// components
import { Checkbox } from 'components/FormControls';
import Button from 'components/Button';
import Loader from 'components/Loader';

export default function AssignPermission() {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector(selectUser);
	const userRequest = useAppSelector(selectUserRequest);
	const permissions = useAppSelector(selectPermissions);
	const editUserSuccess = useAppSelector(selectEditUserSuccess);

	useEffect(() => {
		if (id) {
			dispatch(getUser({ id }));
		}
	}, [dispatch, id]);

	const { register, handleSubmit, setValue } = useForm();

	const onSubmit = (data: any) => {
		if (id) {
			dispatch(editUser({ id, data }));
		} else {
			dispatch(addUser(data));
		}
	};

	useEffect(() => {
		if (user) {
			setValue('permissions', user.permissions, { shouldValidate: true });
		}
	}, [user, setValue]);

	useEffect(() => {
		if (editUserSuccess) {
			dispatch(editUserInit());
			dispatch(getUsers());
			navigate('/');
		}
	}, [editUserSuccess, dispatch, navigate]);

	useEffect(() => {
		return () => {
			dispatch(getUserInit());
		};
	}, [dispatch]);

	if (userRequest) {
		return <Loader />;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			Assign permission to user: {user?.firstName} {user?.lastName}
			<div>
				<div className="relative mt-4">
					{permissions?.map((item: { code: string; description: string }) => (
						<Checkbox name="permissions" label={item.description} register={register} value={item.code} />
					))}
				</div>
			</div>
			<div className="flex flex-col mt-8">
				<Button label="Save changes" type="submit" className="mb-4" />
				<Button label="Cancel" onClick={() => navigate('/')} type="button" />
			</div>
		</form>
	);
}
