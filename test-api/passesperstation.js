const jsonResponse = pm.response.json();
const env = pm.environment.name
console.log(env)
if (env === "OK") {
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });
    pm.test("Test response keys and type for valid request", () => {
        pm.expect(jsonResponse).to.be.an("object");
        pm.expect(jsonResponse).to.have.all.keys("Station", "StationOperator", "RequestTimestamp", "PeriodFrom", "PeriodTo", "NumberOfPasses", "PassesList")
        pm.expect(jsonResponse.Station).to.be.a("string")
        pm.expect(jsonResponse.StationOperator).to.be.a("string")
        pm.expect(jsonResponse.RequestTimestamp).to.be.a("string")
        pm.expect(jsonResponse.PeriodFrom).to.be.a("string")
        pm.expect(jsonResponse.PeriodTo).to.be.a("string")
        pm.expect(jsonResponse.NumberOfPasses).to.be.a("number")
        pm.expect(jsonResponse.PassesList).to.be.an("array")
    });
    pm.test("Test PassesList keys and type for valid request", () => {
        jsonResponse.PassesList.forEach((passesListObj) => {
            pm.expect(passesListObj).to.be.an("object")
            pm.expect(passesListObj).to.have.all.keys("PassIndex", "PassID", "PassTimeStamp", "VehicleID", "TagProvider", "PassType", "PassCharge")
            pm.expect(passesListObj.PassIndex).to.be.a("number")
            pm.expect(passesListObj.PassID).to.be.a("string")
            pm.expect(passesListObj.PassTimeStamp).to.be.a("string")
            pm.expect(passesListObj.VehicleID).to.be.a("string")
            pm.expect(passesListObj.TagProvider).to.be.a("string")
            pm.expect(passesListObj.PassType).to.be.a("string")
            pm.expect(passesListObj.PassCharge).to.be.a("number")
            })
    });   
} else if (env === "BAD REQUEST") {
    pm.test("Status code is 400", () => {
        pm.response.to.have.status(400);
    });
    pm.test("Test response for invalid request", () => {
        pm.expect(jsonResponse).to.have.all.keys("Error", "ErrorType", "Code", "Info")
    });
} else {
    pm.test("Status code is 402", () => {
        pm.response.to.have.status(402);
    });
    pm.test("Test response for no data found", () => {
        pm.expect(jsonResponse).to.have.key("status")
        pm.expect(jsonResponse.status).to.eql("No Data Found")
    });
}
