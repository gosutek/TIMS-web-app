class MissingParams {
	constructor(route) {
        let info = "Unrecognized route"
        switch(route) {
            case "chargesBy":
                info = "ChargesBy usage => /:op_ID/:date_from/:date_to"
                break
            case "passesAnalysis":
                info = "passesAnalysis usage => /:op1_ID/:op2_ID/:date_from/:date_to"
                break
            case "passesCost":
                info = "passesCost usage => /:op1_ID/:op2_ID/:date_from/:date_to"
                break
            case "passesPerStation":
                info = "passesPerStation usage => /:stationID/:date_from/:date_to"
                break
        }
		this.body = {
			json: {
				Error: "Missing Parameters",
				ErrorType: "BAD REQUEST",
				Code: "400",
				Info: info
			},
			code: 400
		}
	}
}

module.exports = MissingParams;
