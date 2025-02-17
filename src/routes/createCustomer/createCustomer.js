const {randomUUID} = require("crypto");
const {sendServerError} = require("../../helper/sendServerError");


function createCustomer({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	const customerId = randomUUID();


	try {
		req.body.customerId = customerId;
		req.body.userId = req.user.userId;
		req.body.kundengruppe = "neukunde";
		const documents = [req.body];
		await store.insertDocuments({
			documents,
			collection: "stammdaten"
		});
	}
	catch(error) {
		console.log(error);
		return sendServerError({res});
	}

	res.status(200).json({success: true, customerId, errors: []});
}


module.exports = {createCustomer};
