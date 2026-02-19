const express = require("express");
const mongoose = require("mongoose"); 

// Initialize express
const app = express();
app.use(express.json());


const connectionURL = "mongodb://localhost:27017/schoolDB";

mongoose.connect(connectionURL).then(() => console.log("Database connection successful")).catch((error) => console.log(error));


// Blueprint for your data in a MongoDB database
// Collection and documents
const studentSchema = mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    dept: String
});

// Model is a class that allows you to interact with a specific MongoDB collection. It is created by taking your Schema and "compiling" it into a useable tool.
const Student = mongoose.model("student", studentSchema);


// Add Students
app.post("/students/single", async(req, res) => {
    try {
        // 
        const {name, email, age, dept, address} = req.body;
        const newStudent = new Student({
            name,
            email,
            age,
            dept,
            address
        });

        await newStudent.save();
        res.status(201).json({message: "Student added successfully", student:newStudent})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
// * Add multiple documents
app.post("/students/many", async(req, res) => {
    try {
        
        // 
        const studentsData = req.body;

        const newStudents = await Student.insertMany(studentsData);
        res.status(201).json({
            message: "Students added successfully",
             count: newStudents.length,
             students: newStudents
            })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


// create express server.
app.listen(9484, () => {
    console.log("Server is running on port : 9484");
});

