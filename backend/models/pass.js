const { DataTypes } = require('sequelize')

const Pass = (sequelize) => {
    sequelize.define("Pass", {
            id: {
                type: DataTypes.STRING(30),
                primaryKey: true,
                validate: {
                    notEmpty: true
                }
            },
            timestamp: {
                type: DataTypes.DATE(6),
                validate: {
                    notEmpty: true
                }
            },
            charge: {
                type: DataTypes.DOUBLE()
            },
        },
        {
            timestamps: false
        })
};

module.exports = Pass;

