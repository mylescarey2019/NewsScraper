// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  // Refresh stories click event - re-scrap to get more stories
  $("#re-scrape").on("click", function(event) {
    console.log("In Refresh Stories click");
    // call the scrape route
    $.ajax("/api/scrape", {
      type: "GET"
    }).then(
      function() {
        console.log("re-scraped");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // Story headline click event - query for comments
  $("h5").on("click", function(event) {
    console.log("In Story Headline click");

    var id = $(this).data("id");
    console.log(`Story ID is: ${$(this).data("id")}`);
    // call the get comments route
    $.ajax(`/api/story-comments/${id}`, {
      type: "GET"
    }).then(
      function(res) {
        console.log(JSON.stringify(res));
      }
    );

        // // call the scrape route
        // $.ajax("/api/scrape", {
        //   type: "GET"
        // }).then(
        //   function() {
        //     console.log("re-scraped");
        //     // Reload the page to get the updated list
        //     location.reload();
        //   }
        // );
  });

});