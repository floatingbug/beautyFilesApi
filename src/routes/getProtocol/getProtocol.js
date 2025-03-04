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
		const fetchedEntries= await store.getDocuments({query, collection});
		const entries = fetchedEntries[0].entries;


		res.status(200).json({success: true, entries, errors: []});
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}
}


module.exports = {getProtocol};
