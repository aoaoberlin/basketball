import React, { useState, useEffect } from "react";
import usePagination from "./Hooks/usePagination";
import Pagination from "./Pagination";

const TableRebounds = ({ name, filteredSlice, category }) => {
	console.log("inside TableRebounds");
	const [stats, setStats] = useState("");
	const [order, setOrder] = useState({
		[category]: "ascending",
		year: "ascending",
		games: "descending",
	});

	useEffect(() => {
		console.log("inside TableRebounds -> useEffect");
		if (!stats) {
			console.log("inside TableRebounds -> no stats yet");
			console.log("inside TableRebounds -> category:", category);
			let sortedFilteredSlice = JSON.parse(JSON.stringify(filteredSlice));
			sortedFilteredSlice.sort((a, b) => b[category] - a[category]);
			setStats(sortedFilteredSlice);
		}
	}, [stats, filteredSlice, category]);

	if (!stats) {
		console.log("inside TableRebounds -> no data yet");
		return;
	} // no data yet

	const sortCategory = (e) => {
		console.log("inside TableRebounds -> sortCategory");
		const category = e.target.id;
		console.log("category to be sorted:", category);
		console.log("stats until now:", stats);
		if (order[category] === "descending") {
			console.log("order of category is descending");
			const sortedStats = [...stats].sort(
				(a, b) => b[category] - a[category]
			);
			console.log("sortedStats", sortedStats);
			setOrder({ ...order, [category]: "ascending" });
			setStats(sortedStats);
		} else if (order[category] === "ascending") {
			console.log("order of category is ascending");
			const sortedStats = [...stats].sort(
				(a, b) => a[category] - b[category]
			);
			console.log("sortedStats", sortedStats);
			setOrder({ ...order, [category]: "descending" });
			setStats(sortedStats);
		}
	};

	return (
		<React.Fragment>
			{/* <div className="form-outline row d-flex justify-content-center">
				<input
					type="search"
					id="seach-input"
					className="form-control"
					placeholder="Search"
					aria-label="Search"
					value={search}
					onChange={handleSearchChange}
				/>
			</div> */}
			<div className="table-responsive-sm">
				<table className="table table-hover table-striped">
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
						{stats
							// .sort((a, b) => b[category] - a[category])
							.map((player) => (
								<tr key={player._id}>
									<th scope="row">
										{player.firstName +
											" " +
											player.lastName}
									</th>
									<td>{player.year}</td>
									<td>{player.games}</td>
									<td>{player[category]}</td>
								</tr>
							))}
					</tbody>
				</table>
				{/* <Pagination
					slice={slice}
					setPage={setPage}
					page={page}
					range={range}
				/> */}
			</div>
		</React.Fragment>
	);
};

export default TableRebounds;
