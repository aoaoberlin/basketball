import React from "react";

const Table = (props) => {
	const standings = props.data.data.standings;
	return (
		<div className="table-responsive-sm">
			<table className="table table-hover table-striped">
				<thead>
					<tr>
						<th scope="col">Team</th>
						<th scope="col">Position</th>
						<th scope="col">Points</th>
						<th scope="col">Status</th>
					</tr>
				</thead>
				<tbody>
					{standings.map((team) => (
						<tr key={team.team_id}>
							<th scope="row">{team.team_id}</th>
							<td>{team.position}</td>
							<td>{team.points}</td>
							<td>{team.status}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
