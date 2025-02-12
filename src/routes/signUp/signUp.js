const {sendServerError} = require("../../helper/sendServerError");
const {randomUUID} = require("crypto");


function signUp({store}){
	return (req, res) => {
		handleRequest({req, res, store});
	};
}


async function handleRequest(param){
	const {req, res, store} = param;
	const {username, email, password} = req.body;

	//check if user is in db already
	try{
		const user = await store.getDocuments({
			query: {
				$or: [
					{username},
					{email}
				]
			},
			collection: "users"
		});

		if(user.length > 0){
			return res.status(400).json({success: false, errors: [{message: "User already exists."}]});
		}
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}

	//add user to db
	try{
		await store.insertDocuments({
			documents: [{
				username, 
				email, 
				password,
				userId: randomUUID(),
				emailVerifyCode: randomUUID(),
				isEmailVerified: false,
			}],
			collection: "users"
		});
	}
	catch(error){
		console.log(error);
		return sendServerError({res});
	}

	res.status(200).json({success: true, message: "Sign up was successfully."});
}


module.exports = {signUp};
