async function assert(testResult, expectedResult, testMessage) {
    testResult = removeRequestTimestamps(testResult)
    expectedResult = removeRequestTimestamps(expectedResult)

    // console.log(testResult)
    // console.log(expectedResult)

    if (expectedResult == testResult) {
        await printTestInfo(testMessage + ": SUCCESS")
    } else {
        await printTestInfo(testMessage + ": FAILED")
    }
}

async function printTestInfo(testInfo) {
    pause(500).then(() => { console.log(testInfo); });
}

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function removeRequestTimestamps(json) {
    let jsonObject = JSON.parse(json)
    if (jsonObject.hasOwnProperty("RequestTimestamp")) {
        jsonObject.RequestTimestamp = "";
        return  JSON.stringify(jsonObject)
    }

    return json
}

module.exports = {printTestInfo, assert, pause};
