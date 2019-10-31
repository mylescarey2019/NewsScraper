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
        newsCount++;
        if (newsCount > 20) {
          return false;
        };

          //div.PromoSmall-titleContainer a
          result.headline = $(element).find('div.PromoSmall-title a').text();
          console.log(`CT: ${newsCount} TITLE: ${result.headline}`);
          result.summary = $(element).find('div.PromoSmall-description').text();
          console.log(`SUMMARY: ${result.summary}`);
          result.link = $(element).find('div.PromoSmall-title a').attr('href');
          console.log(`LINK: ${result.link}`);
            // Add the text and href of every link, and save them as properties of the result object
            // result.title = 
              // .find("a")
              // .text();

            // result.link = $(this).attr("href");
            //   // .children("a")
            //   // .attr("href");

            // console.log(result.title);
            // console.log(result.link);

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

        });

      // Send a message to the client
      res.send("Scrape Complete");
    });
  });

};  // end of module export