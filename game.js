var buttonColors = ["red", "yellow", "green", "blue"];
var gamePattern = [];
var level = 0;
var userClickedPattern = [];
var firstKeyPress = false;
var gameOverFlag = false;

function newSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(75).fadeIn(75);
    playSound(randomChosenColor);
    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];
}

function playSound(name){
    new Audio("./sounds/"+name+'.mp3').play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

function gameOver(){
    gameOverFlag = true;
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    firstKeyPress = false;
    playSound('wrong');
    setTimeout(function(){
        $("body").removeClass("game-over"); 
    }, 200);

}

function checkAnswer(userClickedPattern){
    var Ok = true;
    for(var i=0;i<userClickedPattern.length;i++){
        if(userClickedPattern[i] != gamePattern[i]){
            gameOver();
            Ok = false;
        }
    }
    if(Ok && userClickedPattern.length == gamePattern.length){
        setTimeout(function(){
            newSequence();
        }, 1000);
    }
}

$(".btn").click(function(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    if(!gameOverFlag){
        console.log(userClickedPattern);
        console.log(gamePattern);
        checkAnswer(userClickedPattern);
    }
    else{
        gameOver();
    }
});

$(document).keypress(function(){
    if(!firstKeyPress){
        firstKeyPress=true;
        gameOverFlag = false;
        gamePattern = [];
        level = 0;
        setTimeout(function(){
            newSequence();
        }, 1000);
    }
});
