$(document).ready(function() { // stops automatic sliding of the carousel
  $('.carousel').carousel({
    interval: false
  });
  if(window.location.hash.substr(1) != "") {gotoHash();} // if their url isn't empty, go to the hash.
  $(".gotohash").click(gotoHash); // if they click an element with gotohash, go to the hash.
});

function gotoHash() { // sets the right carousel item to active, dependent on their hash.
  $(".carousel").find(".carousel-item").removeClass("active"); // set all carousel items inactive
  $("." + window.location.hash.substr(1)).addClass("active");
  console.log(window.location.hash.substr(1));
}