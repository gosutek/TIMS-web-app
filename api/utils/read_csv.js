const csv = require("csv-parser");
const fs = require("fs");
const results = [];

function readCSV(csvFilename) {
	return new Promise(function (resolve, reject) {

		fs.createReadStream(csvFilename)
			.pipe(csv({ separator: ";" }))
			.on('data', (data) => results.push(data))
			.on('end', () => {
				resolve(results)
            })
            .on('error', reject)
		});
	}

module.exports = readCSV;
