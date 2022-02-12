pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Correct json response", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an("object")
    pm.expect(jsonData.status).to.eql("OK");
});