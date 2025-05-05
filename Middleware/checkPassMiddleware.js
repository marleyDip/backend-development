let myPass = "12345"; // Example token for validation

let checkPass = (req, res, next) => {
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
}; // Middleware to log request details

module.exports = {
  checkPass,
};
