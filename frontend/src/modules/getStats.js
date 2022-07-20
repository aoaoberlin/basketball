const getPlayersIDs = () => {
	const players = require("./api/players.json");
	const playersIDs = players.data.map((p) => p.id);
	const string = playersIDs.map((p) => `&player_ids[]=${p}`);
	return string.join("");
};

const saveStats = (link, year) => {
	const axios = require("axios");
	const fs = require("fs");

	axios
		.get(link)
		.then(function (response) {
			fs.writeFile(
				`./api/stats/stats${year}.json`,
				JSON.stringify(response.data),
				function (err) {
					if (err) throw err;
					console.log(`Stats from ${year} successfully downloaded`);
				}
			);
			return;
		})
		.catch(function (error) {
			console.log(error);
		});
};

const getStatsByYear = (playersIDs) => {
	let link = "";
	const firstYear = 1979;
	const lastYear = 2021;

	for (let year = firstYear; year <= lastYear; year++) {
		link =
			`https://www.balldontlie.io/api/v1/season_averages?season=${year}` +
			playersIDs;
		saveStats(link, year);
	}
};

const playersIDs = getPlayersIDs();
getStatsByYear(playersIDs);
