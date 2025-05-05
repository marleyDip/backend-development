let express = require("express");
const { dbConnection } = require("./dbConnection");
const { ObjectId } = require("mongodb");

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
      status: "fail",
      message: "A student with this email already exists.",
    });
  }

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

app.delete("/student-delete/:id", async (req, res) => {
  let { id } = req.params;

  let myDB = await dbConnection();
  let studentCollection = myDB.collection("students");
  let delRes = await studentCollection.deleteOne({ _id: new ObjectId(id) }); // Delete the document with the specified ID

  //console.log(delRes); // Log the result of the delete operation to the console

  let resObj = {
    status: 1,
    message: "Student deleted successfully",
    delete: delRes,
  };

  res.send(resObj);

  //let paramsData = req.params; // Get the request parameters
  //console.log(paramsData); // Log the parameters to the console
});

app.put("/student-update/:id", async (req, res) => {
  let { id } = req.params;
  let { sName, sEmail } = req.body; // Destructure the request body to get sName and sEmail
  //let obj = { sName, sEmail }; // Create an object with the destructured values

  let obj = {};
  if (sName !== "" && sName !== undefined && sName !== null) {
    obj["sName"] = sName; // Add sName to the object if it's not empty or undefined
  }

  if (sEmail !== "" && sEmail !== undefined && sEmail !== null) {
    obj["sEmail"] = sEmail; // Add sName to the object if it's not empty or undefined
  }

  console.log(obj);

  let myDB = await dbConnection();
  let studentCollection = myDB.collection("students");
  let updateRes = await studentCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: obj } // Update the document with the specified ID using the $set operator
  );

  let resObj = {
    status: 1,
    message: "Student Updated successfully",
    updateData: updateRes,
  };

  res.send(resObj);

  //let paramsData = req.params; // Get the request parameters
  //console.log(paramsData); // Log the parameters to the console
});

app.listen(process.env.PORT || 5000);
