const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.json")[env];

const sequelize = new Sequelize('tims_test', config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
}
);

const modelDefinitions = [
    require("./models/station"),
    require("./models/vehicle"),
    require("./models/pass")
];

for (const eachModel of modelDefinitions) {
    eachModel(sequelize);
}

sequelize.sync(); // Create tables from models

module.exports = sequelize;
