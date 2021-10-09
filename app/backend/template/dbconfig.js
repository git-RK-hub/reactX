export const mongoDbConfig = () => `const mongoose = require('mongoose');
const DB = process.env.M_DB;

mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Connected successfully");
})
module.exports = db;
`;

export const sqlDbConfig = () => `const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.SQL_DB_NAME, process.env.SQL_DB_USER, process.env.SQL_DB_PASSWORD, {
    host: process.env.SQL_DB_HOST,
    dialect: process.env.SQL_DB_DIALECT,
    port: process.env.SQL_DB_PORT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
});
const db = {};
db.sequelize = sequelize;
module.exports = db;
`;
