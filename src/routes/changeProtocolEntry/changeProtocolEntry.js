const {sendServerError} = require("../../helper/sendServerError");


function changeProtocolEntry({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	const collection = "protokoll";

	const filter = {
		"entries.entryId": req.body.entryId,
	};

	const updateDocument = Object.entries(req.body.changes)
		.reduce((accumulator, [key, value]) => {
			accumulator.$set[`entries.$.${key}`] = value;

			return accumulator;
		}, {$set: {}});


	try{
		const result = await store.updateDocument({collection, filter, updateDocument});

		res.status(200).json({success: true, errors: []});
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}
}


module.exports = {changeProtocolEntry};
