"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const defaultTimeUp = {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }

        return queryInterface.changeColumn(
            'Stations',
            'createdAt',
            defaultTimeUp,
        )
            .then(function() {
                return queryInterface.changeColumn(
                    'Stations',
                    'updatedAt',
                    defaultTimeUp
                )
            })
	},

	down: async (queryInterface, Sequelize) => {
		const defaulTimeDown = {
            allowNull: false,
            type: Sequelize.DATE,
        }

        return queryInterface.changeColumn(
            'Stations',
            'createdAt',
            defaulTimeDown
        )
            .then(function() {
                return queryInterface.changeColumn(
                    'Stations',
                    'updatedAt',
                    defaulTimeDown
                )
            })
	}
};
