// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {


  $("#re-scrape").on("click", function(event) {
    console.log("In Refresh Stories");

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

});