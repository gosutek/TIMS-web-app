const { DataTypes } = require('sequelize')

const Vehicle = (sequelize) => {
	sequelize.define("Vehicle", {
        id: {
            type: DataTypes.STRING(30),
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
        licenseYear: {
            type: DataTypes.INTEGER(11)
        },
        licensePlate: {
            type: DataTypes.STRING(15),
            unique: true
        },
        licenseCountry: {
            type: DataTypes.STRING(30)
        },
        vehicleType: {
            type: DataTypes.STRING(10)
        }
	},
    {
        timestamps: false
    })
};

module.exports = Vehicle;

