require("dotenv").config();
const {createApi} = require("./src/createApi");
const {createStore} = require("./src//store/createStore");
const store = createStore();
const api = createApi({store});
const httpServer = require("http").createServer(api);


httpServer.listen(3000);
