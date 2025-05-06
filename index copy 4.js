let express = require("express");
var mongoose = require("mongoose"); // Import mongoose for MongoDB object modeling
const userEnquiryModel = require("./app/models/enquiry.model");
require("dotenv").config(); // Load environment variables from .env file

let app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/api/enquiry-insert", async (req, res) => {
  let { sName, sEmail, sPhone, sMessage } = req.body; // Destructure the request body to get enquiry details
  //console.log(req.body); // Log the request body to the console
  /* console.log(
    "sName, sEmail, sPhone, sMessage:",
    sName,
    sEmail,
    sPhone,
    sMessage
  ); */ // Log the individual enquiry details to the console

  let enquiry = new userEnquiryModel({
    name: sName,
    email: sEmail,
    phone: sPhone,
    message: sMessage,
  });

  enquiry
    .save()
    .then(() => {
      res.status(201).send({
        status: "success",
        message: "Enquiry Inserted & Saved Successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: "Enquiry Not Inserted",
        error: err,
      });
    });

  //res.send("Enquiry Inserted"); // Send a response indicating the enquiry was inserted
});

app.get("/api/enquiry-list", async (req, res) => {
  // Fetch all enquiries from the database
  let enquiryList = await userEnquiryModel.find(); // Find all documents in the userEnquiry collection
  res
    .status(200)
    .json({ status: "success", message: "Enquiry List", data: enquiryList }); // data: [] => Send a response with an empty enquiry list
});

app.delete("/api/enquiry-delete/:id", async (req, res) => {
  let enquiryId = req.params.id; // Get the enquiry ID from the request parameters

  let deleteEnquiry = await userEnquiryModel.deleteOne({ _id: enquiryId });

  res.status(200).json({
    status: "success",
    message: "Enquiry Deleted Successfully",
    id: enquiryId,
    data: deleteEnquiry,
  });
});

// update enquiry
app.put("/api/enquiry-update/:id", async (req, res) => {
  let enquiryId = req.params.id;
  let { sName, sEmail, sPhone, sMessage } = req.body;
  let updateObj = {
    name: sName,
    email: sEmail,
    phone: sPhone,
    message: sMessage,
  };

  let updateEnquiry = await userEnquiryModel.updateOne(
    { _id: enquiryId },
    updateObj
  );

  res.send({
    status: "success",
    message: "Enquiry Updated Successfully",
    id: enquiryId,
    data: updateEnquiry,
  });
});

// connect to MongoDB using mongoose
mongoose.connect(process.env.DBURL).then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
  });
});
