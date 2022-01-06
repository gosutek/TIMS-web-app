const express = require('express');
const Sequelize = require('sequelize')

const db = require('./models')

const PORT = 9103;

const app = express();

async function checkDatabaseConnection() {
    try {
        await db.sequelize.authenticate();
        console.log('Connection to database has been established successfully');;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

async function init() {
    await checkDatabaseConnection();
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
}

init();