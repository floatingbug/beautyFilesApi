function getSkinProperties({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	const customerId = req.query.customerId;
	const userId = req.user.userId;


	try{
		const hauteigenschaften = await store.getDocuments({
			query: {
				customerId,
				userId,
			},
			collection: "hauteigenschaften",
		});

		if(hauteigenschaften.length === 0){
			return res.status(400).json({success: false, errors: [{message: "Noch keine Hauteigenschaften hinterlegt."}]});
		}

		res.status(200).json({success: true, hauteigenschaften, errors: []});
	}
	catch(error){
		return sendServerError({res});
	}
}


module.exports = {getSkinProperties};
