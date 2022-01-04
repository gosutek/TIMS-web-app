const express = require('express');
const Sequelize = require('sequelize')

const db = require('./models')

const PORT = 9103;

const app = express();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})