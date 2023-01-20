const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const routes = require("./routes/userRoutes");
const error = require("./middleware/error");
require("./server");

dotenv.config( { path: "./.env"});

const app = express();
app.use(express.static("public"));
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 5000;

app.use("/", routes);
app.use(error);

app.listen(port, ()=>{
    console.log(`The server is running on ${port}`);
});