var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var BlogPostSchema = new Schema({
  // `title` is required and of type String
  headline: {
    type: String,
    required: true,
    unique: true
    
  },
  // content summary
  summary: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  // `comments` is and array of objects that stores comment id(s)
  // The ref property links the ObjectId to the comment model
  // This allows us to populate the BlogPost with an associated comments
  comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
  ]    
});

// This creates our model from the above schema, using mongoose's model method
var BlogPost = mongoose.model("BlogPost", BlogPostSchema);

// Export the BlogPost model
module.exports = BlogPost;
