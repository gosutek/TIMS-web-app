class SameOperator extends Error {
	constructor(msg) {
		super(msg);
		this.body = {
			json: {
				Error: msg,
				ErrorType: "BAD REQUEST",
				Code: "400",
				Info: "op1_ID cannot be the same as op2_ID"
			},
			code: 400
		};
	}
}

module.exports = SameOperator;
