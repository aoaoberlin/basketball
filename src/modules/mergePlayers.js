const importAllPlayers = () => {
	const firstPage = 1;
	const lastPage = 38;
	let players = [];

	for (let page = firstPage; page <= lastPage; page++) {
		const file = require(`../data/players/players${page}`);
		players.push(file.data);
	}

	return players;
};

const cleanPlayers = (players) => {
	const nonEmptyPlayers = players.filter((p) => p.length > 0);
	const mergedArrays = [].concat.apply([], nonEmptyPlayers);
	return mergedArrays;
};

const savePlayers = (players) => {
	const fs = require("fs");

	fs.writeFile(
		`../data/players/players.json`,
		JSON.stringify(players),
		(err) => {
			if (err) throw err;
			console.log(`${players.length} players successfully merged`);
		}
	);
};

const players = importAllPlayers();
const cleanedPlayers = cleanPlayers(players);
savePlayers(cleanedPlayers);
