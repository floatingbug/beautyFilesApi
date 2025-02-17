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

	api.post("/sign-up", validateSignUp, signUp({store}));
	api.post("/sign-in", validateSignIn, signIn({store, jwt}));
	api.post("/create-customer", validateUser({jwt}), validateCreateCustomer, createCustomer({store}));

	return api;
}


module.exports = {createApi};
