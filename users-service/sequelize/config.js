require("dotenv").config();

module.exports = {
    dialect: "mysql",
    seederStorage: "sequelize",
    database: process.env.DB_NAME,
    url: process.env.DB_URI + '/' + process.env.DB_NAME
};