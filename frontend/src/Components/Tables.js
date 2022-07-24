import React, { useState, useEffect } from "react";
import TableAssists from "./TableAssists";
import TablePoints from "./TablePoints";
import TableRebounds from "./TableRebounds";
import TableSteals from "./TableSteals";
import TableBlocks from "./TableBlocks";

const Tables = () => {
	console.log("inside Table");
	const [stats, setStats] = useState("");

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

	if (!stats) {
		console.log("inside Table -> no data yet");
		return;
	} // no data yet

	return (
		<React.Fragment>
			<TablePoints
				name={"Points/Game"}
				fullStats={stats}
				category={"points"}
			/>
			<TableAssists
				name={"Assists/Game"}
				fullStats={stats}
				category={"assists"}
			/>
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
