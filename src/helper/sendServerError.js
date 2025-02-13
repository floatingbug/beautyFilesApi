function sendServerError({res}){
	res.status(500).json({success: false, errors: [{message: "Internal Server Error."}]});
}


module.exports = {sendServerError}
