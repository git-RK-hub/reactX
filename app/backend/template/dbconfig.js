export const mongoDbConfig = () => `const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Connected successfully");
}
module.exports = db;
`;

export const sqlDbConfig = () => `
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: procees.env.HOST,
    dialect: process.env.dialect,
    port: process.env.port,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
const db = {};
db.sequelize = sequelize;
module.exports = db;
`;
