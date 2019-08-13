//Initialize stuff
var buttonColor = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//Press anything to Start
function start(){
  $(document).on("keydown", function(){
    if(!started){
      nextSequence();
      started = true;
    }
  });
}

//User chosen color on click
//Chooses div with btn class
//this indicates the chosen btn, gets the id attr

$("div.btn").on("click", function(){
  //Gets chosen color and pushes to user array
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //Flashes the button and plays sound
  animatePress(userChosenColor);
  //$("#" + userChosenColor).fadeOut(100).fadeIn(100);
  playSound(userChosenColor);
  //Checks the answer
  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    startOver();
  }
}

function nextSequence(){
  //Empties array to start
  userClickedPattern = [];
  //generates random number
  var randomNumber = Math.floor(Math.random() * 4);
  //generates random color
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);
  //Flashes the button and plays sound
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  //Increases level
  level++;
  $("#level-title").text("Level " + level);
}

//Plays sound upon click
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Flashes upon click
function animatePress(currentColor){
  //Adds class to div class = btn
  $("div.btn." + currentColor).addClass("pressed");
  //Waits 0.01 sec then calls callback function which removes the class
  setTimeout(function(){
    $("div.btn." + currentColor).removeClass("pressed");
  },100);
}

function startOver(){
  //Plays wrong sound, flashes wrong background, restarts the game
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  //resets all arrays and recall start()
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
  start();
}

start();
