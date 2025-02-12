const {sendServerError} = require("../../helper/sendServerError");


function signIn({store, jwt}){
	return (req, res) => {
		handleRequest({req, res, store, jwt});
	};
}


async function handleRequest(param){
	const {req, res, store, jwt} = param;
	const {usernameOrEmail, password} = req.body;
	let user = null;

	try{
		user = await store.getDocuments({
			query: {
				$or: [
					{
						username: usernameOrEmail,
						password
					},
					{
						email: usernameOrEmail,
						password
					}
				]
			},
			collection: "users"
		});

		if(!user || user.length === 0){
			return res.status(400).json({success: false, errors: [{message: "Username/E-Mail or Password is incorrect."}]});
		}

		user = user[0];
	}
	catch(error){
		return sendServerError({res});
	}

	jwt.sign(user, process.env.JWT_SECRET, (error, token) => {
		if(error) return sendServerError({res});

		res.status(200).json({success: true, token});
	});
}


module.exports = {signIn};
