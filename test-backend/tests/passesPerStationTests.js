const getPassesPerStationData = require("../../backend/services/passesPerStationService");
const {printTestInfo, assert} = require("./auxiliary")


async function runPassesPerStationTests() {
    await printTestInfo("\n-- Running PassesPerStation Tests --")
    await test01()
    await test02()
    await test03()
    await test04()
}

async function test01() {
    let testInfo = "Testing Query Results 01"
    let expectedResult = "{\"Station\":\"07855cr60P8O3N9\",\"StationOperator\":\"WV7J\",\"RequestTimestamp\":\"2022-02-14 01:23:49\",\"PeriodFrom\":\"2020-01-01 00:00:00\",\"PeriodTo\":\"2021-01-01 23:59:59\",\"NumberOfPasses\":2,\"PassesList\":[{\"PassIndex\":1,\"PassID\":\"1\",\"PassTimeStamp\":\"2020-04-02 17:24:52\",\"VehicleID\":\"UP28MBM38391\",\"TagProvider\":\"NLLG\",\"PassType\":\"visitor\",\"PassCharge\":2.4},{\"PassIndex\":2,\"PassID\":\"3\",\"PassTimeStamp\":\"2020-05-24 11:27:32\",\"VehicleID\":\"FY47TUN40300\",\"TagProvider\":\"NLLG\",\"PassType\":\"visitor\",\"PassCharge\":2.8}]}"

    let testResult = await getPassesPerStationData(
        '07855cr60P8O3N9',
        '20200101',
        '20210101',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

async function test02() {
    let testInfo = "Testing Query Results 02"
    let expectedResult = "{\"Station\":\"1mv8ZN316KYs25W\",\"StationOperator\":\"NLLG\",\"RequestTimestamp\":\"2022-02-14 01:24:13\",\"PeriodFrom\":\"2020-01-01 00:00:00\",\"PeriodTo\":\"2021-01-01 23:59:59\",\"NumberOfPasses\":2,\"PassesList\":[{\"PassIndex\":1,\"PassID\":\"2\",\"PassTimeStamp\":\"2020-04-05 15:21:12\",\"VehicleID\":\"EV77EDV52985\",\"TagProvider\":\"NLLG\",\"PassType\":\"home\",\"PassCharge\":2.3},{\"PassIndex\":2,\"PassID\":\"4\",\"PassTimeStamp\":\"2020-05-15 21:13:47\",\"VehicleID\":\"RR98KQE80731\",\"TagProvider\":\"WV7J\",\"PassType\":\"visitor\",\"PassCharge\":1.5}]}"

    let testResult = await getPassesPerStationData(
        '1mv8ZN316KYs25W',
        '20200101',
        '20210101',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

async function test03() {
    let testInfo = "Testing Query Results 03"
    let expectedResult = "{\"Station\":\"2O24G0KU04A8K91\",\"StationOperator\":\"WV7J\",\"RequestTimestamp\":\"2022-02-14 01:24:45\",\"PeriodFrom\":\"2020-01-01 00:00:00\",\"PeriodTo\":\"2021-01-01 23:59:59\",\"NumberOfPasses\":2,\"PassesList\":[{\"PassIndex\":1,\"PassID\":\"5\",\"PassTimeStamp\":\"2020-06-05 00:55:25\",\"VehicleID\":\"QO68DIC93032\",\"TagProvider\":\"WV7J\",\"PassType\":\"home\",\"PassCharge\":3.1},{\"PassIndex\":2,\"PassID\":\"7\",\"PassTimeStamp\":\"2020-06-08 12:07:24\",\"VehicleID\":\"IZ65WAT29135\",\"TagProvider\":\"WV7J\",\"PassType\":\"home\",\"PassCharge\":2.7}]}"

    let testResult = await getPassesPerStationData(
        '2O24G0KU04A8K91',
        '20200101',
        '20210101',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

async function test04() {
    let testInfo = "Testing Empty Query Response"
    let expectedResult = "{\"Station\":\"randomID\",\"StationOperator\":null,\"RequestTimestamp\":\"2022-02-14 01:35:54\",\"PeriodFrom\":\"2020-01-01 00:00:00\",\"PeriodTo\":\"2021-01-01 23:59:59\",\"NumberOfPasses\":0,\"PassesList\":[]}"

    let testResult = await getPassesPerStationData(
        'randomID',
        '20200101',
        '20210101',
        'json'
    );

    await assert(testResult, expectedResult, testInfo)
}

module.exports = runPassesPerStationTests
