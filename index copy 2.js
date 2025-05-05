let express = require("express");
const { checkToken } = require("./Middleware/checkTokenMiddleware");
const { checkPass } = require("./Middleware/checkPassMiddleware");

require("dotenv").config(); // Load environment variables from .env file

let app = express();

//console.log(process.env.MyToken); // Access the environment variable

app.use(express.json()); // Middleware to parse JSON bodies

//app.use(checkToken); // Use the middleware for all routes

app.get("/", checkPass, (req, res) => {
  res.send({ status: 1, msg: "Home Page API" });
});

app.get("/news", checkToken, (req, res) => {
  res.send({ status: 1, msg: "News Page API" });
});

app.get("/news/:id", (req, res) => {
  let currentId = req.params.id; // Access the URL parameter
  res.send("News Details API" + currentId); // This will output the ID from the URL
});

app.get("/products", (req, res) => {
  console.log(req);
  res.send({ status: 1, msg: "Products Page API" });
});

app.post("/login", (req, res) => {
  console.log(req.body); // Access the request body. mainly used for POST requests. object is passed in the body.

  res.status(200).json({
    status: 1,
    msg: "Login API",
    bodyData: req.body,
    queryData: req.query,
  });

  /* res.send({
    status: 1,
    msg: "Login API",
    bodyData: req.body,
    queryData: req.query,
  }); */
});

app.listen(process.env.PORT || 5000);
