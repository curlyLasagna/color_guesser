/*********************TODO********************** */
/* Adding a side chat the responds to your answers
/* PauseChamp ... when taking time
/* Add twitch emotes 
/*********************************************** */
var 
    // Variables
    square_count = 6,
    colors = [];
    gameWon = false,
    // The correct answer 
    color_answer = "",

    chatBad = [
        "So bad",
        "Pepega Clap",
        "Pepelaugh he doesn't know",
        "??????????????????????",
        "Pepehands not pretending",
        "FeelsDankMan click"
    ],

    chatGood = [
        "PogU GAMING WARLORD",
        "DOUBTING THE COLOR CHIEFTAIN",
        "5head Indubitably",
        "FeelsStrongMan I BELIEVED",
    ],


    /** DOM selection **/
    squares = document.querySelectorAll(".square"),
    color_display = document.getElementById("color_display"),
    result_display = document.querySelector("#result"),
    h1 = document.querySelector("h1"),
    reset_button = document.querySelector("#reset_game"),
    mode_btn = document.querySelectorAll(".mode");

/** DOM manipulation **/
color_display.textContent = color_answer;

reset_button.addEventListener("click", function() {
    this.textContent = "New colors";
    resetGame();
});

init();

function setModes() {
    // Sets the event listeners for the difficulty buttons
    for(var x = 0; x < mode_btn.length; x++) {
        mode_btn[x].addEventListener("click", function(){
            /* If colors has an element.
            *  Since colors was set to only have 3 colors,
            *  only 3 squares will show
            */
            mode_btn[0].classList.remove("selected");
            mode_btn[1].classList.remove("selected");
            this.classList.add("selected");

            this.textContent === "easy" 
            ? square_count = 3 
            : square_count = 6
            resetGame();
        }) 
    }
}

function setSquares() {
    for(var x = 0; x < squares.length; x++) {
        // Sets an event listener for each square
        squares[x].addEventListener("click", function() {
            var clicked_color = this.style.background;
            if(clicked_color === color_answer){
                gameWon = true;
                result_display.textContent = chatGood[randomNum(0,chatGood.length)];
                matchColors(clicked_color)
                h1.style.background = color_answer;
                reset_button.textContent = "Play again?"
            }
            else {
                this.style.background = "#232323";
                result_display.textContent = chatBad[randomNum(0, chatBad.length)];
            }
        })
    }
    resetGame();
}

function init() {
    setSquares();
    setModes();
}

/**************************** Functions**********************************/
function randomNum(min, max){
    return Math.floor(Math.random() * max - min) + min;
}

function matchColors(color) {
// Change all squares to the color of the correct answer when picked
    for(var x = 0; x < squares.length; x++)
        squares[x].style.background = color;
}

function randomColor(color_count) {
// Returns an array of colors in a string from 
// generateRandomColor
    var arr = [] 
    for(var x = 0; x < color_count; x++)
        arr.push(generateRandomColor());
    return arr;
}

function generateRandomColor() {
// Returns a string composing of rgb values
    var 
        red = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")"; 
}

function resetGame() {
    colors = randomColor(square_count);
    h1.style.background = "steelblue";
    color_answer = colors[randomNum(0, colors.length)];
    color_display.textContent = color_answer;
    result_display.textContent = "";
    for(var x = 0; x < squares.length; x++) {
        if(colors[x]) {
            squares[x].style.background = colors[x];
            squares[x].style.display = "block";
        }
        else   
            squares[x].style.display = "none";
    }
}