//VARIABLES
var words = ["messi", "ronaldo", "neymar", "suarez", "hazard", "kane", "modric"]

//Empty variables to store values later
var randomWord = "";
var lettersOfWord = []
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];

//Counter Variables
var wins = 0;
var losses = 0;
var guessesRemaining = 9;



// ALL FUNCTIONS



//__________________________________________________________
//GAME START FUNCTION
//__________________________________________________________
function Game() {
    //computer generates random word from words array
    randomWord = words[Math.floor(Math.random() * words.length)];

    // split the individual word into separate arrays, and store in new array 
    lettersOfWord = randomWord.split("");

    //store length of word in blanks, for later use
    blanks = lettersOfWord.length;

    //creating a loop to generate "_" for each letter in array stored in blanks
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push("_");
    }

    //showing the "_" within HTML
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join("  ");

    //console logging 
    console.log(randomWord);
    console.log(lettersOfWord)
    console.log(blanks)
    console.log(blanksAndCorrect)
}


//__________________________________________________________
//AUDIO FUNCTION
//__________________________________________________________

//variables for audio function
var messi = document.getElementById("messi");
var ronaldo = document.getElementById("ronaldo");
var neymar = document.getElementById("neymar");
var suarez = document.getElementById("suarez");
var hazard = document.getElementById("hazard");
var kane = document.getElementById("kane");
var modric = document.getElementById("modric");


function audio() {
    //Messi Audio & Image
    
    if (randomWord === words[0]) {
        messi.play();
        document.getElementById("image").src = "./assets/images/messi.gif";
    }
    //Ronaldo Audio & Image
    
    else if (randomWord === words[1]) {
        kane.pause();
        modric.pause();
        suarez.pause();
        neymar.pause();
        messi.pause();
        hazard.pause();
        ronaldo.play();
        document.getElementById("image").src = "./assets/images/ronaldo.gif";
    }
    //Neymar Audio & Image
    
    else if (randomWord === words[2]) {
        kane.pause();
        suarez.pause();
        ronaldo.pause();
        modric.pause();
        messi.pause();
        hazard.pause();
        neymar.play();
        document.getElementById("image").src = "./assets/images/neymar.gif";
    }
    //Suarez Audio & Image
    
    else if (randomWord === words[3]) {
        ronaldo.pause();
        modric.pause();
        messi.pause();
        neymar.pause();
        kane.pause();
        hazard.pause();
        suarez.play();
        document.getElementById("image").src = "./assets/images/suarez.gif";
    }
    //Hazard Audio & Image
    //---------------------------
    else if (randomWord === words[4]) {
        ronaldo.pause();
        modric.pause();
        messi.pause();
        neymar.pause();
        kane.pause();
        suarez.pause();
        hazard.play();
        document.getElementById("image").src = "./assets/images/hazard.gif";
    }
    //Kane Audio & Image
    //---------------------------
    else if (randomWord === words[5]) {
        ronaldo.pause();
        modric.pause();
        messi.pause();
        neymar.pause();
        suarez.pause();
        hazard.pause();
        kane.play();
        document.getElementById("image").src = "./assets/images/kane.gif";
    }
    //Modric Audio & Image
    //---------------------------
    else if (randomWord === words[6]) {
        ronaldo.pause();
        kane.pause();
        messi.pause();
        neymar.pause();
        suarez.pause();
        hazard.pause();
        modric.play();
        document.getElementById("image").src = "./assets/images/modric.gif";
    }
};

//__________________________________________________________
//RESET FUNCTION
//__________________________________________________________
function reset() {
    guessesRemaining = 9;
    wrongGuess = [];
    blanksAndCorrect = [];
    Game()
}

//__________________________________________________________
//CHECK LETTERS/COMPARE FUNCTION
//__________________________________________________________

//If/Else, to see if letter selected matches random word
function checkLetters(letter) {
    var letterInWord = false;
    //if the generated randomword is equal to the letter entered... then variable is true
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }
    //if letterInWord (false)
    if (letterInWord) {
        //check each letter to see if it matches word
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
            }
        }
    }
    //otherwise, push the incorrect guess in the wrong guesses section, and reduce remaining guesses
    else {
        wrongGuess.push(letter);
        guessesRemaining--;
    }
    console.log(blanksAndCorrect);
}

//__________________________________________________________
//FINAL COMPLETE FUNCTION
//__________________________________________________________

//check to see if player won...
function complete() {
    console.log("wins:" + wins + "| losses:" + losses + "| guesses left:" + guessesRemaining)

    //if WON...then alert, play audio, display image and reset new round
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {
        wins++;
        audio()
        reset()
        //display wins on screen
        document.getElementById("winstracker").innerHTML = " " + wins;

        //if LOST...then alert and reset new round
    } else if (guessesRemaining === 0) {
        losses++;
        reset()
        document.getElementById("image").src = "./assets/images/tryagain-red.gif"
        document.getElementById("losstracker").innerHTML = " " + losses;
    }
    //display losses on screen && guesses remaining countdown
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//_____________________________________________________
// EXECUTE CODE 
//_____________________________________________________

//call start game function
Game()

//check for keyup, and convert to lowercase then store in guesses
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    //check to see if guess entered matches value of random word
    checkLetters(guesses);
    //process wins/loss 
    complete();
    //store player guess in console for reference 
    console.log(guesses);

    //display/store incorrect letters on screen
    document.getElementById("playerguesses").innerHTML = "  " + wrongGuess.join(" ");
}