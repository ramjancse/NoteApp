require("dotenv").config();

const http = require('http')
const app = require('./app')
const { connectDB } = require("./db/index");
const server =http.createServer(app)

const port = process.env.PORT || 4000;
const main = async () => {
  try {
    await connectDB();
    server.listen(port, async () => {
      console.log("server is listening on port number 4000");
    });
  } catch (error) {
    console.log(error);
  }
};
main();