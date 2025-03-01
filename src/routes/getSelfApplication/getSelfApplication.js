const {sendServerError} = require("../../helper/sendServerError");


function getSelfApplication({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	const customerId = req.query.customerId;

	try{
		const fetchedSelfApplications = await store.getDocuments({
			query: {
				customerId,
			},
			collection: "eigenanwendung",
		});

		const selfApplications = fetchedSelfApplications[0].selfApplications;

		res.status(200).json({success: true, selfApplications, errors: []});
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}
}


module.exports = {getSelfApplication};
