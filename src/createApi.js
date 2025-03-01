const express = require("express");
const api = express();
const jwt = require("jsonwebtoken");
const {validateUser} = require("./middleware/validateUser");
const {getCoreData} = require("./routes/customer/getCoreData");
const {validateGetCoreData} = require("./routes/customer/middleware/validateGetCoreData");
const {createCustomer} = require("./routes/createCustomer/createCustomer");
const {validateCreateCustomer} = require("./routes/createCustomer/middleware/validateCreateCustomer.js");
const {signUp} = require("./routes/signUp/signUp");
const {validateSignUp} = require("./routes/signUp/middleware/validateSignUp");
const {signIn} = require("./routes/signIn/signIn");
const {validateSignIn} = require("./routes/signIn/middleware/validateSignIn");
const {findCustomer} = require("./routes/findCustomer/findCustomer");
const {validateFindCustomer} = require("./routes/findCustomer/middleware/validateFindCustomer");
const {changeCoreData} = require("./routes/changeCoreData/changeCoreData");
const {getSkinProperties} = require("./routes/getSkinProperties/getSkinProperties");
const {changeSkinProperties} = require("./routes/changeSkinProperties/changeSkinProperties");
const {getSelfApplication} = require("./routes/getSelfApplication/getSelfApplication");
const {changeSelfApplication} = require("./routes/changeSelfApplication/changeSelfApplication");
const {getProtocol} = require("./routes/getProtocol/getProtocol");
const {addProtocol} = require("./routes/addProtocol/addProtocol");
const cors = require("cors");


function createApi({store}){
	api.use(express.json());
	api.use(cors({
		origin: "*",
		allowedHeaders: ["Content-Type", "Authorization"],
		exposedHeaders: ["Authorization"],
	}));


	api.get("/get-core-data", validateUser({jwt}), validateGetCoreData, getCoreData({store}));
	api.get("/find-customer", validateUser({jwt}), validateFindCustomer, findCustomer({store}));
	api.get("/get-skin-properties", validateUser({jwt}), getSkinProperties({store}));
	api.get("/get-self-application", validateUser({jwt}), getSelfApplication({store}));
	api.get("/get-protocol", validateUser({jwt}), getProtocol({store}));

	api.post("/sign-up", validateSignUp, signUp({store}));
	api.post("/sign-in", validateSignIn, signIn({store, jwt}));
	api.post("/create-customer", validateUser({jwt}), validateCreateCustomer, createCustomer({store}));
	api.post("/update-core-data", changeCoreData({store}));
	api.post("/update-skin-properties", validateUser({jwt}), changeSkinProperties({store}));
	api.post("/update-self-application", validateUser({jwt}), changeSelfApplication({store}));
	api.post("/add-protocol", validateUser({jwt}), addProtocol({store}));

	return api;
}


module.exports = {createApi};
