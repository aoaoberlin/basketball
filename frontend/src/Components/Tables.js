import { useState, useEffect } from "react";
import TablePoints from "./TablePoints";
import TableThreePointsMade from "./TableThreePointsMade";
import TableAssists from "./TableAssists";
import TableRebounds from "./TableRebounds";
import TableSteals from "./TableSteals";
import TableBlocks from "./TableBlocks";

const Tables = () => {
	const [stats, setStats] = useState("");
	const [search, setSearch] = useState("");
	const rowsPerPage = 10;

	useEffect(() => {
		if (stats.length === 0) {
			getAllStats();
		}
	});

	const getAllStats = async () => {
		let statsFromAPI = [];
		statsFromAPI.push(await getSpecificStats("points"));
		statsFromAPI.push(await getSpecificStats("threePoints"));
		statsFromAPI.push(await getSpecificStats("assists"));
		statsFromAPI.push(await getSpecificStats("rebounds"));
		statsFromAPI.push(await getSpecificStats("steals"));
		statsFromAPI.push(await getSpecificStats("blocks"));
		setStats(statsFromAPI);
	};

	const getSpecificStats = (category) => {
		const axios = require("axios");
		return axios
			.get(`${process.env.REACT_APP_API_URL}/getStats/${category}`)
			.then((response) => response.data.stats)
			.catch((error) => console.log(error));
	};

	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};

	const filteredStats = !search
		? stats
		: stats
				.map((s) => s)
				.filter(
					(s) =>
						s.name.toLowerCase().includes(search.toLowerCase()) ||
						String(s.season).includes(search)
				);

	if (filteredStats.length === 0) {
		return (
			<h2 className="text-center" id="h2-loading-data">
				LOADING DATA...
			</h2>
		);
	}

	return (
		<div className="container-fluid text-responsive">
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
			<div className="row">
				<div className="col-sm-6">
					<div className="card">
						<TablePoints
							name={"Points"}
							fullStats={filteredStats[0]}
							category={"points"}
							header={"PTS"}
							rowsPerPage={rowsPerPage}
						/>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="card">
						<TableThreePointsMade
							name="Three-Point Goals Made"
							fullStats={filteredStats[1]}
							category={"threePoints"}
							header={"3FGM"}
							rowsPerPage={rowsPerPage}
						/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6">
					<div className="card">
						<TableAssists
							name={"Assists"}
							fullStats={filteredStats[2]}
							category={"assists"}
							header={"AST"}
							rowsPerPage={rowsPerPage}
						/>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="card">
						<TableRebounds
							name="Rebounds"
							fullStats={filteredStats[3]}
							category={"rebounds"}
							header={"REB"}
							rowsPerPage={rowsPerPage}
						/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6">
					<div className="card">
						<TableSteals
							name="Steals"
							fullStats={filteredStats[4]}
							category={"steals"}
							header={"STL"}
							rowsPerPage={rowsPerPage}
						/>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="card">
						<TableBlocks
							name="Blocks"
							fullStats={filteredStats[5]}
							category={"blocks"}
							header={"BLK"}
							rowsPerPage={rowsPerPage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tables;
