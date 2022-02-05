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
            type: DataTypes.STRING(8)
        },
        licenseCountry: {
            type: DataTypes.STRING(30)
        },
	},
    {
        timestamps: false
    })
};

module.exports = Vehicle;

