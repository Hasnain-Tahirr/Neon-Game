// GAME AREA
const game = document.querySelector(".game");

// PLAYER
const player = document.getElementById("player");

// BUTTONS
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

// SCREENS
const gameOverScreen = document.getElementById("gameOver");
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");

// PLAYER POSITION
let playerLeft = game.clientWidth / 2 - 35;

// GAME STATUS
let gameRunning = false;

// BALL SPEED
let ballSpeed = 4;

// BALL SPAWN TIME
let spawnRate = 1000;

// PLAYER START POSITION
player.style.left = playerLeft + "px";



// START GAME
startBtn.addEventListener("click", () => {

  gameRunning = true;

  startScreen.style.display = "none";

  startBallLoop();

});



// LEFT BUTTON
leftBtn.addEventListener("click", () => {

  moveLeft();

});



// RIGHT BUTTON
rightBtn.addEventListener("click", () => {

  moveRight();

});



// MOVE LEFT FUNCTION
function moveLeft(){

  if(playerLeft > 0){

    playerLeft -= 35;

    player.style.left = playerLeft + "px";

  }

}



// MOVE RIGHT FUNCTION
function moveRight(){

  if(playerLeft < game.clientWidth - 70){

    playerLeft += 35;

    player.style.left = playerLeft + "px";

  }

}



// CREATE BALL
function createBall(){

  // STOP IF GAME OVER
  if(!gameRunning) return;

  // NEW BALL
  const ball = document.createElement("div");

  ball.classList.add("ball");

  // RANDOM POSITION
  let randomX = Math.floor(Math.random() * (game.clientWidth - 35));

  ball.style.left = randomX + "px";

  game.appendChild(ball);

  // BALL TOP
  let ballTop = -40;

  // BALL FALL
  const fall = setInterval(() => {

    // STOP IF GAME OVER
    if(!gameRunning){

      clearInterval(fall);

      return;

    }

    // MOVE BALL
    ballTop += ballSpeed;

    ball.style.top = ballTop + "px";



    // COLLISION CHECK
    const ballRect = ball.getBoundingClientRect();

    const playerRect = player.getBoundingClientRect();

    if(

      ballRect.bottom > playerRect.top &&
      ballRect.top < playerRect.bottom &&
      ballRect.right > playerRect.left &&
      ballRect.left < playerRect.right

    ){

      gameOver();

    }



    // REMOVE BALL
    if(ballTop > game.clientHeight){

      clearInterval(fall);

      ball.remove();

    }

  },20);

}



// BALL LOOP
let ballInterval;

function startBallLoop(){

  ballInterval = setInterval(createBall, spawnRate);

}



// DIFFICULTY AFTER 1 MINUTE
setTimeout(() => {

  ballSpeed = 6;

  spawnRate = 700;

  clearInterval(ballInterval);

  startBallLoop();

},60000);



// DIFFICULTY AFTER 2 MINUTES
setTimeout(() => {

  ballSpeed = 8;

  spawnRate = 450;

  clearInterval(ballInterval);

  startBallLoop();

},120000);



// GAME OVER
function gameOver(){

  gameRunning = false;

  gameOverScreen.style.display = "flex";

  clearInterval(ballInterval);

}



// RESTART GAME
function restartGame(){

  location.reload();

};

// KEYBOARD CONTROLS
document.addEventListener("keydown",(e) => {

  // LEFT KEY
  if(e.key === "ArrowLeft"){

    moveLeft();

  }

  // RIGHT KEY
  if(e.key === "ArrowRight"){

    moveRight();

  }

});