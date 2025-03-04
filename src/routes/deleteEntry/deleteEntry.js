const {sendServerError} = require("../../helper/sendServerError");


function deleteEntry({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	const collection = "protokoll";
	const filter = {
		userId: req.user.userId,
	};
	const updateDocument = {
		$pull: {
			entries: {
				entryId: req.body.entryId,
			},
		},
	};


	try{
		const result = await store.updateDocument({filter, updateDocument, collection});

		res.status(200).json({success: true, errors: []});
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}
}


module.exports = {deleteEntry};
