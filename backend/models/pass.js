'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class pass extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };

    pass.init({
        passID: DataTypes.STRING,
        timestamp: DataTypes.DATE,
        stationRef: DataTypes.STRING,
        vehicleRef: DataTypes.STRING,
        charge: DataTypes.FLOAT
    }, {
        sequelize,
        modelName: 'pass',
    });

    return pass;
};