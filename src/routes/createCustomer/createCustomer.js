const {randomUUID} = require("crypto");
const {sendServerError} = require("../../helper/sendServerError");
const {skinData} = require("./data/skinData");
const {selfApplicationData} = require("./data/selfApplicationData");
const {protocolData} = require("./data/protocolData");


function createCustomer({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	const customerId = randomUUID();


	//add collection stammdaten
	try {
		const documents = [
			{
				customerId,
				userId: req.user.userId,
				...req.body,
			}
		];

		await store.insertDocuments({
			documents,
			collection: "stammdaten"
		});
	}
	catch(error) {
		console.log(error);
		return sendServerError({res});
	}

	//add collection: hauteigenschaften
	try{
		const documents = [
			{
				customerId,
				userId: req.user.userId,
				...skinData,
			}
		];

		await store.insertDocuments({
			documents,
			collection: "hauteigenschaften",
		});
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}

	
	//add collection: eigenanwendung 
	try{
		const documents = [
			{
				customerId,
				userId: req.user.userId,
				...selfApplicationData,
			}
		];

		await store.insertDocuments({
			documents,
			collection: "eigenanwendung",
		});
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}

	
	//add collection: protocoll
	try{
		const documents = [
			{
				customerId,
				userId: req.user.userId,
				...protocolData,
			}
		];

		await store.insertDocuments({
			documents,
			collection: "protokoll",
		});
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}

	res.status(200).json({success: true, customerId, errors: []});
}


module.exports = {createCustomer};
