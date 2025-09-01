 // --- Variables ---
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

// --- Play sound ---
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

// --- Flash button ---
function flashButton(name) {
    $("#" + name).fadeOut(100).fadeIn(100);
}

// --- Animate button press ---
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// --- Generate next sequence ---
function nextSequence() {
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    flashButton(randomChosenColour);
    playSound(randomChosenColour);

    console.log("Game pattern:", gamePattern);
}

// --- Check user answer ---
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Correct!");

        // If user finished sequence
        if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        // Reset game
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        gameStarted = false;
    }
}

// --- User clicks ---
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    flashButton(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

// --- Start game on keypress ---
$(document).keypress(function() {
    if (!gameStarted) {
        gameStarted = true;
        level = 0;
        $("h1").text("Level " + level);
        nextSequence();
    }
});
