import { useEffect, useState } from 'react';

type FilterProps = {
	items: [];
	itemsPerPage: number;
};

export default function useFilter({ items, itemsPerPage }: FilterProps) {
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const [page, setPage] = useState(0);

	const handlePageChange = (event: any) => {
		const newOffset = (event.selected * itemsPerPage) % items?.length;
		setItemOffset(newOffset);
		setPage(event.selected);
	};

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		setCurrentItems(items?.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(items?.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, items]);

	return { currentItems, pageCount, handlePageChange, setItemOffset, page, setPage };
}
