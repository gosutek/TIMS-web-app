const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.json")[env];


/*Instantiate database obj which will be our DB */
const db = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
}
);

const modelDefinitions = [
    require("./models/station"),
    require("./models/vehicle"),
    require("./models/pass"),
    require("./models/operator"),
    require("./models/tag"),
];
/* Instantiate every model */
for (const eachModel of modelDefinitions) {
    eachModel(db);
}
/*Perform associations */
db.models.Operator.hasMany(db.models.Station); //Operators can own many stations (1:N)
db.models.Operator.hasMany(db.models.Tag); //Operators own many tags (1:N)
db.models.Vehicle.hasMany(db.models.Tag); //A vehicle could have many tags (1:N)
db.models.Station.hasMany(db.models.Pass); //An operators tag can have many passes (1:N)
db.models.Vehicle.hasMany(db.models.Pass); //A station can have many passes (1:N)

db.sync(); // Create tables from models
module.exports = db;



