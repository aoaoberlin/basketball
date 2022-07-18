import React from "react";

const Table = (props) => {
	const stats = props.stats;
	const players = props.players.data;

	return (
		<div className="table-responsive-sm">
			<table className="table table-hover table-striped">
				<thead>
					<tr>
						<th scope="col">Player</th>
						<th scope="col">Season</th>
						<th scope="col">Games played</th>
						<th scope="col">Minutes played</th>
						<th scope="col">Points</th>
						<th scope="col">Assists</th>
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
							<td>{player.min}</td>
							<td>{player.pts}</td>
							<td>{player.ast}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
