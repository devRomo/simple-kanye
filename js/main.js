$(document).ready(function(){

  var proxy = "https://cors-anywhere.herokuapp.com/";
  var apiURL = "http://www.kanyerest.xyz/api/";

  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 50
      }, 1800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if

  });

  $("button").on("click", function () {
    var album = $("input").val();

    $.ajax({
      url: proxy + apiURL + "album/" + album,

      success: function (response) {
        $(".lyrics").html("");
        $("span").html("");
        $("ul li").remove();
        console.log(response); // server response
        $("span").append(response.album)
        $.each(response.result, function (index, value) {
          $("ul").append("<li>" + response.result[index].title + "</li>")
        });
      },
      error: function (r) {
        console.log(r); //server response
      }
    });
  });

  $("ul").on("click", "li", function(){
    var song = $(this).html();

    $.ajax({
      url: proxy + apiURL + "track/" + song,

      success: function (response) {
        $(".lyrics").html("");
        console.log(response); // server response
        $(".lyrics").append(response.lyrics);

      },
      error: function (r) {
        console.log(r); //server response
      }
    });
  });
});
