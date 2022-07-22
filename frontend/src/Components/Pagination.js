import React, { useEffect } from "react";

const Pagination = ({ setPage, page, slice, range }) => {
	const goToFirstPage = () => {
		if (page > 1) setPage(1);
	};
	const goToPreviousPage = () => {
		if (page > 1) setPage((page) => page - 1);
	};
	const goToNextPage = () => {
		if (page < range.length) setPage((page) => page + 1);
	};
	const goToLastPage = () => {
		console.log("range", range);
		if (page < range.length) setPage(range.length);
	};
	const getPaginationGroup = () => {
		const pageLimit = 3;
		let start = Math.floor((page - 1) / pageLimit) * pageLimit;
		return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
	};

	useEffect(() => {
		if (slice.length < 1 && page !== 1) {
			setPage(page - 1);
		}
	}, [slice, page, setPage]);
	return (
		<div className="pagination">
			<button className="page-link" onClick={goToFirstPage}>
				first
			</button>
			<button className="page-link" onClick={goToPreviousPage}>
				prev
			</button>
			{getPaginationGroup().map((item, index) => (
				<button
					className="page-link"
					key={index}
					onClick={() => setPage(item)}
				>
					{item}
				</button>
			))}
			<button className="page-link" onClick={goToNextPage}>
				next
			</button>
			<button className="page-link" onClick={goToLastPage}>
				last
			</button>
		</div>
	);
};

export default Pagination;
