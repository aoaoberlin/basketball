const isDownloaded = (listOfFiles, year, page) => {
	const result = listOfFiles.filter(
		(f) => f === `stats${year}page${page}.json`
	).length;
	return result;
};

const getPlayersIDs = (page) => {
	const players = require(`../data/players/players${page}.json`);
	const playersIDs = players.data.map((p) => p.id);
	const string = playersIDs.map((p) => `&player_ids[]=${p}`);
	return string.join("");
};

// const getStatsByYear = (playersIDs, page) => {
// 	let link = "";
// 	const firstYear = 1979;
// 	const lastYear = 2021;

// 	for (let year = firstYear; year <= lastYear; year++) {
// 		link =
// 			`https://www.balldontlie.io/api/v1/season_averages?season=${year}` +
// 			playersIDs;
// 		saveStats(link, year, page);
// 	}
// };

const getAndSaveStats = (playersIDs, page, year) => {
	const axios = require("axios");
	const fs = require("fs");
	const link =
		`https://www.balldontlie.io/api/v1/season_averages?season=${year}` +
		playersIDs;

	axios
		.get(link)
		.then((response) => {
			fs.writeFile(
				`../data/stats/stats${year}page${page}.json`,
				JSON.stringify(response.data),
				(err) => {
					if (err) throw err;
					console.log(`Stats from ${year} successfully downloaded`);
				}
			);
			return;
		})
		.catch((error) => {
			console.log(error);
		});
};

const listOfFiles = require("./listOfFiles.json");
for (let year = 1979; year <= 2021; year++) {
	for (let page = 1; page <= 38; page++) {
		if (!isDownloaded(listOfFiles, year, page)) {
			const playersIDs = getPlayersIDs(page);
			getAndSaveStats(playersIDs, page, year);
		} else console.log(`year ${year} page ${page} not downloaded. Why?`);
	}
}
