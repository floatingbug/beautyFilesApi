const {sendServerError} = require("../../helper/sendServerError");
const {setUpdateDocument} = require("./helpers/setUpdateDocument");


function changeSelfApplication({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	

	const updateDocument = setUpdateDocument(req.body.changes);


	try{
		const result = await store.updateDocument({
			filter: {
				customerId: req.body.customerId,
				userId: req.user.userId,
			},
			updateDocument,
			collection: "eigenanwendung",
		});

		res.status(200).json({success: true, errors: []});
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}
}


module.exports = {changeSelfApplication};
