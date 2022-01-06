const csvParse = require("csv-parser");

const path = require("path");
const fs = require("fs");

function readCSV(csvFilename) {
	return new Promise(function (resolve, reject) {

		const csv = require("csv-parser");
		const fs = require("fs");
		const results = [];

		fs.createReadStream("./data/" + csvFilename)
			.pipe(csv({ separator: ";" }))
			.on('data', (data) => results.push(data))
			.on('end', () => {
				resolve(results)
            })
            .on('error', reject)
		});
	}

module.exports = readCSV;
