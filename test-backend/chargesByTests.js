const getChargesByData = require("../backend/services/chargesByService");
const {printTestInfo, assert} = require("./auxiliary")


async function runChargesByTests() {
    await printTestInfo("\n-- Running ChargesBy Tests --")
    await test01()
    await test02()
    await test03()
}

async function test01() {
    let testInfo = "Testing Query Results 01"
    let expectedResult = "{\"op_ID\":\"NLLG\",\"RequestTimestamp\":\"2022-02-14 00:19:37\",\"PeriodFrom\":\"2020-01-01 00:00:00\",\"PeriodTo\":\"2021-01-01 23:59:59\",\"PPOList\":[{\"VisitingOperator\":\"WV7J\",\"NumberOfPasses\":2,\"PassesCost\":3.9}]}"

    let testResult = await getChargesByData(
        'NLLG',
        '20200101',
        '20210101',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

async function test02() {
    let testInfo = "Testing Query Results 02"
    let expectedResult = "{\"op_ID\":\"WV7J\",\"RequestTimestamp\":\"2022-02-14 00:32:40\",\"PeriodFrom\":\"2020-01-01 00:00:00\",\"PeriodTo\":\"2021-01-01 23:59:59\",\"PPOList\":[{\"VisitingOperator\":\"NLLG\",\"NumberOfPasses\":2,\"PassesCost\":5.199999999999999}]}"

    let testResult = await getChargesByData(
        'WV7J',
        '20200101',
        '20210101',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

async function test03() {
    let testInfo = "Testing Empty Query Response"
    let expectedResult = "{\"op_ID\":\"randomID\",\"RequestTimestamp\":\"2022-02-14 00:34:37\",\"PeriodFrom\":\"2020-01-01 00:00:00\",\"PeriodTo\":\"2021-01-01 23:59:59\",\"PPOList\":[]}"

    let testResult = await getChargesByData(
        'randomID',
        '20200101',
        '20210101',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

module.exports = runChargesByTests
