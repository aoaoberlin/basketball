import React, { useState, useEffect } from "react";
import usePagination from "./Hooks/usePagination";
import Pagination from "./Pagination";

const TableAssists = ({ name, filteredSlice, category }) => {
	if (filteredSlice.length === 0) {
		console.log("inside TableAssists -> no data yet");
		return;
	} // no data yet

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
								// onClick={sortCategory}
							>
								Season
							</th>
							<th
								scope="col"
								className="th-pointer"
								id="games"
								// onClick={sortCategory}
							>
								Games played
							</th>
							<th
								scope="col"
								className="th-pointer"
								id="points"
								// onClick={sortCategory}
							>
								{name}
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredSlice
							.sort((a, b) => b[category] - a[category])
							.map((player) => (
								<tr key={player._id}>
									<th scope="row">{player.firstName}</th>
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

export default TableAssists;
