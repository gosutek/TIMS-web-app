const getChargesByData = require("../backend/services/chargesByService");
const {printTestInfo, assert, pause} = require("./auxiliary")
const db = require("../backend");


async function runChargesByTests() {
    printTestInfo("Running ChargesBy Endpoint Tests")
    await test01()
    await test02()
    await test03()
}

async function test01() {
    let testInfo = "Test 01: Testing Query Results"
    let expectedResult = "{\"op_ID\":\"NJO4\",\"RequestTimestamp\":\"\",\"PeriodFrom\":\"2000-07-09 00:00:00\",\"PeriodTo\":\"2019-07-09 23:59:59\",\"PPOList\":[{\"VisitingOperator\":\"1G5N\",\"NumberOfPasses\":3,\"PassesCost\":30.02},{\"VisitingOperator\":\"1VYY\",\"NumberOfPasses\":5,\"PassesCost\":59.17},{\"VisitingOperator\":\"JNI9\",\"NumberOfPasses\":6,\"PassesCost\":58.04},{\"VisitingOperator\":\"NLLG\",\"NumberOfPasses\":4,\"PassesCost\":54.24},{\"VisitingOperator\":\"SXNF\",\"NumberOfPasses\":2,\"PassesCost\":22.04},{\"VisitingOperator\":\"WV7J\",\"NumberOfPasses\":5,\"PassesCost\":54.69}]}"

    let testResult = await getChargesByData(
        'NJO4',
        '20000709',
        '20190709',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

async function test02() {
    let testInfo = "Test 02: Testing Query Results"
    let expectedResult = "{\"op_ID\":\"NJO4\",\"RequestTimestamp\":\"\",\"PeriodFrom\":\"2000-07-09 00:00:00\",\"PeriodTo\":\"2019-07-09 23:59:59\",\"PPOList\":[{\"VisitingOperator\":\"1G5N\",\"NumberOfPasses\":3,\"PassesCost\":30.02},{\"VisitingOperator\":\"1VYY\",\"NumberOfPasses\":5,\"PassesCost\":59.17},{\"VisitingOperator\":\"JNI9\",\"NumberOfPasses\":6,\"PassesCost\":58.04},{\"VisitingOperator\":\"NLLG\",\"NumberOfPasses\":4,\"PassesCost\":54.24},{\"VisitingOperator\":\"SXNF\",\"NumberOfPasses\":2,\"PassesCost\":22.04},{\"VisitingOperator\":\"WV7J\",\"NumberOfPasses\":5,\"PassesCost\":54.69}]}"

    let testResult = await getChargesByData(
        'NJO4',
        '20000709',
        '20190709',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

async function test03() {
    let testInfo = "Test 03: Testing Empty Query Response"
    let expectedResult = "{\"op_ID\":\"randomID\",\"RequestTimestamp\":\"\",\"PeriodFrom\":\"2000-07-09 00:00:00\",\"PeriodTo\":\"2019-07-09 23:59:59\",\"PPOList\":[]}"

    let testResult = await getChargesByData(
        'randomID',
        '20000709',
        '20190709',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

module.exports = runChargesByTests;
