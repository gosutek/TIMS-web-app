'use strict';

const readCSV = require("../utils/read_csv");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return readCSV('sampledata01_vehicles_100.csv')
            .then(function (vehicles) {
                return queryInterface.bulkInsert('Vehicles', vehicles)
            })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Vehicles');
    }
};
