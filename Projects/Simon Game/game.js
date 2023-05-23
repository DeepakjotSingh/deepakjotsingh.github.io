$(document).on("keydown",function (){
  if(!started){
    $("#" + "level-title").html("Level " + level);
    nextSequence();
    started = true;
  }
});

var started = false;

var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

function checkAnswer(currentLevel) {
 
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");

    $(document.body).addClass("game-over");
    $("#" + "level-title").html("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $(document.body).removeClass("game-over");
    },200);
  
      gameOver();
  
  }

}

function gameOver(){
  level = 0;
  gamePattern = [];
  started = false;
}


function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

$(".btn").on("click",function (){
  var userChosenColour = (this.id);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}