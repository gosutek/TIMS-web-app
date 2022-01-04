"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Stations", {
			stationId: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING(30)
			},
			stationProvider: {
				type: Sequelize.STRING(30)
			},
			stationName: {
				type: Sequelize.STRING(30)
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
		await queryInterface.dropTable("Stations");
	}
};
