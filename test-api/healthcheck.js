pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

const jsonResponse = pm.response.json()
pm.test("Test response format", () => {
    pm.expect(jsonResponse).to.be.an("object")
});
const dbInfo = jsonResponse.dbconnection
pm.test("Validate database info", () => {
    pm.expect(dbInfo).to.have.all.keys("username", "password", "database_name", "dialect");
    pm.expect(dbInfo.database_name).to.eql("tims")
    pm.expect(dbInfo.dialect).to.eql("mysql")
});