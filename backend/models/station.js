"use strict";
module.exports = (sequelize, DataTypes) => {
	const Station = sequelize.define("Station", {
        stationId: {
            type: DataTypes.STRING(30),
            validate: {
                notEmpty: true
            }
        },
		stationProvider: {
			type: DataTypes.STRING(30),
			validate: {
				notEmpty: true
			}
		},
		stationName: {
			type: DataTypes.STRING(30),
			validate: {
				notEmpty: true
			}
		}
	});
};
