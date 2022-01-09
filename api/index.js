const express = require("express");
const app = express();
const path = require('path');


const PORT = 9103;
const baseURL = '/interoperability/api';


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get(baseURL , (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const adminRouter = require("./routes/adminRouter");
const passesPerStation = require("./routes/passesPerStationRouter");
const passesAnalysis = require("./routes/passesAnalysisRouter");

app.use(path.join(baseURL, '/admin'), adminRouter);
app.use(path.join(baseURL, '/PassesPerStation'), passesPerStation);
app.use(path.join(baseURL, '/PassesAnalysis'), passesAnalysis);