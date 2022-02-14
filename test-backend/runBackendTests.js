const {initializeDB, restoreDB} = require("./tests/initializeDatabase");
const runPassesPerStationTests = require("./tests/passesPerStationTests");
const runPassesAnalysisTests = require("./tests/passesAnalysisTests");
const runPassesCostTests = require("./tests/passesCostTests");
const runChargesByTests = require("./tests/chargesByTests");

async function runTests() {
    await initializeDB();
    await runPassesPerStationTests()
    await runPassesAnalysisTests()
    await runPassesCostTests()
    await runChargesByTests()
    await restoreDB();
    process.exit()
}

runTests()
