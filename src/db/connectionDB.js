const mongoose = require("mongoose");
require("dotenv").config();

let connectionURL = process.env.DB_CONNECTION_URL;
connectionURL = `${connectionURL}/${process.env.DB_NAME}?${process.env.DB_URL_QUERY}`;


const connectDB = async () => {
  await mongoose.connect(connectionURL);
  console.log("Database connected");
};

module.exports = connectDB;
