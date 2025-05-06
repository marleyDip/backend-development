let express = require("express");
let enquiryRoutes = express.Router();

const {
  enquiryInsert,
  enquiryList,
  enquiryDelete,
  enquiryUpdate,
} = require("../../controllers/web/userEnquiryController");

enquiryRoutes.post("/enquiry-insert", enquiryInsert);
enquiryRoutes.get("/enquiry-list", enquiryList);
enquiryRoutes.delete("/enquiry-delete/:id", enquiryDelete);
enquiryRoutes.put("/enquiry-update/:id", enquiryUpdate);

module.exports = enquiryRoutes;
