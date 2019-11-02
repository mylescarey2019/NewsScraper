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

  // Route for deleting a comment
  router.delete("/api/story-comment/:id", function(req, res) {
    // delete a comment
    db.Comment.deleteOne({_id: req.params.id},)
      .then(function(delelteResult) {
        // If we were able to successfully delete the comment
        // console.log(JSON.stringify(deleteResult));
        res(deleteResult);
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

};  // end of module export