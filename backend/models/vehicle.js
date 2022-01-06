'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class vehicle extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    vehicle.init({
        vehicleID: DataTypes.STRING,
        tagID: DataTypes.STRING,
        tagProvider: DataTypes.STRING,
        providerAbbr: DataTypes.STRING,
        licenseYear: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'vehicle',
    });
    return vehicle;
};