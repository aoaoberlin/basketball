const importAllStats = () => {
	const firstYear = 1979;
	const lastYear = 2021;
	let stats = [];

	for (let year = firstYear; year <= lastYear; year++) {
		const yStats = require(`./api/stats/stats${year}`);
		stats.push(yStats.data);
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

	fs.writeFile(
		`./api/stats/stats.json`,
		JSON.stringify(stats),
		function (err) {
			if (err) throw err;
			console.log(`Stats successfully saved`);
		}
	);
};

const stats = importAllStats();
const cleanedStats = cleanStats(stats);
saveStats(cleanedStats);
