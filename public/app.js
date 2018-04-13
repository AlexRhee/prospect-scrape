// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").prepend("<div class='card'><div class='card-title'>" + data[i].title + "<button data-id='" + data[i]._id + "' type='button' id='makeNote' class='btn btn-primary btn-xs waves-effect waves-light btn modal-trigger'>Create Note</button><button data-id='" + data[i]._id + "' type='button' id='save' class='btn btn-primary btn-xs'>Save Article</button></div><div class='card-body'>" + data[i].summary + "</div></div>"
        
      );
    }
  });
  
  $(document).on("click", "#scraper", function() {
    $.ajax({
      method:"GET",
      url: "/scrape"
    })
    .then(function(data) {
      console.log(data);
    })
  })
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", "#makeNote", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h4>" + data.title + "</h4>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
        $("#notes").append("<button data-id='" + data.note._id + "' id='deletenote'>Delete Note</button>");
  
        
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  
  $(document).on("click", "#deletenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "DELETE",
      url: "/articles/" + thisId,
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  
  $(document).on("click", "#save", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "PUT",
      url: "/save/" + thisId,
      data: {data: thisId}
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);

      });
  });

  // $(document).on("click", "#show", function(){
  //   $("#articles").empty();
  //   $.ajax({
  //     method: "GET",
  //     url: "/saved"
  //   }).then(function(data) {

      

      
  //   })
  // })

  $.getJSON("/saved", function(data) {
    $("#articles").empty();
    console.log("test" + data);
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").prepend("<div class='card'><div class='card-title'>" + data[i].title + "<button data-id='" + data[i]._id + "' type='button' id='makeNote' class='btn btn-primary btn-xs waves-effect waves-light btn modal-trigger'>Create Note</button><button data-id='" + data[i]._id + "' type='button' id='save' class='btn btn-primary btn-xs'>Save Article</button></div><div class='card-body'>" + data[i].summary + "</div></div>"
        
      );
    }
  });
  