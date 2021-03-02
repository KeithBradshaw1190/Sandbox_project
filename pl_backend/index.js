const tracer = require('dd-trace').init({
  hostname: 'datadog-agent',
  port: 8126,
  env:'sandbox'
})

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Import express
const express = require("express");
// Import Body parser
const bodyParser = require("body-parser");
// Import Mongoose
const mongoose = require("mongoose");
//
// Initialise the app
const app = express();

// Import routes
const book = require("./routes/book");

// CORs
const cors = require('cors')

app.use(cors());

app.use(function (req, res, next) {

  next();
});
// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
// app.use(express.static('public'));
// Connect to Mongoose and set connection variable
const url = 'mongodb://mongo:27017/plApp';

mongoose.connect(
  url, {
    useNewUrlParser: true
  }
);
var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 3003;

// Send message for default URL
app.get("/", (req, res) =>
  res.send("Private Location App API")
);
app.use(express.json());

// Use Api routes in the App
app.use(book);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running  on port " + port);
});