import React, { useState, useEffect } from "react";
import usePagination from "./Hooks/usePagination";
import Pagination from "./Pagination";

const TableAssists = ({ name, fullStats, category }) => {
	console.log("inside TableAssists");
	const [stats, setStats] = useState("");
	const [order, setOrder] = useState({
		[category]: "ascending",
		year: "ascending",
		games: "descending",
	});
	const [page, setPage] = useState(1);
	const rowsPerPage = 10;
	const { slice, range } = usePagination(stats, page, rowsPerPage);
	const [search, setNewSearch] = useState("");

	useEffect(() => {
		console.log("inside TableAssists -> useEffect");
		if (!stats) {
			console.log("inside TableAssists -> no stats yet");
			console.log("inside TableAssists -> category:", category);
			let sortedFullStats = JSON.parse(JSON.stringify(fullStats));
			sortedFullStats.sort((a, b) => b[category] - a[category]);
			setStats(sortedFullStats);
		}
	}, [stats, fullStats, category]);

	const handleSearchChange = (e) => {
		console.log("inside Table -> handleSearchChange");
		setNewSearch(e.target.value);
	};

	const filteredSlice = !search
		? slice
		: slice.filter(
				(s) =>
					s.firstName.toLowerCase().includes(search.toLowerCase()) ||
					s.lastName.toLowerCase().includes(search.toLowerCase())
		  );

		  if (!fullStats) {
		console.log("inside TableAssists -> no data yet");
		return;
	} // no data yet

	const sortCategory = (e) => {
		console.log("inside TableAssists -> sortCategory");
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
			<div className="form-outline row d-flex justify-content-center">
				<input
					type="search"
					id="seach-input"
					className="form-control"
					placeholder="Search"
					aria-label="Search"
					value={search}
					onChange={handleSearchChange}
				/>
			</div>
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
						{filteredSlice
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

export default TableAssists;
