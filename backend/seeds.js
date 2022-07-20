require("dotenv/config");

const MONGO_URI = process.env.MONGODB_URI;

const mongoose = require('mongoose');
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
  })

const Season = require('./models/Season.model.js');

const seasons = require('./src/api/stats/stats.json');

const players = require('./src/api/players.json');

const seasonsData = seasons.map(season => {
    let properties = {
        firstName: "",
        lastName: "",
        playerId: season.player_id,
        year: season.season,
        games: season.games_played,
        points: season.pts,
        rebounds: season.reb,
        assists: season.ast,
        steals: season.stl,
        blocks: season.blk
    }
    console.log(properties);
    let player = players.data.find(x => x.id === properties.playerId);
    console.log(player);
    properties.firstName = player.first_name;
    properties.lastName = player.last_name;
    console.log(properties);
    return properties
});

Season.insertMany(seasonsData)
    .then(seasons => {
        console.log('Seasons added successfully: ', seasons);
        mongoose.connection.close();
    })
    .catch(err => console.log(err));
