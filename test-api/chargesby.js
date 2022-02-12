const jsonResponse = pm.response.json();
const env = pm.environment.name
if (env === "OK") {
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    pm.test("Test response keys and type", () => {
        pm.expect(jsonResponse).to.be.an("object");
        pm.expect(jsonResponse).to.have.all.keys("op_ID", "RequestTimestamp", "PeriodFrom", "PeriodTo", "PPOList")
        pm.expect(jsonResponse.op_ID).to.be.a("string")
        pm.expect(jsonResponse.RequestTimestamp).to.be.a("string")
        pm.expect(jsonResponse.PeriodFrom).to.be.a("string")
        pm.expect(jsonResponse.PeriodTo).to.be.a("string")
        pm.expect(jsonResponse.PPOList).to.be.an("array")
    });

    pm.test("Test PPOList keys and type", () => {
        jsonResponse.PPOList.forEach((passesListObj) => {
            pm.expect(passesListObj).to.be.an("object")
            pm.expect(passesListObj).to.have.all.keys("VisitingOperator", "NumberOfPasses", "PassesCost")
            pm.expect(passesListObj.VisitingOperator).to.be.a("string")
            pm.expect(passesListObj.NumberOfPasses).to.be.a("number")
            pm.expect(passesListObj.PassesCost).to.be.a("number")
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

