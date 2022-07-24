import React, { useState, useEffect } from "react";
import usePagination from "./Hooks/usePagination";
import Pagination from "./Pagination";

const Table = () => {
	console.log("inside Table");
	const rowsPerPage = 10;
	const [stats, setStats] = useState("");
	const [order, setOrder] = useState({
		points: "descending",
		assists: "descending",
		rebounds: "descending",
		steals: "descending",
		blocks: "descending",
		year: "ascending",
		games: "descending",
	});
	const [page, setPage] = useState(1);
	const { slice, range } = usePagination(stats, page, rowsPerPage);
	const [search, setNewSearch] = useState("");

	useEffect(() => {
		console.log("inside Table -> useEffect");
		if (!stats) {
			getStats();
		}
	});

	const getStats = async () => {
		console.log("inside Table -> getStats");
		const axios = require("axios");
		const statsFromAPI = await axios
			.get("http://localhost:5005/getStats")
			.then((response) => {
				console.log(response.data.stats);
				return response.data.stats})
			.catch((error) => console.log(error));
		setStats(statsFromAPI);
	};

	const sortCategory = (e) => {
		const category = e.target.id;
		if (order[category] === "descending") {
			const sortedStats = [...stats].sort(
				(a, b) => b[category] - a[category]
			);
			setOrder({ ...order, [category]: "ascending" });
			setStats(sortedStats);
		} else if (order[category] === "ascending") {
			const sortedStats = [...stats].sort(
				(a, b) => a[category] - b[category]
			);
			setOrder({ ...order, [category]: "descending" });
			setStats(sortedStats);
		}
	};

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

	if (!stats) {
		console.log("inside Table -> no data yet");
		return;
	} // no data yet

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
								id="points"
								onClick={sortCategory}
							>
								Points/Game
							</th>
							<th
								scope="col"
								className="th-pointer"
								id="assists"
								onClick={sortCategory}
							>
								Assists/Game
							</th>
							<th
								scope="col"
								className="th-pointer"
								id="rebounds"
								onClick={sortCategory}
							>
								Rebounds/Game
							</th>
							<th
								scope="col"
								className="th-pointer"
								id="steals"
								onClick={sortCategory}
							>
								Steals/Game
							</th>
							<th
								scope="col"
								className="th-pointer"
								id="blocks"
								onClick={sortCategory}
							>
								Blocks/Game
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredSlice.map((player) => (
							<tr key={player._id}>
								<th scope="row">
									{player.name}
								</th>
								<td>{player.season}</td>
								<td>{player.games}</td>
								<td>{player.points}</td>
								<td>{player.assists}</td>
								<td>{player.rebounds}</td>
								<td>{player.steals}</td>
								<td>{player.blocks}</td>
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

export default Table;
