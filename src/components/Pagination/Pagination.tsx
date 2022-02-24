import React from 'react';
import ReactPaginate from 'react-paginate';

import './Pagination.css'

type PaginationProps = {
	pageCount: number;
	handlePageChange: (event: any) => void;
	page: number;
};

export default function Pagination({ pageCount, handlePageChange, page }: PaginationProps) {
	return (
		<ReactPaginate
			previousLabel="Previous"
			nextLabel="Next"
			pageClassName="page-item"
			previousClassName="page-item"
			nextClassName="page-item"
			breakLabel="..."
			breakClassName="page-item"
			pageCount={pageCount}
			marginPagesDisplayed={2}
			pageRangeDisplayed={5}
			onPageChange={handlePageChange}
			containerClassName="pagination"
			activeClassName="active"
			forcePage={page}
		/>
	);
}
