var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new CommentSchema object
var CommentSchema = new Schema({
  // id of the story the comment is attached to
  _storyId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Story'
  },
  // `body` is of type String
  body: String
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;
