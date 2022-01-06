"use strict";

const readCSV = require("../utils/read_csv");
const db = require("../models");
const station = require("../models/station");

module.exports = {
	up: async (queryInterface, Sequelize) => {
        return readCSV('sampledata01_stations.csv')
            .then(function (stations) {
                return queryInterface.bulkInsert('Stations', stations)
            })
    },

	down: async (queryInterface, Sequelize) => {
		return readCSV('sampledata01_stations.csv')
            .then(function (stations) {
                const mockStationId = stations.map(function (user) {
                    return station.station_id
                })

                return db.Station.destroy({
                    where: {
                        station_id: mockStationId
                    }
                })
            })
	}
};
