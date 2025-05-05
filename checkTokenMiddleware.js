let myToken = "12345"; // Example token for validation

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

module.exports = {
  checkToken,
};

/* let checkToken = (req, res, next) => {
    console.log("Middleware: Checking token...");
    next(); // Call next() to pass control to the next middleware or route handler. You can add your token validation logic here
  }; */
