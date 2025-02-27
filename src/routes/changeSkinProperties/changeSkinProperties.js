const {sendServerError} = require("../../helper/sendServerError");
const {setUpdateDocument} = require("./helper/setUpdateDocument");


function changeSkinProperties({store}){
	return (req, res) => {
		handleRequest({req, res, store})
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	const filter = {
		customerId: req.body.customerId,
	};
	console.log(req.body.changes);
	const updateDocument = setUpdateDocument({changes: req.body.changes});


	try{
		const result = await store.updateDocument({filter, updateDocument, collection: "hauteigenschaften"});

		res.status(200).json({success: true, errors: []});
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}
}


module.exports = {changeSkinProperties};
