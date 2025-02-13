function validateCreateCustomer(req, res, next) {                                                                                                  
    const {vorname, name, straße, hausnummer, wohnort, telefon, geburtsdatum} = req.body;
    const errors = [];                                                                                                                            


	//allowed fields
	const allowedFields = ["vorname", "name", "straße", "wohnort", "telefon", "geburtsdatum", "hausnummer"];

	//only 7 fields are allowed
	const keys = Object.keys(req.body);
	if (keys.length > 7) {
		errors.push({ message: "Zu viele Eigenschaften." });
	}

	//only allowed fields
	for (const name of keys) {
		if (!allowedFields.includes(name)) {
			errors.push({
				message: `Eigenschaft '${name}' ist unzulässig.`  // Mehr Details zu welchem Feld
			});
		}
	}


    validateRequiredField(vorname, "vorname", errors);
    validateRequiredField(name, "name", errors);
	validateField(straße, "straße", "string", errors, req.body);
	validateField(hausnummer, "hausnummer", "number", errors, req.body);
	validateField(wohnort, "wohnort", "string", errors, req.body);
	validateField(telefon, "telefon", "string", errors, req.body);
	validateField(geburtsdatum, "geburtsdatum", "string", errors, req.body);


    if (errors.length > 0) {                                                                                                                      
        return res.status(400).json({ success: false, errors });                                                                                    
    }                                                                                                                                             


    next();                                                                                                                                       
}                                                                                                                                                 


function validateRequiredField(value, fieldName, errors){
	if(!value){
		errors.push({ field: fieldName, message: `Das Feld ${fieldName} ist ein Pflichtfeld.` });
	} 
	else if(typeof value !== "string"){
		errors.push({field: fieldName, message: `${fieldName} muss vom Typ String sein.`});
	} 
	else{
		const trimmedValue = value.trim();
		if(trimmedValue.length < 3 || trimmedValue.length > 50){
			errors.push({ 
				field: fieldName, 
				message: `${fieldName} muss mindestens 3 Zeichen lang sein und darf maximal 50 Zeichen enthalten.` 
			});
		}
	}
}


function validateField(value, fieldName, type, errors, body){
	if(!value){
		body[fieldName] = null;
	}
	else if(typeof value !== type){
		errors.push({field: fieldName, message: `Falscher Datentyp in Feld ${fieldName}`});
	}
	else{
		if(type === "string"){
			if(value.trim().length < 3 || value.trim().length > 100){
				errors.push({ 
					field: fieldName, 
					message: `${fieldName} muss mindestens 3 Zeichen lang sein und darf maximal 50 Zeichen enthalten.` 
				});
			}
		}
		else if(type === "number"){
			if(value > 10000){
				errors.push({ 
					field: fieldName, 
					message: `${fieldName} darf nicht größer als 10000 sein.` 
				});
			}
		}
	}
}


module.exports = {validateCreateCustomer};
