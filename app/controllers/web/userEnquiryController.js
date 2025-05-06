const userEnquiryModel = require("../../models/enquiry.model");

// insert enquiry
let enquiryInsert = (req, res) => {
  let { sName, sEmail, sPhone, sMessage } = req.body;

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
};

// get enquiry list
let enquiryList = async (req, res) => {
  let enquiryList = await userEnquiryModel.find();
  res
    .status(200)
    .json({ status: "success", message: "Enquiry List", data: enquiryList });
};

// delete enquiry
let enquiryDelete = async (req, res) => {
  let enquiryId = req.params.id;

  let deleteEnquiry = await userEnquiryModel.deleteOne({ _id: enquiryId });

  res.status(200).json({
    status: "success",
    message: "Enquiry Deleted Successfully",
    id: enquiryId,
    data: deleteEnquiry,
  });
};

// update enquiry
let enquiryUpdate = async (req, res) => {
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
};

module.exports = { enquiryInsert, enquiryList, enquiryDelete, enquiryUpdate };
