import React, { useState, useEffect } from "react";
import usePagination from "../hooks/usePagination";
import Pagination from "./Pagination";

const TableRebounds = ({ name, fullStats, category, header, rowsPerPage }) => {
	const [stats, setStats] = useState("");
	const [order, setOrder] = useState({
		[category]: "ascending",
		name: "ascending",
		season: "ascending",
		games: "descending",
	});
	const [page, setPage] = useState(1);
	const { slice, range } = usePagination(stats, page, rowsPerPage);

	useEffect(() => {
		if (!stats || stats.length !== fullStats.length) {
			let sortedFullStats = JSON.parse(JSON.stringify(fullStats));
			sortedFullStats.sort((a, b) => b[category] - a[category]);
			setStats(sortedFullStats);

			// brings page back to 1 after searching for a player
			setPage(1);

			// resets order settings after searching for a player
			setOrder({
				[category]: "ascending",
				name: "ascending",
				season: "ascending",
				games: "descending",
			});
		}
	}, [stats, fullStats, category]);

	const sortCategory = (e) => {
		const clickedCategory = e.target.id;
		if (order[clickedCategory] === "descending") {
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

			let orderClone = JSON.parse(JSON.stringify(order));
			Object.keys(orderClone).forEach((key) =>
				key === "games"
					? (orderClone[key] = "descending")
					: key === "season" || key === "name"
					? (orderClone[key] = "ascending")
					: (orderClone[key] = "descending")
			);
			orderClone = { ...orderClone, [clickedCategory]: "ascending" };

			setOrder(orderClone);
			setStats(sortedStats);
		} else if (order[clickedCategory] === "ascending") {
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

			let orderClone = JSON.parse(JSON.stringify(order));
			Object.keys(orderClone).forEach((key) =>
				key === "games"
					? (orderClone[key] = "descending")
					: key === "season" || key === "name"
					? (orderClone[key] = "ascending")
					: (orderClone[key] = "descending")
			);
			orderClone = { ...orderClone, [clickedCategory]: "descending" };

			setOrder(orderClone);
			setStats(sortedStats);
		}
	};

	if (!stats) return;

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
								Games
							</th>
							<th
								scope="col"
								className="th-pointer"
								id={category}
								onClick={sortCategory}
							>
								{header}
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

export default TableRebounds;
