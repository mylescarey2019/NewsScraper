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
require("./routes/html-routes.js")(router);
require("./routes/scrape-api-routes.js")(router);
require("./routes/story-api-routes.js")(router);
require("./routes/comment-api-routes.js")(router);

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
var MONGODB_URI  = process.env.MONGODB_URI || "mongodb://localhost/newsarticles";
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI , { useNewUrlParser: true }, function(error) {
  if (error) {
    console.log(error)
  } else {
    console.log("mongoose successful connection")
  };
});

// // Get database  - deployed or local
// var db = process.env.MONGODB_URI || "mongodb://localhost/newsarticles";
// // Connect to the Mongo DB
// mongoose.connect(db, { useNewUrlParser: true }, function(error) {
//   if (error) {
//     console.log(error)
//   } else {
//     console.log("mongoose successful connection")
//   };
// });


mongoose.set('useCreateIndex', true);


// user router
app.use(router);


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
