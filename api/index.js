const express = require("express");
const app = express();
const path = require('path');


const PORT = 9103;


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const admin = require("./routes/admin");

app.use('/admin', admin);


