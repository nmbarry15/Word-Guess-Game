
var guessText = document.getElementById("wordToGuess");
var numGuessesText = document.getElementById("numGuesses");
var lettersGuessedText = document.getElementById("letterGuesses");
var winsText = document.getElementById("wins");
var losesText = document.getElementById("loses");
var endText = document.getElementById("end");

var words = ["rocky road", "vanilla", "chocolate chip", "cotton candy",
    "moose tracks", "fudge swirl", "superhero", "chocolate", "strawberry"];

var guessesLeft = 15;
var numWin = 0;
var numLose = 0;
var wordIndex = Math.floor((Math.random() * words.length));
var lettersGuessed = [];
var blanks = [];

var printBlanks = function () {
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
}

printBlanks();


document.onkeyup = function (event) {
    var userGuess = event.key;

    if ((/^[a-z]/.test(userGuess)) && (userGuess.length == 1)) {
        if (words[wordIndex].includes(userGuess)) {
            console.log(userGuess + " yes")
            for (var i = 0; i < words[wordIndex].length; i++) {
                if (userGuess === words[wordIndex].charAt(i)) {
                    blanks.splice(i, 1, userGuess);
                    console.log(blanks);
                    guessText.textContent = blanks.join("  ");
                }
            }
        }
        else {
            console.log(userGuess + " no")
            if (!(lettersGuessed.includes(userGuess))) {
                lettersGuessed.push(userGuess);
                console.log(lettersGuessed.join(", "));
                guessesLeft--;
                numGuessesText.textContent = "Number of guesses left: " + guessesLeft;
                lettersGuessedText.textContent = lettersGuessed.join(", ");
            }
        }
        if ((words[wordIndex] == blanks.join("")) && (guessesLeft >= 0)) {
            numWin++;
            wordIndex = Math.floor((Math.random() * words.length));
            blanks = [];
            lettersGuessed = [];
            guessesLeft = 15;
            printBlanks();
        }

        if ((guessesLeft < 0) && !(words[wordIndex] == blanks.join(""))) {
            numLose++;
            wordIndex = Math.floor((Math.random() * words.length));
            blanks = [];
            lettersGuessed = [];
            guessesLeft = 15;
            printBlanks();
        }
    }
}
