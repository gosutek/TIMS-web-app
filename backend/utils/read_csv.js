const csv = require("csv-parser");
const fs = require("fs");

function readCSV(csvFilename) {
	return new Promise(function (resolve, reject) {

        const results = [];

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
