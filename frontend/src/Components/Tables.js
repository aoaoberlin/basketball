import React, { useState, useEffect } from "react";
import TableAssists from "./TableAssists";
import TablePoints from "./TablePoints";
import TableRebounds from "./TableRebounds";
import TableSteals from "./TableSteals";
import TableBlocks from "./TableBlocks";

const Tables = () => {
	console.log("inside Table");
	const [stats, setStats] = useState("");
	const [search, setSearch] = useState("");

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
			.then((response) => response.data.stats)
			.catch((error) => console.log(error));
		setStats(statsFromAPI);
	};

	const handleSearchChange = (e) => {
		console.log("inside Table -> handleSearchChange");
		setSearch(e.target.value);
	};

	const filteredStats = !search
		? stats
		: stats.filter(
				(s) =>
					[s.firstName.toLowerCase(), s.lastName.toLowerCase()]
						.join(" ")
						.includes(search.toLowerCase()) ||
					String(s.year).includes(search.toLowerCase())
		  );

	if (!filteredStats) {
		console.log("inside Table -> no data yet");
		return;
	} // no data yet

	console.log("search:", search);
	console.log("filteredStats:", filteredStats);

	return (
		<React.Fragment>
			<div className="form-outline row d-flex justify-content-center">
				<input
					type="search"
					id="seach-input"
					className="form-control"
					placeholder="Search for names or years"
					aria-label="Search"
					value={search}
					onChange={handleSearchChange}
				/>
			</div>
			<div class="row">
				<div class="col-sm-6">
					<div class="card">
						<TablePoints
							name={"Points/Game"}
							fullStats={filteredStats}
							category={"points"}
						/>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="card">
						<TableAssists
							name={"Assists/Game"}
							fullStats={filteredStats}
							category={"assists"}
						/>
					</div>
				</div>
			</div>
			{/* <TableRebounds
				name="Rebounds/Game"
				fullStats={stats}
				category={"rebounds"}
			/>
			<TableSteals
				name="Steals/Game"
				fullStats={stats}
				category={"steals"}
			/>
			<TableBlocks
				name="Blocks/Game"
				fullStats={stats}
				category={"blocks"}
			/> */}
		</React.Fragment>
	);
};

export default Tables;