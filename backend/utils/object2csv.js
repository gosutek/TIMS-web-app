function object2csv(json) {
	let jsonFields = Object.keys(json[0])
	let nullReplacer = function(key, value) { return value === null ? '' : value }

	let csv = json.map(function(row){
		return jsonFields.map( function(fieldName){
			let csvRow = JSON.stringify(row[fieldName], nullReplacer)
			csvRow = csvRow.replaceAll('\"','')
			return csvRow
		}).join(',')
	})

	csv.unshift(jsonFields.join(','))
	csv = csv.join('\r\n');

	return csv;
}

module.exports = object2csv;
