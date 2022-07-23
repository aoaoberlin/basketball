import React, { useState, useEffect } from "react";
import usePagination from "./Hooks/usePagination";
import Pagination from "./Pagination";
import TableAssists from "./TablesAssists";
import TablePoints from "./TablesPoints";

const Tables = () => {
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

	if (filteredSlice.length === 0) {
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
			<TablePoints
				name={"Points/Game"}
				filteredSlice={filteredSlice}
				category={"points"}
			/>
			{console.log("filteredSlice inside Table -> return", filteredSlice)}
			<TableAssists
				name={"Assists/Game"}
				filteredSlice={filteredSlice}
				category={"assists"}
			/>
			{/* <TableRebounds
				name="Rebounds/Game"
				filteredSlice={filteredSlice.map((f) => ({
					name: f.firstName + " " + f.lastName,
					year: f.year,
					games: f.games,
					stats: f.rebounds,
				}))}
			/>
			<TableSteals
				name="Steals/Game"
				filteredSlice={filteredSlice.map((f) => ({
					name: f.firstName + " " + f.lastName,
					year: f.year,
					games: f.games,
					stats: f.steals,
				}))}
			/>
			<TableBlocks
				name="Blocks/Game"
				filteredSlice={filteredSlice.map((f) => ({
					name: f.firstName + " " + f.lastName,
					year: f.year,
					games: f.games,
					stats: f.blocks,
				}))}
			/> */}
			<Pagination
				slice={slice}
				setPage={setPage}
				page={page}
				range={range}
			/>
		</React.Fragment>
	);
};

export default Tables;
