import React, {useState, useEffect} from "react";

const Table = (props) => {
	const players = props.players.data;
	const [stats, sortPlayers] = useState(props.stats);
	function onCategoryClick(e) {
		let category = e.target.id;
		const sorted = [...stats].sort((a, b) => b[category] - a[category]);
		console.log(sorted);
		sortPlayers(sorted)
	}

	return (
		<div className="table-responsive-sm">
			<table className="table table-hover table-striped">
				<thead>
					<tr>
						<th scope="col">Player</th>
						<th scope="col">Season</th>
						<th scope="col">Games played</th>
						<th scope="col" id="pts" onClick={onCategoryClick}>Points/Game</th>
						<th scope="col" id="ast" onClick={onCategoryClick}>Assists/Game</th>
						<th scope="col" id="reb" onClick={onCategoryClick}>Rebounds/Game</th>
						<th scope="col" id="stl" onClick={onCategoryClick}>Steals/Game</th>
						<th scope="col" id="blk" onClick={onCategoryClick}>Blocks/Game</th>
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
