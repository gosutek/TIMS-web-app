async function assert(testResult, expectedResult, testMessage) {
    testResult = removeRequestTimestamps(testResult)
    expectedResult = removeRequestTimestamps(expectedResult)

    // console.log(testResult)
    // console.log(expectedResult)

    if (expectedResult == testResult) {
        await printTestInfo(testMessage + " ---> SUCCESS")
    } else {
        await printTestInfo(testMessage + " ---> FAILED")
    }
}

async function printTestInfo(testInfo) {
    await pause(200)
    console.log(testInfo);
}

const pause = (delay) => new Promise((resolve) => setTimeout(resolve,delay))

function removeRequestTimestamps(json) {
    let jsonObject = JSON.parse(json)
    if (jsonObject.hasOwnProperty("RequestTimestamp")) {
        jsonObject.RequestTimestamp = "";
        return  JSON.stringify(jsonObject)
    }

    return json
}

module.exports = {printTestInfo, assert, pause};
