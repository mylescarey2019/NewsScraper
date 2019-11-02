# News Scraper 

## Full Stack website that scrapes headlines from LA Times

## Description

This full stack web site scrapes story headlines from the LA Times and allows for user comments to be added/removed to each story.  Headlines, summary, link and comments are stored in a mongo database.

- #### Front-End Technology

- HTML, CSS, JavaScript (ES6), jQuery, Bootstrap, Handlebars

#### Back-End Technology

- Node.js, Express.js, mongo.js, mongoose ORM, JavaScript (ES6), NPM packages (axios, cheerio,express, mongoose, morgan), Heroku, MVC

### Database Model

1. Database model consists of stories and comment mongo collections
   - a comment document is tied to one story document
   - a story document can have 0 or more comment documents through
   the comment documents story document id 


## User Stories / Use Cases

1. user starts on home page

   1. page loads showing existing stories found in database

2. user clicks 'Get New Stories'

   1. latest LA Times headlines are loaded - up to 20
   2. no duplicate stories will be saved in the database
   3. stories are ordered by database id so newest will appear first

3. user clicks on Comments for a story

   1. any existing comments appear with delete buttons
   2. form for adding new comment appears

4. user clicks on Comments again or clicks on comments for a different story

   1. comment section closes and if different story comment button clicked then its comment section opens 

5. user adds or deletes a comment

   1. comment is added and appears in list provided it was not blank (modal appears if it was blank)

   2. comment is deleted and is removed from screen if delete button pressed

   3. Added and Deleted comment activity is saved to database so revisiting page at later time will still reflect the changes

6. user clicks on story link

   1. new browser tab opens with original LA Times story (if it is still available)

### Psuedo Code - 

1. routes
   1. hmtl routes for home page via handlebars - all stories from database are retrieved
   2. api routes for comments
      1. add a comment
      2. delete a comment
      3. get all comments for a story
