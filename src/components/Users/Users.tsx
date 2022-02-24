import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// hooks
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import useFilter from 'hooks/useFilter';

// state
import { deleteUserInit, getUsers, showDeleteModal } from 'state/actions/usersActions';
import { selectDeleteUserRequest, selectDeleteUserSuccess, selectUsers, selectUsersRequest } from 'state/selectors/usersSelectors';

// components
import UserCard from 'components/UserCard';
import Button from 'components/Button';
import Pagination from 'components/Pagination';
import Loader from 'components/Loader';
import { Input, Select } from 'components/FormControls';

export default function Users() {
	const dispatch = useAppDispatch();
	const users = useAppSelector(selectUsers);
	const usersRequest = useAppSelector(selectUsersRequest);
	const deleteUserSuccess = useAppSelector(selectDeleteUserSuccess);
	const deleteUserRequest = useAppSelector(selectDeleteUserRequest);

	const [searchValue, setSearchValue] = useState('');
	const [sortValue, setSortValue] = useState({ sortBy: '', order: '' });

	const itemsPerPage = 10;

	const { pageCount, handlePageChange, setItemOffset, currentItems, page, setPage } = useFilter({
		items: users,
		itemsPerPage
	});

	const filters = [
		{
			label: 'Username - asc',
			value: 'username-asc'
		},
		{
			label: 'Username - desc',
			value: 'username-desc'
		},
		{
			label: 'First Name - asc',
			value: 'firstName-asc'
		},
		{
			label: 'First Name - desc',
			value: 'firstName-desc'
		},
		{
			label: 'Last Name - asc',
			value: 'lastName-asc'
		},
		{
			label: 'Last Name - desc',
			value: 'lastName-desc'
		}
	];

	const { register, setValue } = useForm();

	const handleSort = (event: any) => {
		const action = event.target.value;
		const parts = action.split('-');
		const sorting = { sortBy: parts[0], order: parts[1] };
		setSortValue(sorting);
		dispatch(getUsers({ ...sorting, search: searchValue }));
		setItemOffset(0);
		setPage(0);
	};

	const handleFilter = () => {
		const filtering = { filter: searchValue };
		dispatch(getUsers({ ...filtering, ...sortValue }));
		setItemOffset(0);
		setPage(0);
	};

	const clearFilters = () => {
		dispatch(getUsers());
		setItemOffset(0);
		setPage(0);
		setValue('sorting', 'Select');
		setSortValue({ sortBy: '', order: '' });
		setValue('filtering', '');
		setSearchValue('');
	};

	const handleSearchInput = (event: any) => {
		setSearchValue(event.target.value);
	};

	const openDeleteUserModal = () => {
		dispatch(showDeleteModal());
	};

	useEffect(() => {
		if (deleteUserSuccess) {
			dispatch(deleteUserInit());
			dispatch(getUsers());
		}
	}, [dispatch, deleteUserSuccess]);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	return (
		<div>
			<div className="flex justify-between">
				{(searchValue?.length > 0 || sortValue.sortBy.length > 0) && <Button label="Clear" onClick={clearFilters} />}
				<form className="flex justify-end w-full" onSubmit={(e) => e.preventDefault()}>
					<div className="flex mr-10 align-top">
						<Input name="filtering" register={register} onChange={handleSearchInput} placeholder="Search" type="text" />
						<Button label="Submit" onClick={handleFilter} />
					</div>

					<div className="flex">
						<Select register={register} options={filters} name="sorting" onChange={handleSort} defaultValue="Select" />
					</div>
				</form>
			</div>
			{usersRequest || deleteUserRequest ? (
				<Loader />
			) : (
				<>
					<div className="flex flex-wrap">
						{currentItems?.length > 0 ? (
							currentItems?.map((user: any) => <UserCard user={user} key={user.id} openDeleteUserModal={openDeleteUserModal} />)
						) : (
							<div className="w-full flex justify-center items-center h-80">no data</div>
						)}
					</div>
					{currentItems?.length > 0 && <Pagination pageCount={pageCount} handlePageChange={handlePageChange} page={page} />}
				</>
			)}
		</div>
	);
}
