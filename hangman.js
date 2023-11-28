// import required modules
import prompt from "readline-sync";
//import wordBank from "./word-bank";
import wordBank from "./word-bank.js";
// function to pick a random word from the word bank
/* link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */
function getRandomWord() {
  // this will return a random word.
  const randomIndex = Math.floor(Math.random() * wordBank.length);
  return wordBank[randomIndex];
}

// function to initialize the game play display it will render underscores for each letter in the word. This function accepts a string as a parameter.
function initializeDisplay(word) {
  // this will render the underscores for each letter in the word.
  // create a display string with underscores for each letter in the word
  //  return the display string
  return "_".repeat(word.length);
}

//function to update the display that the user can see
function updateDisplay(display, word, guessedLetter) {
  //replace the underscores in the display with the correct guessed letter if it is in the word.

  let updatedDisplay = "";
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guessedLetter) {
      updatedDisplay += guessedLetter;
    } else {
      updatedDisplay += display[i];
    }
  }
  return updatedDisplay;
}

//fuction to check if the guess is correct
function checkGuess(word, gussedLetter) {
  //CHeck if the word contains the gussed letter
  //Return true or false (Boolean)
  return word.includes(gussedLetter);
}

//function to update the remaining guesses
function updateGuesses(remainingGuesses, isCorrectGuess) {
  //Decrease remaining guesses if the guess is incorrect
  // Return the updated remaining guesses
  return isCorrectGuess ? remainingGuesses : remainingGuesses - 1;
}

//function to check if the game is over or not
function isGameOver(word, display, remainingGuesses) {
  //CHeck if the word is fully guessed or if remaing gusses are 0
  //Return  true or false
  return display === word || remainingGuesses === 0;
}

// Main game starting loop
function startGame() {
  let wins = 0;
  let losses = 0;

  while (true) {
    const word = getRandomWord();
    let display = initializeDisplay(word);
    let remainingGuesses = 6;
    let guessedLetters = [];

    while (!isGameOver(word, display, remainingGuesses)) {
      console.log(display);
      console.log(`Remaining guesses: ${remainingGuesses}`);
      const guessedLetter = prompt.question("Please guess a letter: ");

      if (guessedLetters.includes(guessedLetter)) {
        console.log("You have already guessed this letter. Try again.");
        continue;
      }

      guessedLetters.push(guessedLetter);

      const isCorrectGuess = checkGuess(word, guessedLetter);
      remainingGuesses = updateGuesses(remainingGuesses, isCorrectGuess);

      if (isCorrectGuess) {
        display = updateDisplay(display, word, guessedLetter);
      } else {
        console.log("Incorrect guess. Try again.");
      }
    }

    if (display === word) {
      console.log(`Congratulations! You guessed the word: ${word}`);
      wins++;
    } else {
      console.log(
        `Sorry, you ran out of attempts. The correct word was: ${word}`
      );
      losses++;
    }

    console.log(`Wins: ${wins}, Losses: ${losses}`);

    // Ask if the user wants to play again
    const playAgain = prompt.keyInYNStrict("Do you want to play again?");
    if (!playAgain) {
      console.log("Thanks for playing! Goodbye.");
      break;
    }
  }
}

// Start the game
startGame();
