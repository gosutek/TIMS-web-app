"use strict";

const readCSV = require("../utils/read_csv");

module.exports = {
	up: async (queryInterface, Sequelize) => {
        return readCSV('sampledata01_stations.csv')
            .then(function (stations) {
                return queryInterface.bulkInsert('Stations', stations)
            })
    },

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Stations');
	}
};
