const {sendServerError} = require("../../helper/sendServerError");


function findCustomer({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	const {vorname, name, wohnort, straße} = req.query;
	collection = "stammdaten";
    let query = {};
    const orConditions = [];


    if (name) {
        orConditions.push({
            name: {
                $regex: name,
                $options: "i",
            },
        });
    }

    if (vorname) {
        orConditions.push({
            vorname: {
                $regex: vorname,
                $options: "i",
            },
        });
    }

    if (wohnort) {
        orConditions.push({
            wohnort: {
                $regex: wohnort,
                $options: "i",
            },
        });
    }

    if (straße) {
        orConditions.push({
            straße: {
                $regex: straße,
                $options: "i",
            },
        });
    }

	if(orConditions.length > 0){
		query = {$or: orConditions};
	}

	query.userId = req.user.userId;

	try{
		const customer = await store.getDocuments({query, collection});

		return res.status(200).json({success: true, customer, errors: []});
	}
	catch(error){
		return sendServerError({res});
	}
};


module.exports = {findCustomer};
