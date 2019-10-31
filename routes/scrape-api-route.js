// *********************************************************************************
// this file offers a set of routes for scraping and rendering root route
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Routes
// =============================================================

module.exports = function (router) {

  // A GET route for scraping the website
  router.get("/api/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.latimes.com").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      var newsCount = 0;
      // Now, we grab every h2 within an article tag, and do the following:
      $("div.PromoSmall-content").each(function(i,element) {
        // Save an empty result object
        
        var result = {};
        // only look through the first 30 articles returned
        newsCount++;
        if (newsCount > 5) {
          return false;  // forces break out of from JQuery each method
        };

        // gather components of a new story post

        var headline = $(element).find('div.PromoSmall-title a').text();
        console.log(`CT: ${newsCount} TITLE: ${headline}`);
        var summary = $(element).find('div.PromoSmall-description').text();
        console.log(`SUMMARY: ${summary}`);
        var link = $(element).find('div.PromoSmall-title a').attr('href');
        console.log(`LINK: ${link}`);
        var storyDate = $(element).find('div.PromoSmall-timestamp').attr('data-date');
        console.log(`DATE: ${storyDate}`);

        // only save to DB if all 3 components were found for news story
        if (headline && summary && link && storyDate) {
          result.headline = headline;
          result.summary = summary;
          result.link = link;
          result.storyDate = storyDate;
          // Create a new News using the `result` object built from scraping
          db.News.create(result)
            .then(function(dbNews) {
              // View the added result in the console
              console.log(dbNews);
            })
            .catch(function(err) {
              // If an error occurred, log it
              console.log(err);
            });
        };
        
          // //div.PromoSmall-titleContainer a
          // result.headline = $(element).find('div.PromoSmall-title a').text();
          // console.log(`CT: ${newsCount} TITLE: ${result.headline}`);
          // result.summary = $(element).find('div.PromoSmall-description').text();
          // console.log(`SUMMARY: ${result.summary}`);
          // result.link = $(element).find('div.PromoSmall-title a').attr('href');
          // console.log(`LINK: ${result.link}`);
            // Add the text and href of every link, and save them as properties of the result object
            // result.title = 
              // .find("a")
              // .text();

            // result.link = $(this).attr("href");
            //   // .children("a")
            //   // .attr("href");

            // console.log(result.title);
            // console.log(result.link);



        });

      // Send a message to the client
      res.send("Scrape Complete");
    });
  });

};  // end of module export