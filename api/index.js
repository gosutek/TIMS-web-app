const express = require("express");
const server = require("../backend");
const app = express();

const PORT = 9103;

const healthcheck = server.checkDatabaseConnection;

app.get("/admin/healthcheck", (req, res) => {
	healthcheck().then((message) => res.json(message));
});


app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
