var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");



// Require all models
var db = require("./models");

var PORT = 3001;

// Initialize Express
var app = express();


// Set up Router
var router = express.Router();

// Routes
// =============================================================
require("./routes/html-route.js")(router);
require("./routes/scrape-api-route.js")(router);
require("./routes/news-api-routes.js")(router);

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Get database  - deployed or local
var db = process.env.MONGODB_URI || "mongodb://localhost/blogs";
// Connect to the Mongo DB
mongoose.connect(db, { useNewUrlParser: true }, function(error) {
  if (error) {
    console.log(error)
  } else {
    console.log("mongoose sucessful connection")
  };
});


mongoose.set('useCreateIndex', true);


// user router
app.use(router);


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
