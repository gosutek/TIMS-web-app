const csvParse = require("csv-parser");

const path = require("path");
const fs = require("fs");

function readCSV(relativeFilePath) {
	return new Promise(function (resolve, reject) {

		const csv = require("csv-parser");
		const fs = require("fs");
		const results = [];

		fs.createReadStream("./data/sampledata01_stations.csv")
			.pipe(csv({ separator: ";" }))
			.on('data', (data) => results.push(data))
			.on('end', () => {
				resolve(results)
            })
            .on('error', reject)
		});
	}

module.exports = readCSV;
