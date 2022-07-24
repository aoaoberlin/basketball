import React, { useState, useEffect } from "react";
import usePagination from "./Hooks/usePagination";
import Pagination from "./Pagination";

const TableBlocks = ({ name, fullStats, category, rowsPerPage }) => {
	// console.log("inside TableBlocks");
	// console.log("inside TableBlocks -> fullStats:", fullStats);
	const [stats, setStats] = useState("");
	const [order, setOrder] = useState({
		[category]: "ascending",
		year: "ascending",
		games: "descending",
	});
	const [page, setPage] = useState(1);
	const { slice, range } = usePagination(stats, page, rowsPerPage);

	// console.log("inside TableBlocks -> stats", stats);

	useEffect(() => {
		// console.log("inside TableBlocks -> useEffect");
		if (!stats || stats.length !== fullStats.length) {
			// console.log("inside TableBlocks -> no stats yet");
			// console.log("inside TableBlocks -> category:", category);
			let sortedFullStats = JSON.parse(JSON.stringify(fullStats));
			sortedFullStats.sort((a, b) => b[category] - a[category]);
			setStats(sortedFullStats);
			setPage(1);
		}
	}, [stats, fullStats, category]);

	const sortCategory = (e) => {
		// console.log("inside TableBlocks -> sortCategory");
		const category = e.target.id;
		// console.log("category to be sorted:", category);
		// console.log("stats until now:", stats);
		if (order[category] === "descending") {
			// console.log("order of category is descending");
			const sortedStats = [...stats].sort(
				(a, b) => b[category] - a[category]
			);
			// console.log("sortedStats", sortedStats);

			let orderClone = JSON.parse(JSON.stringify(order));
			Object.keys(orderClone).forEach((key) =>
				key === "games"
					? (orderClone[key] = "descending")
					: key === "year"
					? (orderClone[key] = "ascending")
					: (orderClone[key] = "descending")
			);
			orderClone = { ...orderClone, [category]: "ascending" };
			// console.log("orderClone", orderClone);

			setOrder(orderClone);
			setStats(sortedStats);
		} else if (order[category] === "ascending") {
			// console.log("order of category is ascending");
			const sortedStats = [...stats].sort(
				(a, b) => a[category] - b[category]
			);
			// console.log("sortedStats", sortedStats);

			let orderClone = JSON.parse(JSON.stringify(order));
			Object.keys(orderClone).forEach((key) =>
				key === "games"
					? (orderClone[key] = "descending")
					: key === "year"
					? (orderClone[key] = "ascending")
					: (orderClone[key] = "descending")
			);
			orderClone = { ...orderClone, [category]: "descending" };
			// console.log("orderClone", orderClone);

			setOrder(orderClone);
			setStats(sortedStats);
		}
	};

	if (!stats) {
		// console.log("inside TableBlocks -> no data yet");
		return;
	} // no data yet

	return (
		<React.Fragment>
			<div className="table-responsive-sm">
				<table className="table table-hover table-striped caption-top">
					<caption>{name}</caption>
					<thead>
						<tr>
							<th scope="col">Player</th>
							<th
								scope="col"
								className="th-pointer"
								id="year"
								onClick={sortCategory}
							>
								Season
							</th>
							<th
								scope="col"
								className="th-pointer"
								id="games"
								onClick={sortCategory}
							>
								Games played
							</th>
							<th
								scope="col"
								className="th-pointer"
								id={category}
								onClick={sortCategory}
							>
								{name}
							</th>
						</tr>
					</thead>
					<tbody>
						{slice.map((player) => (
							<tr key={player._id}>
								<th scope="row">
									{player.firstName + " " + player.lastName}
								</th>
								<td>{player.year}</td>
								<td>{player.games}</td>
								<td>{player[category]}</td>
							</tr>
						))}
					</tbody>
				</table>
				<Pagination
					slice={slice}
					setPage={setPage}
					page={page}
					range={range}
				/>
			</div>
		</React.Fragment>
	);
};

export default TableBlocks;
