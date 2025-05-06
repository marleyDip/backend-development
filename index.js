let express = require("express");
var mongoose = require("mongoose");

const enquiryRoutes = require("./app/routes/web/enquiryRoutes");

require("dotenv").config(); // Load environment variables from .env file

let app = express();
app.use(express.json());

app.use("/web/api/enquiry", enquiryRoutes);

// connect to MongoDB using mongoose
mongoose.connect(process.env.DBURL).then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
  });
});
