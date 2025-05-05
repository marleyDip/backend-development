let express = require("express");
require("dotenv").config(); // Load environment variables from .env file

let app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/student-read", (req, res) => {
  res.send("Hello from student-read API, route!");
});

app.post("/student-insert", (req, res) => {
  res.send("Student Insert API!");
});

app.listen(process.env.PORT || 5000);
