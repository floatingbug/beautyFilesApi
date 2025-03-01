function setUpdateDocument(changes){
const updateDocument = {                    
        $set: {}
    };

    Object.keys(changes).forEach(category => {
        Object.keys(changes[category]).forEach(field => {
            updateDocument.$set[`selfApplications.${category}.${field}`] = changes[category][field];
        });
    });

    console.log(updateDocument);                
    return updateDocument;}

module.exports = {setUpdateDocument};
