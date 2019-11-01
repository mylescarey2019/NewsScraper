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
    // get the story id
    var storyId = $(this).data("story-id");
    var endOfStoryElem = $(this).prev();
    console.log(`Story ID is: ${storyId}`);

    // toggle activity - if clicked and there are story comment rendered
    // on this story then remove them - i.e. treat click as a collapse function
    // $(`[data-story-id]:not(.comment-btn`).remove();
    $(".comment-dispose").remove();

    // var elCt = $(`[data-story-id]:not(.comment-btn`).length;
    // console.log(`elemCt: ${elCt}`);

    // if ($(`[data-story-id="${storyId}"]:not(.comment-btn)`).length) {
    //   $(`[data-story-id="${storyId}"]:not(.comment-btn`).remove();
    // } else {
    //   // // remove controls from previous active story (if there is one)
    //   $(`[data-story-id="${storyId}"]:not(.comment-btn`).remove();

      // render comments (if there are any) for this story
      // call the get comments route
      $.ajax(`/api/story-comments/${storyId}`, {
        type: "GET"
      }).then(res => {
          console.log(JSON.stringify(res));
          res.map(comment => {
            console.log(comment._id);
            console.log(comment.body);
            delBtn = $(`<button class="btn btn-danger btn-sm comment-del-btn comment-dispose" data-comment-id="${comment._id}">Delete</button>`);
            // prevElem.append(delBtn);
            endOfStoryElem.append(`<p class="story-comment comment-dispose" data-story-id="${storyId}" data-comment-id="${comment._id}"><span></>${comment.body}`);
            var spanTarget = $(".story-comment:last span");
            spanTarget.prepend(delBtn);
          });
          
          // render the Add comment form
          endOfStoryElem.append(`<div>`);
          endOfStoryElem.append(`<button class="btn btn-success btn-sm add-comment-btn comment-dispose" data-story-id="${storyId}">Add</button>`);
          endOfStoryElem.append(`<textarea class="add-comment-input comment-dispose" name='body' data-story-id="${storyId}"></textarea>`);
        }
      );
    // };
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