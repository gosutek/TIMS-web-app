const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require('body-parser');
const https = require('https')
const http = require('http')
const fs = require('fs');

const PORT_HTTP = 9103;
const PORT_HTTPS = 9443;

const baseURL = "/interoperability/api";

const options = {
	key: fs.readFileSync('api/tls_certs/client-key.pem'),
	cert: fs.readFileSync('api/tls_certs/client-cert.pem')
};

http.createServer(app).listen(PORT_HTTP)
console.log(`Listening on port ${PORT_HTTP} for http`);

https.createServer(options, app).listen(PORT_HTTPS)
console.log(`Listening on port ${PORT_HTTPS} for https`);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get(baseURL, (req, res) => {
	res.sendFile(path.join(__dirname + "/index.html"));
});

const adminRouter = require("./routes/adminRouter");
const passesPerStation = require("./routes/passesPerStationRouter");
const passesAnalysis = require("./routes/passesAnalysisRouter");
const passesCost = require("./routes/passesCostRouter");
const chargesBy = require("./routes/chargesByRouter");
const settlement = require("./routes/frontend/settlementRouter");
const passes = require("./routes/frontend/passesRouter");

app.use(baseURL + "/admin", adminRouter);
app.use(baseURL + "/PassesPerStation", passesPerStation);
app.use(baseURL + "/PassesAnalysis", passesAnalysis);
app.use(baseURL + "/PassesCost", passesCost);
app.use(baseURL + "/ChargesBy", chargesBy);
app.use(baseURL + "/Settlement", settlement);
app.use(baseURL + "/Passes", passes);