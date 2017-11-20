// early declarations
var suits = ['Clubs','Diamonds','Hearts','Spades'];
var vals = ['A','2','3','4','5','6','7','8','9','T','J','Q','K'];
var deck = makeDeck();

function flipCard(card) { // flips a card
  $(card).toggleClass('flipped');
  //console.log(card);
}
function chooseNewCard(card) { // chooses a new front-face image for that card. !THESE ARE NOT RANDOMLY GENERATED, YOU MUST FIRST SHUFFLE THE DECK.!
  var ncard = card;
  var imgsrc = deck[ncard.split("card-")[1]]; // chooses the card that belongs to this card
  $(card).find(".front").find(".card-face").attr("src", imgsrc); // sets it to the DOM
}
function shuffleDeck(deck) { // makes a new deck, shuffled from the existing deck.
  var ndeck = [];
  while(deck.length > 0) { // puts a randomly chosen card into the first position, and deletes the old one, until theres no old ones left.
    var tmp = getRandomIndexOfArr(deck, true); 
    ndeck.push(tmp.item);
    deck = tmp.arr;
  }
  console.log(ndeck);
  return ndeck;
}
function shuffleCardsAnim() { // shuffles the cards with an animation
  deck = shuffleDeck(deck); // get new deck, for when they flip back up.
  for(var i = 0; i < 5; i++) { // for each card
    var target = ".card-" + i; // get the cards individual class
    setTimeout(flipCard, 200 * i, target); // flip that card after .2 seconds * the card number.
    setTimeout(chooseNewCard, 200 * i + 1000, target); // choose a new image after 1s, when the face is down.
    setTimeout(flipCard, 200 * i + 1400, target); // flip that card back up, after 1.4 s
  }
}

function makeDeck() {
  var ndeck = [];
  for(var suit of suits) {
    for(var val of vals) {
      // for each suit and value, make a new card, and append it to an array.
      ndeck.push("http://sinz.org/Michael.Sinz/cards/standard/" + suit + "/" + val + ".gif"); 
    }
  }
  console.log(ndeck);
  return ndeck;
}
function getRandomIndexOfArr(arr, del=false) {
  var index = Math.floor(Math.random() * arr.length);
  var item = arr[index];
  if(del) arr.splice(index, 1); // if del was set to true, delete that index.
  return {item: item, arr: arr};
}

$(document).ready(function() { // when the page is ready
  $('.card').click(function(e) { // when the card is clicked
    e.preventDefault();
    flipCard(this); // flips this card
  });
  
  $("#cards-shuffle").click(function(e) { // when they click the card shuffle button
  });
});
