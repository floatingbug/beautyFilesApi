function validateSignIn(req, res, next){
	const {usernameOrEmail, password} = req.body;
	const errors = [];

	if(!usernameOrEmail || typeof usernameOrEmail !== "string"){
		errors.push({
			field: "Username/E-Mail", 
			message: "Username/E-Mail is required."
		});
	}
	if(!password || typeof password !== "string"){
		errors.push({
			field: "Password", 
			message: "Password is required."
		});
	}

    if (errors.length > 0) {
        return res.status(400).json({success: false, errors});
    }

    next();
}


module.exports = {validateSignIn};
