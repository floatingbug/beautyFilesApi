const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("beautyFiles");


const store = {
	db,
	insertDocuments,
	getDocuments,
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


module.exports = {createStore};
