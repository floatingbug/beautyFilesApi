const {sendServerError} = require("../../helper/sendServerError");
const {randomUUID} = require("crypto");


function addProtocol({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	const collection = "protokoll";
	const filter = {
		customerId: req.body.customerId,
		userId: req.user.userId,
	};
	const updateDocument = {
		$push: {
			protocols: {
				protocolId: randomUUID(),
				...req.body.protocol,
			}
		}
	};


	try{
		const result = await store.updateDocument({filter, updateDocument, collection});

		res.status(200).json({success: true, errors: []});
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}
};


module.exports = {addProtocol};
