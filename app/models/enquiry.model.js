let mongoose = require("mongoose");

let userEnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

let userEnquiryModel = mongoose.model("userEnquiry", userEnquirySchema); // Create a model for the schema // userEnquiryModel is the name of the model, and userEnquirySchema (fields) is the schema it uses
// The model name is used to create the collection in the database, and it will be pluralized (e.g., "userEnquiries"). // userEnquiries is the name of the collection (table_name) in the database. // The model is used to interact with the collection in the database, such as creating, reading, updating, and deleting documents.

module.exports = userEnquiryModel;
