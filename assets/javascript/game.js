
var guessText = document.getElementById("wordToGuess");
var numGuessesText = document.getElementById("numGuesses");
var lettersGuessedText = document.getElementById("letterGuesses");
var winsText = document.getElementById("wins");
var losesText = document.getElementById("loses");
var endText = document.getElementById("end");

//set variables
var words = ["banana", "blackberry", "pineapple", "raspberry",
    "mango", "tomato", "dragonberry", "passionfuit", "strawberry"];

var guessesLeft = 10;
var numWin = 0;
var numLose = 0;
var wordIndex = Math.floor((Math.random() * words.length));
var lettersGuessed = [];
var blanks = [];
var gameActive = true;

//funtion to call when starting a new game
var gameReset = function () {
    for (var i = 0; i < words[wordIndex].length; i++) {

        if (/^[a-z]/.test(words[wordIndex].charAt(i))) {
            blanks.push("_");
        }
        else {
            blanks.push(" ");
        }
        console.log(words[wordIndex]);
    }
    console.log(blanks.join("  "));
    console.log(blanks.length);
    guessText.textContent = blanks.join("  ");
    numGuessesText.textContent = "Number of guesses left: " + guessesLeft;
    lettersGuessedText.textContent = lettersGuessed.join(", ");
    winsText.textContent = "Wins: " + numWin;
    losesText.textContent = "Loses: " + numLose;
    endText.textContent = "";
    gameActive = true;
}

gameReset();


document.onkeyup = function (event) {
    var userGuess = event.key;
    
    //make sure key pressed is a letter and one char long
    if ((/^[a-z]/.test(userGuess)) && (userGuess.length == 1) && (gameActive === true)) {
        //check if word includes char guessed
        if (words[wordIndex].includes(userGuess)) {
            for (var i = 0; i < words[wordIndex].length; i++) {
                //replace letter guessed with blank in blanks array
                if (userGuess === words[wordIndex].charAt(i)) {
                    blanks.splice(i, 1, userGuess);
                    guessText.textContent = blanks.join("  ");
                }
            }
        }
        //if guess not in word
        else {
            //check if they have not already guessed that letter
            if (!(lettersGuessed.includes(userGuess))) {
                lettersGuessed.push(userGuess);
                guessesLeft--;
                numGuessesText.textContent = "Number of guesses left: " + guessesLeft;
                lettersGuessedText.textContent = lettersGuessed.join(", ");
            }
        }
        //winning code
        if ((words[wordIndex] == blanks.join("")) && (guessesLeft >= 0)) {
            endText.textContent = "Great Job! You win!"
            numWin++;
            gameActive = false;
            //reset variables
            wordIndex = Math.floor((Math.random() * words.length));
            blanks = [];
            lettersGuessed = [];
            guessesLeft = 10;
            setTimeout(gameReset, 2000);
        }
        //losing code
        if ((guessesLeft <= 0) && !(words[wordIndex] == blanks.join(""))) {
            endText.textContent = "You did not guess correctly. The fruit was " + words[wordIndex];
            numLose++;
            gameActive = false;
            //reset variables
            wordIndex = Math.floor((Math.random() * words.length));
            blanks = [];
            lettersGuessed = [];
            guessesLeft = 10;
            setTimeout(gameReset, 2000);
        }
    }
}

