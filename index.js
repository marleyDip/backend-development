let express = require("express");
const { dbConnection } = require("./dbConnection");

require("dotenv").config(); // Load environment variables from .env file

let app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/student-read", async (req, res) => {
  let myDB = await dbConnection();
  let studentCollection = myDB.collection("students");

  let data = await studentCollection.find().toArray(); // Find all documents in the collection

  let resObj = {
    status: "success",
    message: "Student List",
    result: data,
  };

  res.send(resObj); // Send the response object back to the client

  res.send("Hello from student-read API, route!");
});

app.post("/student-insert", async (req, res) => {
  let myDB = await dbConnection(); // Await the database connection
  let studentCollection = myDB.collection("students"); // Specify the collection to use

  /* let obj = {
    sName: req.body.sName,
    sEmail: req.body.sEmail,
  }; */

  let { sName, sEmail } = req.body; // Destructure the request body to get sName and sEmail
  let obj = { sName, sEmail }; // Create an object with the destructured values

  // Check if a student with the same email already exists
  let existingStudent = await studentCollection.findOne({ sEmail });

  //console.log(existingStudent); // Log the existing student to the console

  if (existingStudent) {
    return res.status(400).send({
      status: "error",
      message: "Student with this email already exists",
    }); // If the student exists, send an error response
  }
  // If the student does not exist, proceed with the insertion
  //console.log(req.body); // Log the request body to the console
  //console.log(sName); // Log the sName to the console
  //console.log(sEmail); // Log the sEmail to the console

  //console.log(obj); // Log the object to the console

  let insertRes = await studentCollection.insertOne(obj); // Insert the object into the collection
  let resObj = {
    status: "success",
    message: "Student inserted successfully",
    data: insertRes, // Include the result of the insert operation in the response
  };

  res.status(201).send(resObj); // Send the response object back to the client

  //res.send("Student Insert API!");
});

app.listen(process.env.PORT || 5000);
