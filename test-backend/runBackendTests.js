const {initializeDB, restoreDB} = require("./initializeDatabase");
const runChargesByServiceTests = require("./chargesByServiceTests");

async function runTests() {
    await initializeDB();
    await restoreDB();
}

runTests()
// runChargesByServiceTests()
