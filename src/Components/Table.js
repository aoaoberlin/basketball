import React from "react";

const Table = (props) => {
	console.log(props);
	const data = props.data;

	return (
		<div className="table-responsive-sm">
			<table className="table table-hover table-striped">
				<thead>
					<tr>
						<th scope="col">Player ID</th>
						<th scope="col">Season</th>
						<th scope="col">Games played</th>
						<th scope="col">Minutes played</th>
						<th scope="col">Points</th>
						<th scope="col">Assists</th>
					</tr>
				</thead>
				<tbody>
					{data.map((player) => (
						<tr key={player.player_id}>
							<th scope="row">{player.player_id}</th>
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
