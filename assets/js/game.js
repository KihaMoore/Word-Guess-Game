var wins = 0;
var losses = 0;

var maxErrors = 9;

var wordDisplayLettersElement = document.getElementById("word-display-letters");
var guessedLettersElement = document.getElementById("guessed-letters");
var errorCountElement = document.getElementById("error-count");
var winCountElement = document.getElementById("win-count");
var lossCountElement = document.getElementById("loss-count");

var validGuesses = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var game = new SweetsGuess;

document.onkeyup = function (event) {
    var userGuess = event.key;

    if (!game.gameOver) {
        if (validGuesses.includes(userGuess) && !game.guessedLetters.includes(userGuess)) {
            game.checkGuess(userGuess);
        }
    } else {
        game = new SweetsGuess();
        game.updatePageData();
    }
}

function SweetsGuess() {
    this.wordList = [
        "pancake",
        "macaron",
        "tiramisu",
        "baklava",
        "fudge",
        "jelly",
        "mochi",
        "croissant",
        "waffle",
        "candy",
        "taffy",
        "cannoli",
        "chocolate",
        "crape",
        "souffle",
        "cookie",
        "crape",
        "pie",
        "icecream",
        "pudding",
    ]

    this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
    this.guessedLetters = [];
    this.errors = 0;
    this.visibleLetters = [];
    this.gameOver = false;

    for (var i = 0; i < this.word.length; i++) {
        this.visibleLetters[i] = (false);
    }
}


        SweetsGuess.prototype.checkGuess = function (char) {
        this.guessedLetters.push(char);
    
        var isInWord = false;
        for (var i = 0; i < this.word.length; i++) {
            if (this.word.charAt(i) === char) {
                isInWord = true;
                this.visibleLetters[i] = true;
            }
        }
        if (!isInWord) {
            this.errors++;
        }
    
        if (this.errors >= maxErrors) {
            losses++;
            this.gameOver = true;
        }
    
        if (!this.visibleLetters.includes(false)) {
            wins++;
            this.gameOver = true;
        }
    
        game.updatePageData();
    };


    SweetsGuess.prototype.updatePageData = function () {
     var tempString = "";
     for (var i = 0; i < this.visibleLetters.length; i++) {
         tempString += ((this.visibleLetters[i] || this.gameOver) ? this.word.charAt(i).toUpperCase() : "_");
         if (i < (this.visibleLetters.length - 1)) tempString += " ";
     }
     wordDisplayLettersElement.textContent = tempString;

     tempString = "";
     for (var i = 0; i < this.guessedLetters.length; i++) {
         tempString += (this.guessedLetters[i].toUpperCase());
         if (i < (this.guessedLetters.length - 1)) tempString += " ";
     }
     for (var i = tempString.length; i < 51; i++) {
         tempString += " ";
     }
     guessedLettersElement.textContent = tempString;

     tempString = this.errors + " / " + maxErrors;
     for (var i = tempString.length; i < 32; i++) {
         tempString += " ";
     }
     errorCountElement.textContent = tempString;

     tempString = wins + "";
     for (var i = tempString.length; i < 45; i++) {
         tempString += " ";
     }
     winCountElement.textContent = tempString;

     tempString = losses + "";
     for (var i = tempString.length; i < 43; i++) {
         tempString += " ";
     }
     lossCountElement.textContent = tempString;

    
    
}

game.updatePageData();

