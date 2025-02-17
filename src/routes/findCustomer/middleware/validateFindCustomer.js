function validateFindCustomer(req, res, next){
	let {vorname, name, wohnort, straße} = req.query;
	const errors = [];

	if(vorname && typeof name !== "string"){
		errors.push({field: "vorname", message: "Vorname muss vom Typ String sein."});
	}
	else if(vorname && vorname.length > 50){
		errors.push({field: "vorname", message: "Vorname darf nicht mehr als 50 Zeichen enthalten."});
	}

	if(errors.length > 0) {
		return res.status(400).json({success: false, errors});
	}

	next();
}


module.exports = {validateFindCustomer};
