const {initializeDB, restoreDB} = require("./initializeDatabase");
const runPassesPerStationTests = require("./passesPerStationTests");
const runPassesAnalysisTests = require("./passesAnalysisTests");
const runPassesCostTests = require("./passesCostTests");
const runChargesByTests = require("./chargesByTests");

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
