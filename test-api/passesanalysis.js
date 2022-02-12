const jsonResponse = pm.response.json();
const env = pm.environment.name
if (env === "OK") {
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    pm.test("Test response keys and type", () => {
        pm.expect(jsonResponse).to.be.an("object");
        pm.expect(jsonResponse).to.have.all.keys("op1_ID", "op2_ID", "RequestTimestamp", "PeriodFrom", "PeriodTo", "NumberOfPasses", "PassesList")
        pm.expect(jsonResponse.op1_ID).to.be.a("string")
        pm.expect(jsonResponse.op2_ID).to.be.a("string")
        pm.expect(jsonResponse.RequestTimestamp).to.be.a("string")
        pm.expect(jsonResponse.PeriodFrom).to.be.a("string")
        pm.expect(jsonResponse.PeriodTo).to.be.a("string")
        pm.expect(jsonResponse.NumberOfPasses).to.be.a("number")
        pm.expect(jsonResponse.PassesList).to.be.an("array")
    });

    pm.test("Test PassesList keys and type", () => {
        jsonResponse.PassesList.forEach((passesListObj) => {
            pm.expect(passesListObj).to.be.an("object")
            pm.expect(passesListObj).to.have.all.keys("PassIndex", "PassID", "StationID", "TimeStamp", "VehicleID", "Charge")
            pm.expect(passesListObj.PassIndex).to.be.a("number")
            pm.expect(passesListObj.PassID).to.be.a("string")
            pm.expect(passesListObj.StationID).to.be.a("string")
            pm.expect(passesListObj.TimeStamp).to.be.a("string")
            pm.expect(passesListObj.VehicleID).to.be.a("string")
            pm.expect(passesListObj.Charge).to.be.a("number")
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
