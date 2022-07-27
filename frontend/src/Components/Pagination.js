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
		const start = Math.floor((page - 1) / pageLimit) * pageLimit;
		return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
	};

	useEffect(() => {
		if (slice.length < 1 && page !== 1) {
			setPage(page - 1);
		}
	}, [slice, page, setPage]);

	if (range <= 1) return;

	return (
		<nav aria-label="Pagination">
			<ul className="pagination justify-content-center">
				<li className={"page-item " + (page === 1 ? "disabled" : "")}>
					<button className="page-link" onClick={goToFirstPage}>
						first
					</button>
				</li>

				<li className={"page-item " + (page === 1 ? "disabled" : "")}>
					<button className="page-link" onClick={goToPreviousPage}>
						&#60;
					</button>
				</li>

				{getPaginationGroup().map((item, index) =>
					item > range.length ? null : (
						<li
							key={index}
							className={
								"page-item " + (page === item ? "active" : "")
							}
						>
							<button
								className="page-link"
								onClick={() => setPage(item)}
							>
								{item}
							</button>
						</li>
					)
				)}

				<li
					className={
						"page-item " + (page === range.length ? "disabled" : "")
					}
				>
					<button className="page-link" onClick={goToNextPage}>
						&#62;
					</button>
				</li>

				<li
					className={
						"page-item " + (page === range.length ? "disabled" : "")
					}
				>
					<button className="page-link" onClick={goToLastPage}>
						last
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Pagination;
