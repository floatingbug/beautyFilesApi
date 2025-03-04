const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("beautyFiles");


const store = {
	db,
	insertDocuments,
	getDocuments,
	updateDocument,
	deleteDocument,
};


function createStore(){
	return store;
}


async function insertDocuments(param){
	const {documents, collection} = param;
	const coll = this.db.collection(collection);
	
	try{
		await coll.insertMany(documents);
	}
	catch(error){
		throw error;
	}
}


async function getDocuments(param){
	const {query, collection, skip, limit} = param;
	const coll = this.db.collection(collection);

	
	try{
		let result = coll.find(query);
		
		if(skip) result = result.skip(skip);
		if(limit) result = result.limit(limit);

		const documents = await result.toArray();

		return documents;
	}
	catch(error){
		throw error;
	}

}


async function updateDocument(param){
	const {filter, updateDocument, collection} = param;
	const coll = this.db.collection(collection);


	try{
		const result = await coll.updateOne(filter, updateDocument);

		return result;
	}
	catch(error){
		throw error;
	}
}


async function deleteDocument(param){
	const {collection, document} = param;
	const coll = this.db.collection(collection);


	try{
		const result = await coll.deleteOne(document);

		return result;
	}
	catch(error){
		throw error;
	}
}


module.exports = {createStore};
