'use strict';

const readCSV = require("../utils/read_csv");
const db = require("../models");
const vehicle = require("../models/vehicle");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return readCSV('sampledata01_vehicles_100.csv')
            .then(function (vehicles) {
                return queryInterface.bulkInsert('Vehicles', vehicles)
            })
    },

    down: async (queryInterface, Sequelize) => {
        return readCSV('sampledata01_vehicles_100.csv')
            .then(function (vehicles) {
                const mockVehicleId = vehicles.map(function (user) {
                    return vehicle.vehicle_id
                })

                return db.Vehicle.destroy({
                    where: {
                        vehicleID: mockVehicleId
                    }
                })
            })
    }
};
