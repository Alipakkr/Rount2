const { Sequelize } = require("sequelize");

const Connection = new Sequelize("joke", "root", process.env.mysqlpassword, {
  host: "localhost",
  dialect: "mysql"
});

module.exports = { Connection };
