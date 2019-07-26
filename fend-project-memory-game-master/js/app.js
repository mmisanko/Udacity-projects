// Card list
/*const cards = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o','fa fa-anchor', 'fa fa-anchor',
'fa fa-bolt', 'fa fa-bolt','fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];*/

const deck = document.querySelector('.deck');

deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (
    clickTarget.classList.contains('card') && flippedCards.length < 2 && !flippedCards.includes
    (clickTarget)
  ) {
      flipCard(clickTarget);
      addFlipCard(clickTarget);
      if (flippedCards.length === 2) {
        checkForMatch(clickTarget);
      }
  }
});

function flipCard(clickTarget) {
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');
}

let flippedCards = [];
function addFlipCard(clickTarget) {
  flippedCards.push(clickTarget);
  console.log(flippedCards);
}

function checkForMatch() {
  if (
      flippedCards[0].firstElementChild.className ===
      flippedCards[1].firstElementChild.className
  ) {
      flippedCards[0].classList.toggle('match');
      flippedCards[1].classList.toggle('match');
      flippedCards = [];
  } else {
      setTimeout(() => {
        flipCard(flippedCards[0]);
        flipCard(flippedCards[1]);
        flippedCards = [];
      }, 1000);
  }
}






// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


















/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
