const {sendServerError} = require("../../helper/sendServerError");


function createCustomer({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;

	try {
		const documents = req.body;
	}
	catch(error) {
		console.log(error);
		return sendServerError({res});
	}
}


module.exports = {createCustomer};
