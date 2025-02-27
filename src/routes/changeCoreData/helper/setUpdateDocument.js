function setUpdateDocument({changes}){
	const updateDocument = {
		$set: {},
	};


	if(changes.vorname) updateDocument.$set.vorname = changes.vorname; 
	if(changes.name) updateDocument.$set.name = changes.name; 
	if(changes.straße) updateDocument.$set.straße = changes.straße; 
	if(changes.hausnummer) updateDocument.$set.hausnummer = changes.hausnummer; 
	if(changes.wohnort) updateDocument.$set.wohnort = changes.wohnort; 
	if(changes.telefon) updateDocument.$set.telefon = changes.telefon; 
	if(changes.geburtsdatum) updateDocument.$set.geburtsdatum = changes.geburtsdatum; 
	if(changes.kundengruppe) updateDocument.$set.kundengruppe= changes.kundengruppe; 

	return updateDocument;
}


module.exports = {setUpdateDocument};
