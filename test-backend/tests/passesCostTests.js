const getPassesCostData = require("../../backend/services/passesCostService");
const {printTestInfo, assert} = require("./auxiliary")


async function runPassesCostTests() {
    await printTestInfo("\n-- Running PassesCost Tests --")
    await test01()
    await test02()
    await test03()
}

async function test01() {
    let testInfo = "Testing Query Results 01"
    let expectedResult = "{\"op1_ID\":\"WV7J\",\"op2_ID\":\"NLLG\",\"RequestTimestamp\":\"2022-02-14 01:33:12\",\"PeriodFrom\":\"2020-01-01 00:00:00\",\"PeriodTo\":\"2021-01-01 23:59:59\",\"NumberOfPasses\":2,\"PassesCost\":5.199999999999999}"

    let testResult = await getPassesCostData(
        'WV7J',
        'NLLG',
        '20200101',
        '20210101',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

async function test02() {
    let testInfo = "Testing Query Results 02"
    let expectedResult = "{\"op1_ID\":\"NLLG\",\"op2_ID\":\"WV7J\",\"RequestTimestamp\":\"2022-02-14 01:33:36\",\"PeriodFrom\":\"2020-01-01 00:00:00\",\"PeriodTo\":\"2021-01-01 23:59:59\",\"NumberOfPasses\":2,\"PassesCost\":3.9}"

    let testResult = await getPassesCostData(
        'NLLG',
        'WV7J',
        '20200101',
        '20210101',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

async function test03() {
    let testInfo = "Testing Empty Query Response"
    let expectedResult = "{\"op1_ID\":\"randomID1\",\"op2_ID\":\"randomID2\",\"RequestTimestamp\":\"2022-02-14 01:37:46\",\"PeriodFrom\":\"2020-01-01 00:00:00\",\"PeriodTo\":\"2021-01-01 23:59:59\",\"NumberOfPasses\":0,\"PassesCost\":null}"

    let testResult = await getPassesCostData(
        'randomID1',
        'randomID2',
        '20200101',
        '20210101',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

module.exports = runPassesCostTests
