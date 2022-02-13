const db = require("../server")


module.exports = {
    /*table == String, data = [{}] */
    dbInsert: async function (table, data) {
        try {
            await db.queryInterface.bulkInsert(table, data)
        } catch (err) {
            console.log("Failed to add ->" + JSON.stringify(data))
            console.log(err.stack)
        }
    },
    dbDelete: async function (table, data) {
    },
    dbUdpdate: async function (table, data) {
    },
};