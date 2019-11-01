// *********************************************************************************
// this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");


// Routes
// =============================================================

module.exports = function (router) {


  // Route for getting all comments for a story
  router.get("/api/story-comments/:id", function(req, res) {
    // Grab every document in the Comment collection for a given story
    db.Comment.find({_storyId: req.params.id})
      .then(function(dbComments) {
        // If we were able to successfully find Comments, send them back to the client
        res.json(dbComments);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for saving a comment
  router.post("/api/story-comment", function(req, res) {
    // save comment to database
    db.Comment.create(req.body)
      .then(function(dbComment) {
        // If we were able to save comment 
        res.json(dbComment);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // // Route for getting all Articles from the db
  // app.get("/articles", function(req, res) {
  //   // Grab every document in the Articles collection
  //   db.Article.find({})
  //     .then(function(dbArticle) {
  //       // If we were able to successfully find Articles, send them back to the client
  //       res.json(dbArticle);
  //     })
  //     .catch(function(err) {
  //       // If an error occurred, send it to the client
  //       res.json(err);
  //     });
  // });

  // // Route for grabbing a specific Article by id, populate it with it's note
  // app.get("/articles/:id", function(req, res) {
  //   // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  //   db.Article.findOne({ _id: req.params.id })
  //     // ..and populate all of the notes associated with it
  //     .populate("note")
  //     .then(function(dbArticle) {
  //       // If we were able to successfully find an Article with the given id, send it back to the client
  //       res.json(dbArticle);
  //     })
  //     .catch(function(err) {
  //       // If an error occurred, send it to the client
  //       res.json(err);
  //     });
  // });

  // // Route for saving/updating an Article's associated Note
  // app.post("/articles/:id", function(req, res) {
  //   // Create a new note and pass the req.body to the entry
  //   db.Note.create(req.body)
  //     .then(function(dbNote) {
  //       // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
  //       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
  //       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
  //       return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
  //     })
  //     .then(function(dbArticle) {
  //       // If we were able to successfully update an Article, send it back to the client
  //       res.json(dbArticle);
  //     })
  //     .catch(function(err) {
  //       // If an error occurred, send it to the client
  //       res.json(err);
  //     });
  // });

};  // end of module export