const Sequelize = require("sequelize");

const sequelize = new Sequelize('tims_test', 'root', '', {
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
}
);

const modelDefinitions = [
    require("./models/station"),
    require("./models/vehicle")
];

for (const eachModel of modelDefinitions) {
    eachModel(sequelize);
}

sequelize.sync(); // Create tables from models

module.exports = sequelize;
