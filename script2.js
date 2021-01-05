// NOTE (bsolis): To start, define the container and create variables to manipulate/reference later.
const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let flippedCards = 0;
let clicked = false;

// NOTE (bsolis): Define colors as an array of colors.
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
// NOTE (bsolis): shuffle function provided by SpringBoard.
function shuffle(array) {
    let counter = array.length;
  
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
  
      // Decrease counter by 1
      counter--;
  
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
  
    return array;
  }
  
  let shuffledColors = shuffle(COLORS);
  
  // NOTE (bsolis): Function provided by SpringBoard. Creates a div for the colors. This div is formatted in the provided CSS file which creates our "cards".
  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");
  
      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);
  
      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);
  
      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }

  // NOTE (bsolis): This is where my function starts. With the provided code: 
// function handleCardClick(event) {
//   console.log("you just clicked", event.target);
// }
// I can already see that values are being assigned to each card but nothing happens aside from logging. I wanna start with displaying the colors on the cards when clicked.

  function handleCardClick(e) {
    if (clicked) return;
    if (e.target.classList.contains("flipped")) return;
  
    //  NOTE (bsolis): These lines define a variable current card and set a style change to occur when the card is clicked. After this I could see the color of the cards.
    let currentCard = e.target;
    currentCard.style.backgroundColor = currentCard.classList[0];
  
    // NOTE (bsolis): My next thought is to make it to lock add values to the card1 and card2 variables. This did not prevent addt flips but I was able to console to verify value did not change after flipping more.
    if (!card1 || !card2) {
      currentCard.classList.add("flipped");
      card1 = card1 || currentCard;
      card2 = currentCard === card1 ? null : currentCard;
    }
  
    // NOTE (bsolis): Next we'll compare the card colors with variables. In the HTML the colors are set as classes so we'll yoink those. Logged to make sure they work.
    if (card1 && card2) {
      clicked = true;
      let c1Color = card1.className;
      let c2Color = card2.className;
  
      // NOTE (bsolis): Checking if the colors are the same. If they are, reset card1 and card2. Tested by using the Elements page to click 2 of the same class and logging between.
      if (c1Color === c2Color) {
        flippedCards += 2;
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = null;
        card2 = null;
        clicked = false;
      } 
      
      // NOTE (bsolis): Next I need to make it so that the card will lose the background color (or "flip") if card1 != card2. No real need to specify, can just use general else. Task states there should be a slight delay. Using timeout for this.
      else {
        setTimeout(function() {
            // NOTE (bsolis): The next lines are basically just resetting the cards.
          card1.style.backgroundColor = "";
          card2.style.backgroundColor = "";
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1 = null;
          card2 = null;
          clicked = false;
        }, 1000);
      }
    }
  
    if (flippedCards === COLORS.length) alert("game over!");
  }
  
  // when the DOM loads
  createDivsForColors(shuffledColors);
  