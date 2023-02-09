require("dotenv").config();
const express = require("express");
var path = require('path');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors({origin:"*"}));
app.use(express.json());
app.use(bodyParser({ extended: true }));
app.use(express.urlencoded({ extended: false }));
const http = require("http");
app.use(express.static(path.join(__dirname, 'public')));
app.use("/logs",express.static(path.join(__dirname, 'logs')));
const ResponseMiddleware = require("./middlewares/response.middleware");
const server = http.createServer(app);
const { useRoutes } = require("./routes");
app.use(ResponseMiddleware);
useRoutes(app);

const port = process.env.PORT || 3000;
server.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})