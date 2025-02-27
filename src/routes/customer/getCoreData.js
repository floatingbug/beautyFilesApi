const {sendServerError} = require("../../helper/sendServerError");


function getCoreData({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	}
}


async function handleRequest(param){
	const {req, res, store} = param;
	const {start, count, customerId, name, vorname, wohnort, geburtsdatum} = req.query;
	const MAX_RESULTS = 20;
	let query = {
		userId: req.user.userId,
	};


	//set query for db request
	if(customerId) query.customerId = customerId;
	if(name) query.name = {$regex: name, $options: "i"};
	if(vorname) query.vorname = {$regex: vorname, $options: "i"};
	if(wohnort) query.wohnort = wohnort;
	if(geburtsdatum) query.geburtsdatum = geburtsdatum;

	//set skip and limi
	const skip = parseInt(start, 10) || 0;
	let limit = parseInt(count, 10);
	if(limit > MAX_RESULTS) limit = MAX_RESULTS;

	//get customers
	try{
		const coreData = await store.getDocuments({
			query,
			collection: "stammdaten",
			skip,
			limit,
		});

		res.status(200).json({
			success: true,
			coreData,
			errors: []
		});
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}

}


module.exports = {getCoreData};
