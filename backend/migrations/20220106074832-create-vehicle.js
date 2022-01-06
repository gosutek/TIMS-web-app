'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Vehicles', {
            vehicleID: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING(30)
            },
            tagID: {
                type: Sequelize.STRING(30)
            },
            tagProvider: {
                type: Sequelize.STRING(30)
            },
            providerAbbr: {
                type: Sequelize.STRING(30)
            },
            licenseYear: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Vehicles');
    }
};