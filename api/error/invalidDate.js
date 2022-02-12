class InvalidDate extends Error {
	constructor(msg) {
		super(msg);
		this.body = {
			json: {
				Error: msg,
				ErrorType: "BAD REQUEST",
				Code: "400",
				Info: "Date must be of format YYYYMMDD"
			},
			code: 400
		};
	}
}

module.exports = InvalidDate;
