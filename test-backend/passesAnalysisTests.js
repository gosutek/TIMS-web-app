const getPassesAnalysisData = require("../backend/services/passesAnalysisService");
const {printTestInfo, assert} = require("./auxiliary")


async function runPassesAnalysisTests() {
    await printTestInfo("\n-- Running PassesAnalysis Tests --")
    await test01()
    await test02()
}

async function test01() {
    let testInfo = "Testing Query Results"
    let expectedResult = "{\"op1_ID\":\"WV7J\",\"op2_ID\":\"NLLG\",\"RequestTimestamp\":\"2022-02-14 01:12:45\",\"PeriodFrom\":\"2020-01-01 00:00:00\",\"PeriodTo\":\"2021-01-01 23:59:59\",\"NumberOfPasses\":2,\"PassesList\":[{\"PassIndex\":1,\"PassID\":\"1\",\"StationID\":\"07855cr60P8O3N9\",\"TimeStamp\":\"2020-04-02 17:24:52\",\"VehicleID\":\"UP28MBM38391\",\"Charge\":2.4},{\"PassIndex\":2,\"PassID\":\"3\",\"StationID\":\"07855cr60P8O3N9\",\"TimeStamp\":\"2020-05-24 11:27:32\",\"VehicleID\":\"FY47TUN40300\",\"Charge\":2.8}]}"

    let testResult = await getPassesAnalysisData(
        'WV7J',
        'NLLG',
        '20200101',
        '20210101',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

async function test02() {
    let testInfo = "Testing Empty Query Response"
    let expectedResult = "{\"op1_ID\":\"randomID1\",\"op2_ID\":\"randomID2\",\"RequestTimestamp\":\"2022-02-14 01:36:57\",\"PeriodFrom\":\"2020-01-01 00:00:00\",\"PeriodTo\":\"2021-01-01 23:59:59\",\"NumberOfPasses\":0,\"PassesList\":[]}"

    let testResult = await getPassesAnalysisData(
        'randomID1',
        'randomID2',
        '20200101',
        '20210101',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

module.exports = runPassesAnalysisTests
