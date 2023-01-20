const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env"}); 

const db = process.env.MONGO_DB; 

mongoose.set('strictQuery', false);
mongoose.connect(db)
    .then(()=>{
        console.log("connected to mongodb...");
    })
    .catch(err=>{
        console.log(err);
    });







