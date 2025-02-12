function getCustomer({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	}
}


async function handleRequest(param){
	const {req, res, store} = param;
}


module.exports = {getCustomer};
