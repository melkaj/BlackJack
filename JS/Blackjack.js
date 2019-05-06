
let gameOver = false;

// Gets the HTML elements
let textArea = document.getElementById("text-area");
let gameOverText = document.getElementById("game-over");
let newGame = document.getElementById("new-game-button");
let hit = document.getElementById("hit-button");
let stay = document.getElementById("stay-button");
let playAgain = document.getElementById("test-button");

// Hides the HIT and STAY buttons
hit.style.display = 'none';
stay.style.display = 'none';
playAgain.style.display = 'none';

// When START GAME button is pressed
newGame.addEventListener('click', function(){
  UpdatePlayerScore();
  UpdateDealerScore();
  UpdateScreen();
  newGame.style.display = 'none';
  hit.style.display = 'inline';
  stay.style.display = 'inline';
});

// Hit
hit.addEventListener('click', function(){
  getNextCard(playerCards);
  UpdatePlayerScore();
  isOver21();
  UpdateScreen();
  if (gameOver === true)
    EndGame();
});

// When the player wants to stay
stay.addEventListener('click', function(){
  hit.style.display = 'none';
  stay.style.display = 'none';
  DealerLogic();
});

playAgain.addEventListener('click', function(){
  PlayAgain();
});

// ----------------------------------------FUNCTION STARTS------------------------------------

//Update the screen
function UpdateScreen(){
  textArea.innerText = "Dealer's Hand:\n" 
                        + HandtoString(dealerCards)
                        + "\n(Score: " + dealerScore + ")"
                        + "\n\nPlayer's Hand:\n"
                        + HandtoString(playerCards)
                        + "\n(Score: " + playerScore + ")";
}

// Assemble Deck
let suites = [
  "Spades", "Hearts", "Clubs", "Diamonds"
];
let faces = [
  "Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight",
  "Nine", "Ten", "Jack", "King", "Queen"
];
function CreateDeck(){
  let deck = [];
  for (let i = 0; i < suites.length; i++){
    for (let j = 0; j < faces.length; j++){
      let card = {
        suit: suites[i],
        face: faces[j]
      };
      deck.push(card);
    }
  }
  return deck;
}

// Print Deck
function PrintDeck(deck){
  console.log("\n\n");
  for (let i = 0; i < deck.length; i++){
    console.log(deck[i]);
  }
  console.log(deck.length);
}

// Shuffles Deck 3 times
function ShuffleDeck(deck){
  for (let j = 0; j < 3; j++){
    for (let i = 0; i < deck.length; i++){
      let swapCard = Math.trunc(Math.random() * deck.length);
      let temp = deck[i];
      deck[i] = deck[swapCard];
      deck[swapCard] = temp;
    }
  }
}

// Gives cards
function getNextCard(someHand){
  someHand.push(deck.shift());
}

// Initial hands
function initialHands(){
  getNextCard(playerCards);
  getNextCard(playerCards);
  getNextCard(dealerCards);
  getNextCard(dealerCards);
}

// Prints out the hand
function HandtoString(hand){
  let temp = [];
  for (let i = 0; i < hand.length; i++){
    if (temp.length === 0)
      temp.push(hand[i].face + " of " + hand[i].suit);
    else
      temp.push("\n" + hand[i].face + " of " + hand[i].suit);
    
  }
  return temp;
}

function EndGame(){
	gameOverText.style.display = 'block';
  if (playerScore <= 21 && dealerScore > 21)
    gameOverText.innerText = "Game Over\nPlayer Wins!!!";
  else if (playerScore === dealerScore)
	gameOverText.innerText = "Game Over\nPush.";
  else
    gameOverText.innerText = "Game Over\nDealer wins";
    
  hit.style.display = 'none';
  stay.style.display = 'none';
  playAgain.style.display = 'block';
}

// For when the player stays and the dealer has to play to win
function DealerLogic(){
  while (playerScore >= dealerScore && dealerScore < 21){
    getNextCard(dealerCards);
    UpdateDealerScore();
    isOver21();
    UpdateScreen();
    if (gameOver === true)
      EndGame();
  }
  if (dealerScore > playerScore){
	  gameOver = true;
	  EndGame();
  }
}

// Checking the score
function isOver21 (){
  if (dealerScore > 21)
    gameOver = true;
  else if (playerScore > 21)
    gameOver = true;
  else if (dealerScore > playerScore && hit.style.display === 'none')
    gameOver = true;
  else if (dealerScore === playerScore)
	gameOver = true;
}

// Updates playerScore
function UpdatePlayerScore(){
  playerScore = 0;
  for (let i = 0; i < playerCards.length; i++){
	if (playerCards[i].face === 'Ace'){
		if (playerScore + 11 <= 21)
			playerScore += 11;
		else
			playerScore += 1;
	}
	else
		playerScore += GetCardValue(playerCards[i]);
  }
  isOver21();
  if (gameOver === true)
    EndGame();
}

// Updates dealerScore
function UpdateDealerScore(){
  dealerScore = 0;
  for (let i = 0; i < dealerCards.length; i++){
    if (dealerCards[i].face === 'Ace'){
		if (dealerScore + 11 <= 21)
			dealerScore += 11;
		else
			dealerScore += 1;
	}
	else
		dealerScore += GetCardValue(dealerCards[i]);
  }
}

// Get the score (Helper for the update functions)
function GetCardValue(hand){
  let temp = 0;
  switch (hand.face){
    //case "Ace": 
      //temp += 1;
      //break;
    case "Two":
      temp += 2;
      break;
    case "Three":
      temp += 3;
      break;
    case "Four":
      temp += 4;
      break;
    case "Five":
      temp += 5;
      break;
    case "Six":
      temp += 6;
      break;
    case "Seven":
      temp += 7;
      break;
    case "Eight":
      temp += 8;
      break;
    case "Nine":
      temp += 9;
      break;
    default: 
      temp += 10;
      break;
  }
  return temp;
}

function PlayAgain(){
  // Starting Game
  gameOver = false;
  playerCards = [];
  dealerCards = [];
  
  // Scores
  playerScore = 0;
  dealerScore = 0;
  
  deck = [];
  deck = CreateDeck();
  ShuffleDeck(deck);
  initialHands();
  
  UpdatePlayerScore();
  UpdateDealerScore();
  UpdateScreen();
  newGame.style.display = 'none';
  playAgain.style.display = 'none';
  gameOverText.style.display = 'none';
  hit.style.display = 'inline';
  stay.style.display = 'inline';
}

// ----------------------------------------FUNCTION ENDS--------------------------------------

// Starting Game
let playerCards = [];
let dealerCards = [];

// Scores
let playerScore = 0;
let dealerScore = 0;

let deck = CreateDeck();
ShuffleDeck(deck);
//PrintDeck(deck);
initialHands();
