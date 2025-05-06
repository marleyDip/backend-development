const { MongoClient } = require("mongodb");
let dbConnectionUrl = "mongodb://127.0.0.1:27017"; // MongoDB connection URL

const client = new MongoClient(dbConnectionUrl); // Create a new MongoClient instance

let dbConnection = async () => {
  await client.connect(); // Connect to the MongoDB server
  let db = client.db("mongoDBPractice_dataBase"); // Specify the database to use
  return db; // Return the database connection
};

module.exports = { dbConnection }; // Export the dbConnection function for use in other files
