require("dotenv").config();

//FrameWork
const express = require("express");
const mongoose = require("mongoose");

//Initilizing microservices routes
const Books = require("./API/Book");
const Authors = require(".API/Author");
const Publications = require("./API/Publication");

//Initializing express
const shapeAI = express();

//Configurations 
shapeAI.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log("Connection established!!!!!"));

// Initilazing Microservices
shapeAI.use("/book",Books);
shapeAI.use("/author",Authors);
shapeAI.use("/publication",Publications);

shapeAI.listen(3000, () => console.log("The server is running"));

