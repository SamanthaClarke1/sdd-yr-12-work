var messages = [
  "My answer is no",
  "Sources indicate yes",
  "Reply hazy, ask again.",
  "Definately not.",
  "Decidedly so.",
  "It is certain",
  "The gods above refuse to answer",
  "Unfortunately not.",
  "I wish it weren't; but it is."
];

$(document).ready(function() {
  $(".ball").click(function() { // when the balls clicked
    if(!$(".ball").hasClass("disabled")) { // if it hasn't been recently pressed
      $(".ball").toggleClass("disabled");
      
      $(".ball-text-holder-inner").empty(); // clear out the old answers

      hideThinkingIcon();
      $(".ball-clickme-text").remove(); // hide the clickme text

      setTimeout(function(){$(".ball-thinking-icon").toggleClass("hidden");}, 1000); // icon fade out after 1s
      setTimeout(function(){$(".ball-thinking-icon").toggle();}, 1999) // remove unneccesary div item.
      setTimeout(generateText, 2500); // after 2.5s call generateText

      $(".ball").toggleClass("disabled");
    }
  });
});

function generateText() {
  var message = getRandomIndexOfArr(messages).item; // choose random answer
  var words = message.split(" "); // split it into words
  
  for(var i in words) {
    setTimeout(addWord, 200 * i, words[i]); // set in place each word 200ms after each other.
  }
}
function addWord(word) {
  var toAppend = '<h3 class="haunted-text fadeinout" style="display: inline;"> ' + word + '  </h3>'; // ew no pug ): {generates the word to append}
  $(".ball-text-holder-inner").append(toAppend);
}
function hideThinkingIcon() {
  $(".ball-thinking-icon").toggle();
  $(".ball-thinking-icon").toggleClass("hidden");
}