const { DataTypes } = require('sequelize')

const Vehicle = (sequelize) => {
	sequelize.define("Vehicle", {
        vehicleID: {
            type: DataTypes.STRING(30),
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
		tagID: {
			type: DataTypes.STRING(30),
			validate: {
				notEmpty: true
			}
		},
		tagProvider: {
			type: DataTypes.STRING(30),
			validate: {
				notEmpty: true
			}
		},
        providerAbbr: {
            type: DataTypes.STRING(30),
            validate: {
                notEmpty: true
            }
        },
        licenseYear: {
            type: DataTypes.INTEGER(11),
            validate: {
                notEmpty: true
            }
        }
	},
    {
        timestamps: false
    })
};

module.exports = Vehicle;

