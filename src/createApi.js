const express = require("express");
const api = express();
const jwt = require("jsonwebtoken");
const {getCustomer} = require("./routes/getCustomer/getCustomer");
const {createCustomer} = require("./routes/createCustomer/createCustomer");
const {signUp} = require("./routes/signUp/signUp");
const {validateSignUp} = require("./routes/signUp/middleware/validateSignUp");
const {signIn} = require("./routes/signIn/signIn");
const {validateSignIn} = require("./routes/signIn/middleware/validateSignIn");


function createApi({store}){
	api.use(express.json());


	api.get("/get-customer", getCustomer({store}));

	api.post("/create-customer", createCustomer({store}));
	api.post("/sign-up", validateSignUp, signUp({store}));
	api.post("/sign-in", validateSignIn, signIn({store, jwt}));

	return api;
}


module.exports = {createApi};
