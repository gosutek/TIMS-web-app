const { DataTypes } = require('sequelize');

const Operator = async (sequelize) => {
    sequelize.define("Operator", {
        id: {
            type: DataTypes.STRING(30),
            primaryKey: true,
            validate: {
                notEmpty: true
            }
        },
		operatorName: {
            type: DataTypes.STRING(30),
            unique: true
		},
        operatorAbbr: {
            type: DataTypes.STRING(30),
            unique: true
        },
        iban: {
            type: DataTypes.STRING(34),
            unique: true
        },
	},
    {
        timestamps: false
    })
};

module.exports = Operator;
