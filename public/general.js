$(document).ready(function() { // stops automatic sliding of the carousel
  $('.carousel').carousel({
    interval: false
  });
  if(window.location.hash.substr(1) != "") {setTimeout(gotoHash, 3);} // if their url isn't empty, go to the hash.
  $(".gotohash").click(function() {
    setTimeout(gotoHash, 3);
  }); // if they click an element with gotohash, go to the hash, giving the hash a moment to update.
});

function gotoHash() { // sets the right carousel item to active, dependent on their hash.
  var hash = window.location.hash.substr(1);
  if(hash == "myCarousel") hash = "magic8ballc"
  $(".carousel").find(".carousel-item").removeClass("active"); // set all carousel items inactive
  $("." + hash).addClass("active");
}

function getRandomIndexOfArr(arr, del=false) { // gets the random index of an array, with options to delete. cardshuffling.js is dependent on this.
  var index = Math.floor(Math.random() * arr.length);
  var item = arr[index];
  if(del) arr.splice(index, 1); // if del was set to true, delete that index.
  return {item: item, arr: arr};
}