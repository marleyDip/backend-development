let express = require("express");

let app = express();
app.use(express.json()); // Middleware to parse JSON bodies

let checkToken = (req, res, next) => {
  console.log("Middleware: Checking token...");
  next(); // Call next() to pass control to the next middleware or route handler
  // You can add your token validation logic here
};

app.use(checkToken); // Use the middleware for all routes

app.get("/", (req, res) => {
  res.send({ status: 1, msg: "Home Page API" });
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

app.listen("8000");
