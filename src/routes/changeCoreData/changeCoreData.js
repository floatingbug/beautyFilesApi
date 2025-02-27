const {sendServerError} = require("../../helper/sendServerError");
const {setUpdateDocument} = require("./helper/setUpdateDocument");


function changeCoreData({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	const collection = "stammdaten";
	const filter = {customerId: req.body.customerId};


	const updateDocument = setUpdateDocument({changes: req.body.changes});

	try{
		const result = await store.updateDocument({filter, updateDocument, collection});

		return res.status(200).json({success: true, errors: []});
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}
}


module.exports = {changeCoreData};
