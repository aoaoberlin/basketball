import React, { useState, useEffect } from "react";
import usePagination from "./Hooks/usePagination";
import TableFooter from "./TableFooter";

const Table = ({rowsPerPage}) => {
	const [stats, setStats] = useState("");
	const [order, setOrder] = useState({
		points: "descending",
		assists: "descending",
		rebounds: "descending",
		steals: "descending",
		blocks: "descending",
		firstName: "descending",
		year: "descending",
		games: "descending",
	});

	const [page, setPage] = useState(1);
  	const { slice, range } = usePagination(stats, page, rowsPerPage);


	useEffect(() => {
		if (!stats) {
			getStats();
		}
	});

	const getStats = async () => {
		const axios = require("axios");
		const statsFromAPI = await axios
			.get("http://localhost:5005/getStats")
			.then((response) => response.data.stats)
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

	if (!stats) return; // no data yet

	return (
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
					{slice.map((player) => (
						<tr key={player._id}>
							<th scope="row">
								{player.firstName + " " + player.lastName}
							</th>
							<td>{player.year}</td>
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
			<TableFooter slice={slice} setPage={setPage} page={page} range={range} />
		</div>
	);
};

export default Table;