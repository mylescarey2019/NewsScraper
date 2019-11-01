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

  // Comment click event - query for comments
  $(".comment-btn").on("click", function(event) {
    console.log("In comment-btn  click");
    // remove comments from previous active story (if there is one)
    $(".story-comment, .add-comment-btn, .add-comment-input").remove();


    // render comments (if there are any) for this story
    var id = $(this).data("story-id");
    var endOfStoryElem = $(this).prev();
    console.log(`Story ID is: ${id}`);

    // call the get comments route
    $.ajax(`/api/story-comments/${id}`, {
      type: "GET"
    }).then(res => {
        console.log(JSON.stringify(res));
        res.map(comment => {
          console.log(comment._id);
          console.log(comment.body);
          delBtn = $(`<button class="btn btn-danger btn-sm comment-del-btn" data-comment-id="${comment._id}">Delete</button>`);
          // prevElem.append(delBtn);
          endOfStoryElem.append(`<p class="story-comment" data-comment-id="${comment._id}"><span></>${comment.body}`);
          var spanTarget = $(".story-comment:last span");
          spanTarget.prepend(delBtn);
        });
        
        // render the Add comment form
        endOfStoryElem.append(`<div>`);
        endOfStoryElem.append(`<button class="btn btn-success btn-sm add-comment-btn">Add</button>`);
        endOfStoryElem.append(`<textarea class="add-comment-input" name='body'></textarea>`);
      }
    );
  });


  // delete comment click event
  $(document).on("click", ".comment-del-btn", function() {
    console.log("In comment delete click");
    var commentId = $(this).data("comment-id");
    console.log(`you clicked delete for ${commentId}`)

    // call the delete route
    $.ajax(`/api/story-comment/${commentId}`, {
      type: "DELETE"
    }).then(
      function() {
        console.log("comment deleted");
        // remove from DOM
        $(`.story-comment[data-comment-id="${commentId}"]`).remove();
      }
    );
  });

    
  // // add comment click event
  // $(document).on("click", ".comment-del-btn", function() {
  //   console.log("In comment delete click");
  //   var commentId = $(this).data("comment-id");
  //   console.log(`you clicked delete for ${commentId}`)

  //   // call the delete route
  //   $.ajax(`/api/story-comment/${commentId}`, {
  //     type: "DELETE"
  //   }).then(
  //     function() {
  //       console.log("comment deleted");
  //       // remove from DOM
  //       $(`.story-comment[data-comment-id="${commentId}"]`).remove();
  //     }
  //   );
  // });

  

//   //  click event for comment delete 
//   $(".comment-del-btn").on("click", function(event) {
//     console.log("In comment delete click");
//     var commentId = $(this).data("comment-id");
//     console.log(`you clicked delete for ${commentId}`)

//   //   // call the delete route
//   //   $.ajax("/api/scrape", {
//   //     type: "GET"
//   //   }).then(
//   //     function() {
//   //       console.log("re-scraped");
//   //       // Reload the page to get the updated list
//   //       location.reload();
//   //     }
//   //   );

//  });


});  // DOM Ready