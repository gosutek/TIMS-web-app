const { DataTypes } = require('sequelize')

const Pass = (sequelize) => {
    sequelize.define("Pass", {
            passID: {
                type: DataTypes.STRING(30),
                primaryKey: true,
                validate: {
                    notEmpty: true
                }
            },
            timestamp: {
                type: DataTypes.DATE,
                validate: {
                    notEmpty: true
                }
            },
            stationRef: {
                type: DataTypes.STRING(30),
                validate: {
                    notEmpty: true
                }
            },
            vehicleRef: {
                type: DataTypes.STRING(30),
                validate: {
                    notEmpty: true
                }
            },
            charge: {
                type: DataTypes.DOUBLE,
                validate: {
                    notEmpty: true
                }
            }
        },
        {
            timestamps: false
        })
};

module.exports = Pass;

