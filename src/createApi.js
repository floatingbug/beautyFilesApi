const express = require("express");
const api = express();
const jwt = require("jsonwebtoken");
const {validateUser} = require("./middleware/validateUser");
const {getCustomer} = require("./routes/getCustomer/getCustomer");
const {createCustomer} = require("./routes/createCustomer/createCustomer");
const {validateCreateCustomer} = require("./routes/createCustomer/middleware/validateCreateCustomer.js");
const {signUp} = require("./routes/signUp/signUp");
const {validateSignUp} = require("./routes/signUp/middleware/validateSignUp");
const {signIn} = require("./routes/signIn/signIn");
const {validateSignIn} = require("./routes/signIn/middleware/validateSignIn");


function createApi({store}){
	api.use(express.json());


	api.get("/get-customer", validateUser({jwt}), getCustomer({store}));

	api.post("/sign-up", validateSignUp, signUp({store}));
	api.post("/sign-in", validateSignIn, signIn({store, jwt}));
	api.post("/create-customer", validateUser({jwt}), validateCreateCustomer, createCustomer({store}));

	return api;
}


module.exports = {createApi};
