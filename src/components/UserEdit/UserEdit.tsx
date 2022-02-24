import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// hooks
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

// state
import { addUser, editUser, editUserInit, getUser, getUserInit, getUsers } from 'state/actions/usersActions';
import { selectEditUserSuccess, selectUser, selectUserRequest } from 'state/selectors/usersSelectors';
import { selectPermissions } from 'state/selectors/permissionsSelectors';

// components
import { Input, Checkbox, Switch } from 'components/FormControls';
import Button from 'components/Button';
import Loader from 'components/Loader';

export default function UserEdit() {
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

	const schema = yup.object().shape({
		firstName: yup.string().required('* Required field'),
		lastName: yup.string().required('* Required field'),
		email: yup.string().required('* Required field').email('Please enter a valid email address')
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onSubmit',
		reValidateMode: 'onChange'
	});

	const onSubmit = (data: any) => {
		if (id) {
			dispatch(editUser({ id, data }));
		} else {
			dispatch(addUser(data));
		}
	};

	useEffect(() => {
		if (user) {
			setValue('firstName', user.firstName, { shouldValidate: true });
			setValue('lastName', user.lastName, { shouldValidate: true });
			setValue('email', user.email, { shouldValidate: true });
			setValue('status', user.status, { shouldValidate: true });
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
		<form onSubmit={handleSubmit(onSubmit)} data-testi="user-edit">
			<Input register={register} name="firstName" type="text" label="First Name" error={errors && errors['firstName']} />
			<Input register={register} name="lastName" type="text" label="Last Name" error={errors && errors['lastName']} />
			<Input register={register} name="email" type="text" label="Email" />
			<div>
				<label className="text-xs pb-2 uppercase">Is user active?</label>
				<Switch register={register} name="status" />
			</div>
			<div>
				<label className="text-xs uppercase">User permissions</label>
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
