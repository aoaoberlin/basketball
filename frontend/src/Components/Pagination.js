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
		<nav aria-label="Pagination">
			<ul class="pagination justify-content-center">
				{page === 1 ? (
					<li class="page-item disabled">
						<button className="page-link" onClick={goToFirstPage}>
							first
						</button>
					</li>
				) : (
					<li class="page-item">
						<button className="page-link" onClick={goToFirstPage}>
							first
						</button>
					</li>
				)}

				{page === 1 ? (
					<li class="page-item disabled">
						<button
							className="page-link"
							onClick={goToPreviousPage}
						>
							prev
						</button>
					</li>
				) : (
					<li class="page-item">
						<button
							className="page-link"
							onClick={goToPreviousPage}
						>
							prev
						</button>
					</li>
				)}

				{getPaginationGroup().map((item, index) =>
					item > range.length ? null : page === item ? (
						<li class="page-item active">
							<button
								className="page-link"
								key={index}
								onClick={() => setPage(item)}
							>
								{item}
							</button>
						</li>
					) : (
						<li class="page-item">
							<button
								className="page-link"
								key={index}
								onClick={() => setPage(item)}
							>
								{item}
							</button>
						</li>
					)
				)}

				{page === range.length ? (
					<li class="page-item disabled">
						<button className="page-link" onClick={goToNextPage}>
							next
						</button>
					</li>
				) : (
					<li class="page-item">
						<button className="page-link" onClick={goToNextPage}>
							next
						</button>
					</li>
				)}

				{page === range.length ? (
					<li class="page-item disabled">
						<button className="page-link" onClick={goToLastPage}>
							last
						</button>
					</li>
				) : (
					<li class="page-item">
						<button className="page-link" onClick={goToLastPage}>
							last
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Pagination;
