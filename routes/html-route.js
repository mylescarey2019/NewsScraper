// *********************************************************************************
// this file offers an html route for the rendering the page for the root route
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");



// Routes
// =============================================================

module.exports = function (router) {

  // select all orders and render on home page
  router.get("/", function(req,res) {


    // get all news stories from db
    db.News.find({}).sort({ '_id': -1 })
      .then(function(dbNews) {
      // render home page with data via handlebars
      var hbsObject = {
          newsStories: dbNews
      };
        console.table(JSON.stringify(dbNews));
        res.render("home", hbsObject);
        // // simply render something for testing purposes
        // res.render("home",{greeting: "Hello Word"});
      })
      .catch(function(err) {
        // If an error occurs, console.log it
        console.log(err);
      });
    });

};  // end of module export