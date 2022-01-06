"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const defaultTimeUp = {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }

        return queryInterface.changeColumn(
            'Vehicles',
            'createdAt',
            defaultTimeUp,
        )
            .then(function() {
                return queryInterface.changeColumn(
                    'Vehicles',
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
            'Vehicles',
            'createdAt',
            defaulTimeDown
        )
            .then(function() {
                return queryInterface.changeColumn(
                    'Vehicles',
                    'updateAt',
                    defaulTimeDown
                )
            })
	}
};
