const {sendServerError} = require("../../helper/sendServerError");


function getProtocol({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	const collection = "protokoll";
	const customerId = req.query.customerId;
	const query = {
		customerId,
		userId: req.user.userId,
	};


	try{
		const fetchedProtocol = await store.getDocuments({query, collection});
		const protocol = fetchedProtocol[0].protocols;

		console.log(protocol);

		res.status(200).json({success: true, protocol, errors: []});
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}
}


module.exports = {getProtocol};
