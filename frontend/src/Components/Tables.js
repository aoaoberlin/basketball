import { useState, useEffect } from "react";
import SubTable from "./SubTable";

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
		statsFromAPI.push(await getCategoryStats("points"));
		statsFromAPI.push(await getCategoryStats("threePoints"));
		statsFromAPI.push(await getCategoryStats("assists"));
		statsFromAPI.push(await getCategoryStats("rebounds"));
		statsFromAPI.push(await getCategoryStats("steals"));
		statsFromAPI.push(await getCategoryStats("blocks"));
		setStats(statsFromAPI);
	};

	const getCategoryStats = (category) => {
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
		: stats.map((s) =>
				s.filter(
					(s) =>
						s.name.toLowerCase().includes(search.toLowerCase()) ||
						String(s.season).includes(search)
				)
		  );

	if (filteredStats.length === 0) {
		return (
			<div className="d-flex justify-content-center">
				<div
					className="spinner-border text-primary"
					role="status"
				></div>
			</div>
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
						<SubTable
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
						<SubTable
							name={"Assists"}
							fullStats={filteredStats[2]}
							category={"assists"}
							header={"AST"}
							rowsPerPage={rowsPerPage}
						/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6">
					<div className="card">
						<SubTable
							name="Rebounds"
							fullStats={filteredStats[3]}
							category={"rebounds"}
							header={"REB"}
							rowsPerPage={rowsPerPage}
						/>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="card">
						<SubTable
							name="Steals"
							fullStats={filteredStats[4]}
							category={"steals"}
							header={"STL"}
							rowsPerPage={rowsPerPage}
						/>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6">
					<div className="card">
						<SubTable
							name="Blocks"
							fullStats={filteredStats[5]}
							category={"blocks"}
							header={"BLK"}
							rowsPerPage={rowsPerPage}
						/>
					</div>
				</div>
				<div className="col-sm-6">
					<div className="card">
						<SubTable
							name="Three-Pointers Made"
							fullStats={filteredStats[1]}
							category={"threePoints"}
							header={"3FGM"}
							rowsPerPage={rowsPerPage}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tables;
