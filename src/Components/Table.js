import React, { useState, useEffect } from "react";

const Table = (props) => {
	const players = props.players.data;
	const [stats, sortStats] = useState(props.stats);
	const [order, setOrder] = useState({
		pts: "des",
		ast: "des",
		reb: "des",
		stl: "des",
		blk: "des",
	});

	const sortCategory = (e) => {
		const category = e.target.id;
		console.log("category clicked:", category);
		console.log(
			"order",
			category,
			"in the following way:",
			order[category]
		);
		if (order[category] === "des") {
			const sortedStats = [...stats].sort(
				(a, b) => b[category] - a[category]
			);
			setOrder({ ...order, [category]: "asc" });
			sortStats(sortedStats);
		} else if (order[category] === "asc") {
			const sortedStats = [...stats].sort(
				(a, b) => a[category] - b[category]
			);
			setOrder({ ...order, [category]: "des" });
			sortStats(sortedStats);
		}
	};

	return (
		<div className="table-responsive-sm">
			<table className="table table-hover table-striped">
				<thead>
					<tr>
						<th scope="col">Player</th>
						<th scope="col">Season</th>
						<th scope="col">Games played</th>
						<th
							scope="col"
							className="th-pointer"
							id="pts"
							onClick={sortCategory}
						>
							Points/Game
						</th>
						<th
							scope="col"
							className="th-pointer"
							id="ast"
							onClick={sortCategory}
						>
							Assists/Game
						</th>
						<th
							scope="col"
							className="th-pointer"
							id="reb"
							onClick={sortCategory}
						>
							Rebounds/Game
						</th>
						<th
							scope="col"
							className="th-pointer"
							id="stl"
							onClick={sortCategory}
						>
							Steals/Game
						</th>
						<th
							scope="col"
							className="th-pointer"
							id="blk"
							onClick={sortCategory}
						>
							Blocks/Game
						</th>
					</tr>
				</thead>
				<tbody>
					{stats.map((player, index) => (
						<tr key={String(index) + String(player.player_id)}>
							<th scope="row">
								{players
									.filter((p) => p.id === player.player_id)
									.map(
										(p) => p.first_name + " " + p.last_name
									)}
							</th>
							<td>{player.season}</td>
							<td>{player.games_played}</td>
							<td>{player.pts}</td>
							<td>{player.ast}</td>
							<td>{player.reb}</td>
							<td>{player.stl}</td>
							<td>{player.blk}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
