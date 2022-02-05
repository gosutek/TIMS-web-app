const { DataTypes } = require('sequelize');

const Station = async (sequelize) => {
    sequelize.define("Station", {
        id: {
            type: DataTypes.STRING(30),
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
		stationName: {
            type: DataTypes.STRING(30),
            unique: true
		},
        
	},
    {
        timestamps: false
    })
};

module.exports = Station;
