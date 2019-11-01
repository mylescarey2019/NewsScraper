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
    $(".story-comment").remove();

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
        
        endOfStoryElem.append("<textarea id='bodyinput' name='body'></textarea>");
        endOfStoryElem.append("<button data-id='" + data._id + "' id='savenote'>Add Comment</button>");



      }
    );

    // $("#notes").append("<h2>" + data.title + "</h2>");
    // $("#notes").append("<input id='titleinput' name='title' >");
    // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    // $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
    // if (data.notes) {
    //   const notes = data.notes;
    //   for (let i = 0; i < notes.length; i++) {
    //     let noteTitle = $("<div id='bodyinput'>").text(notes[i].title)
    //     let noteBody = $("<p class='note'>").text(`- ${notes[i].body}`)
    //     noteTitle.append(noteBody);
    //     $("#notes").append(noteTitle);
    //   }
    // }



  });

});