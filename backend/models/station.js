const { DataTypes } = require('sequelize');

const Station = async (sequelize) => {
    sequelize.define("Station", {
        stationID: {
            type: DataTypes.STRING(30),
            primaryKey: true,
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
		},
        
	},
    {
        timestamps: false
    })
};

module.exports = Station;
