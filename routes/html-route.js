// *********************************************************************************
// this file offers an html route for the rendering the page for the root route
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");



// Routes
// =============================================================

module.exports = function (app) {

  // select all orders and render on home page
  app.get("/", function(req,res) {
    // simply render something for testing purposes
    res.render("index",{greeting: "Hello Word"});

    // // model call to retrieve all the blogposts
    // foodorder.all(function(data) {
    //   var hbsObject = {
    //     orders: data
    //   };
    //   console.table(data);
    //   res.render("index", hbsObject);
    //   // // simply render something for testing purposes
    //   // res.render("index",{greeting: "Hello Word"});
    // });
  });

};  // end of module export