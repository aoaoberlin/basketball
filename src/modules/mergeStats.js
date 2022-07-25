const isDownloaded = (listOfFiles, year, page) => {
	const result = listOfFiles.filter(
		(f) => f === `stats${year}page${page}.json`
	).length;
	return result;
};

const importAllStats = () => {
	const firstYear = 1979;
	const lastYear = 2021;
	const firstPage = 1;
	const lastPage = 38;
	let stats = [];

	const listOfFiles = require("./listOfFiles.json");
	for (let year = firstYear; year <= lastYear; year++) {
		for (let page = firstPage; page <= lastPage; page++) {
			if (isDownloaded(listOfFiles, year, page)) {
				const file = require(`../data/stats/stats${year}page${page}`);
				stats.push(file.data);
			}
		}
	}

	return stats;
};

const cleanStats = (stats) => {
	const nonEmptyStats = stats.filter((s) => s.length > 0);
	const mergedArrays = [].concat.apply([], nonEmptyStats);
	return mergedArrays;
};

const saveStats = (stats) => {
	const fs = require("fs");

	fs.writeFile(`../data/stats/stats.json`, JSON.stringify(stats), (err) => {
		if (err) throw err;
		console.log(`${stats.length} stats successfully merged`);
	});
};

const stats = importAllStats();
const cleanedStats = cleanStats(stats);
saveStats(cleanedStats);
