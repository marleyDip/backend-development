let express = require("express");

let app = express();
app.use(express.json()); // Middleware to parse JSON bodies

let myToken = "12345"; // Example token for validation

let myPass = "12345"; // Example token for validation

let checkToken = (req, res, next) => {
  console.log(req.query.token); // Log the token from the query string
  if (req.query.token === "" || req.query.token === undefined) {
    return res.send({
      status: 0,
      msg: "Token is required",
    });
  }

  if (req.query.token != myToken) {
    return res.send({
      status: 0,
      msg: "Token is invalid",
    });
  }

  next();
}; // Middleware function to check token

/* let checkToken = (req, res, next) => {
  console.log("Middleware: Checking token...");
  next(); // Call next() to pass control to the next middleware or route handler
  // You can add your token validation logic here
}; */

app.use(checkToken); // Use the middleware for all routes

app.use((req, res, next) => {
  if (req.query.pass === "" || req.query.pass === undefined) {
    return res.send({
      status: 0,
      msg: "Pass is required",
    });
  }

  if (req.query.pass != myPass) {
    return res.send({
      status: 0,
      msg: "Pass is invalid",
    });
  }

  next();
}); // Middleware to log request details

app.get("/", (req, res) => {
  res.send({ status: 1, msg: "Home Page API" });
});

app.get("/news", (req, res) => {
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

app.listen("8000");
