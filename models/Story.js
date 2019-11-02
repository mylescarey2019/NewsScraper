var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new StorySchema object
var StorySchema
 = new Schema({
  // `title` is required and of type Stringß
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
  // date is required 
  storyDate: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Story = mongoose.model("Story", StorySchema);

// Export the Story model
module.exports = Story;
