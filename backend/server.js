const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.json")[env];

/*Instantiate database obj which will be our DB */
const db = new Sequelize(
	config.database,
	config.username,
	config.password,
	{
		host: config.host,

		port: config.port,
		dialect: config.dialect,
		logging: false
	}
);

const modelDefinitions = [
	require("./models/pass"),
	require("./models/station"),
	require("./models/vehicle"),
	require("./models/operator"),
	require("./models/tag")
];
/* Instantiate every model */
for (const eachModel of modelDefinitions) {
	eachModel(db);
}
/*Perform associations */
db.models.Operator.hasMany(db.models.Station);

//Operators can own many stations (1:N)
db.models.Station.belongsTo(db.models.Operator);

db.models.Operator.hasMany(db.models.Tag); //Operators own many tags (1:N)
db.models.Tag.belongsTo(db.models.Operator);

db.models.Vehicle.hasMany(db.models.Tag); //A vehicle could have many tags (1:N)
db.models.Tag.belongsTo(db.models.Vehicle);

db.models.Station.hasMany(db.models.Pass); //An operators tag can have many passes (1:N)
db.models.Pass.belongsTo(db.models.Station);

db.models.Tag.hasMany(db.models.Pass); //A tag can have many passes (1:N)
db.models.Pass.belongsTo(db.models.Tag);

db.sync(); // Create tables from models

module.exports = db;
