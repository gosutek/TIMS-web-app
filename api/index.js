const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');


const PORT = 9103;
const baseURL = '/interoperability/api';

app.use(cors())


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get(baseURL , (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const adminRouter = require("./routes/adminRouter");
const passesPerStation = require("./routes/passesPerStationRouter");
const passesAnalysis = require("./routes/passesAnalysisRouter");
const passesCost = require("./routes/passesCostRouter");
const chargesBy = require("./routes/chargesByRouter");

app.use(baseURL + '/admin', adminRouter);
app.use(baseURL + '/PassesPerStation', passesPerStation);
app.use(baseURL + '/PassesAnalysis', passesAnalysis);
app.use(baseURL + '/PassesCost', passesCost);
app.use(baseURL + '/ChargesBy', chargesBy);