function setUpdateDocument({changes}){
	const updateDocument = {
		$set: {},
	};

		console.log(changes);

	if(changes.sebumgehalt){ 
		updateDocument.$set["sebumgehalt.currValue"] = changes.sebumgehalt;
	}
	
	if(changes.feuchtigkeitsgehalt){
		updateDocument.$set["feuchtigkeitsgehalt.currValue"] = changes.feuchtigkeitsgehalt; 
	}

	if(changes.porigkeit){
		updateDocument.$set["porigkeit.currValue"] = changes.porigkeit;
	}

	if(changes.dickeDerEpidermis){
		updateDocument.$set["dickeDerEpidermis.currValue"] = changes.dickeDerEpidermis;
	}

	if(changes.durchblutung){
		updateDocument.$set["durchblutung.currValue"] = changes.durchblutung; 
	}

	if(changes.empfindlichkeit){
		updateDocument.$set["empfindlichkeit.currValue"] = changes.empfindlichkeit;
	}

	if(changes.sonstiges){
		updateDocument.$set["sonstiges"] = changes.sonstiges;
	}

	if(changes.allergien){
		updateDocument.$set["allergien"] = changes.allergien;
	}

	if(changes.unverträglichkeiten){
		updateDocument.$set["unverträglichkeiten"] = changes.unverträglichkeiten;
	}

	if(changes.tonusUndTurgor){
		updateDocument.$set["tonusUndTurgor"] = changes.tonusUndTurgor;
	}

	if(changes.besondereErscheinung){
		updateDocument.$set["besondereErscheinung.currValue"] = changes.besondereErscheinung;
	}

	return updateDocument;
}


module.exports = {setUpdateDocument};
