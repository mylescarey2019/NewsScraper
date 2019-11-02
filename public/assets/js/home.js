// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  function getComments(storyId,endOfStoryElem) {
    // console.log("in global.getComments");
    $.ajax(`/api/story-comments/${storyId}`, {
      type: "GET"
    }).then(res => {
        // console.log(JSON.stringify(res));
        res.map(comment => {
          // console.log(comment._id);
          // console.log(comment.body);
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
  };



  // Refresh stories click event - re-scrap to get more stories
  $("#re-scrape").on("click", function(event) {
    // console.log("In Refresh Stories click");
    // call the scrape route
    $.ajax("/api/scrape", {
      type: "GET"
    }).then(
      function() {
        // console.log("re-scraped");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // Comment click event - query for comments
  $(".comment-btn").on("click", function(event) {
    // console.log("In comment-btn  click");
    // get the story id
    var storyId = $(this).data("story-id");
    var endOfStoryElem = $(this).prev();
    // console.log(`Story ID is: ${storyId}`);

    // toggle activity - if clicked and there are story comment rendered
    // on this story then remove them - i.e. treat click as a collapse function
    var activeComments = $(`[data-story-id="${storyId}"]:not(.comment-btn)`).length;
    // remove comments - to "close" comments on other story in the UI
    $(".comment-dispose").remove();

    // render comments for this story if it was not already opened/closed
    if (!activeComments) {
      getComments(storyId,endOfStoryElem);
    };
  });


  // delete comment click event
  $(document).on("click", ".comment-del-btn", function() {
    // console.log("In comment delete click");
    var commentId = $(this).data("comment-id");
    // console.log(`you clicked delete for ${commentId}`)

    // call the delete route
    $.ajax(`/api/story-comment/${commentId}`, {
      type: "DELETE"
    }).then(
      function() {
        // console.log("comment deleted");
        // remove from DOM
        $(`.story-comment[data-comment-id="${commentId}"]`).remove();
      }
    );
  });

    
  // add comment click event
  $(document).on("click", ".add-comment-btn", function() {
    // console.log("In comment add click");
    var storyId = $(this).data("story-id");
    // console.log(`you clicked add comment for ${storyId}`);
    var commentText = $(".add-comment-input").val().trim();
    // console.log(`you typed ${commentText}`);
    if (!commentText) {
      $('#empty-comment-text-box-modal').modal('show');
    } else {
      // get the story id
      var storyId = $(this).data("story-id");
      var endOfStoryElem = $(this).prev();
      // console.log(`Story ID is: ${storyId}`);

      // add comment
      var comment = {
        _storyId: storyId,
        body: commentText
      };
      // console.log(comment); 
      // call the add route
      $.ajax(`/api/story-comment/`, {
        type: "POST",
        data: comment
      }).then(
        function(dbComment) {
          // console.log(`comment added ${JSON.stringify(dbComment)}`);
          delBtn = $(`<button class="btn btn-danger btn-sm comment-del-btn comment-dispose" data-comment-id="${dbComment._id}">Delete</button>`);
          // prevElem.append(delBtn);
          endOfStoryElem.append(`<p class="story-comment comment-dispose" data-story-id="${dbComment._storyId}" data-comment-id="${dbComment._id}"><span></>${dbComment.body}`);
          var spanTarget = $(".story-comment:last span");
          spanTarget.prepend(delBtn);
          $(".add-comment-input").val('');
        }
      );
      // re-render the comments - not going to do this due to the UX re-render blink 
      // $(".comment-dispose").remove();
      // getComments(storyId,endOfStoryElem);

    };
  });

});  // DOM Ready