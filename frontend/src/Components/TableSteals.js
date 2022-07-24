import React, { useState, useEffect } from "react";
import usePagination from "./Hooks/usePagination";
import Pagination from "./Pagination";

const TableSteals = ({ name, fullStats, category, rowsPerPage }) => {
	// console.log("inside TableSteals");
	// console.log("inside TableSteals -> fullStats:", fullStats);
	const [stats, setStats] = useState("");
	const [order, setOrder] = useState({
		[category]: "ascending",
		name: "ascending",
		season: "ascending",
		games: "descending",
	});
	const [page, setPage] = useState(1);
	const { slice, range } = usePagination(stats, page, rowsPerPage);

	// console.log("inside TableSteals -> stats", stats);

	useEffect(() => {
		// console.log("inside TableSteals -> useEffect");
		if (!stats || stats.length !== fullStats.length) {
			// console.log("inside TableSteals -> no stats yet");
			// console.log("inside TableSteals -> category:", category);
			let sortedFullStats = JSON.parse(JSON.stringify(fullStats));
			sortedFullStats.sort((a, b) => b[category] - a[category]);
			setStats(sortedFullStats);
			setPage(1);
		}
	}, [stats, fullStats, category]);

	const sortCategory = (e) => {
		// console.log("inside TableSteals -> sortCategory");
		const clickedCategory = e.target.id;
		// console.log("category to be sorted:", category);
		// console.log("stats until now:", stats);
		if (order[clickedCategory] === "descending") {
			// console.log("order of category is descending");
			let sortedStats;
			if (clickedCategory === "name") {
				sortedStats = [...stats].sort((a, b) =>
					b[clickedCategory].localeCompare(a[clickedCategory])
				);
			} else {
				sortedStats = [...stats].sort(
					(a, b) => b[clickedCategory] - a[clickedCategory]
				);
			}
			// console.log("sortedStats", sortedStats);

			let orderClone = JSON.parse(JSON.stringify(order));
			Object.keys(orderClone).forEach((key) =>
				key === "games"
					? (orderClone[key] = "descending")
					: key === "season" || key === "name"
					? (orderClone[key] = "ascending")
					: (orderClone[key] = "descending")
			);
			orderClone = { ...orderClone, [clickedCategory]: "ascending" };
			// console.log("orderClone", orderClone);

			setOrder(orderClone);
			setStats(sortedStats);
		} else if (order[clickedCategory] === "ascending") {
			// console.log("order of category is ascending");
			let sortedStats;
			if (clickedCategory === "name") {
				sortedStats = [...stats].sort((a, b) =>
					a[clickedCategory].localeCompare(b[clickedCategory])
				);
			} else {
				sortedStats = [...stats].sort(
					(a, b) => a[clickedCategory] - b[clickedCategory]
				);
			}
			// console.log("sortedStats", sortedStats);

			let orderClone = JSON.parse(JSON.stringify(order));
			Object.keys(orderClone).forEach((key) =>
				key === "games"
					? (orderClone[key] = "descending")
					: key === "season" || key === "name"
					? (orderClone[key] = "ascending")
					: (orderClone[key] = "descending")
			);
			orderClone = { ...orderClone, [clickedCategory]: "descending" };
			// console.log("orderClone", orderClone);

			setOrder(orderClone);
			setStats(sortedStats);
		}
	};

	if (!stats) {
		// console.log("inside TableSteals -> no data yet");
		return;
	} // no data yet

	return (
		<React.Fragment>
			<div className="table-responsive-sm">
				<table className="table table-hover table-striped caption-top">
					<caption>{name}</caption>
					<thead>
						<tr>
							<th
								scope="col"
								className="th-pointer"
								id="name"
								onClick={sortCategory}
							>
								Player
							</th>
							<th
								scope="col"
								className="th-pointer"
								id="season"
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
								<th scope="row">{player.name}</th>
								<td>{player.season}</td>
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

export default TableSteals;
