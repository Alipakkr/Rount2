const { DataTypes } = require("sequelize");
const { Connection } = require("../db");
const Joke = Connection.define("Joke", {
    Description: DataTypes.STRING,
    favoriteJoke: DataTypes.TEXT, 
});
module.exports = { Joke };
