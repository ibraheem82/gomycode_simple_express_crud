const express = require("express");
const mongoose = require("mongoose"); 

// Initialize express
const app = express();



const connectionURL = "mongodb://localhost:27017/schoolDB";

mongoose.connect(connectionURL).then(() => console.log("Database connection successfull")).catch((error) => console.log(error));




// create express server.
app.listen(9484, () => {
    console.log("Server is running on port : 9484");
});