let inputDir = { x: 0, y: 0 };
// const foodsound = new Audio("food.mp3");
// const gameoversound = new Audio("gameover.mp3");
// const movesound = new Audio("move.mp3");
const musicsound = new Audio("music.mp3");
let speed = 20;
let score=0;
let lastpaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastpaintTime = ctime;
    gameEngine();
}
function isCollide(snake){
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
      if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
          return true;
      } 
    }
    if(snake[0].x>=18||snake[0].x<=0 || snake[0].y>=18||snake[0].y<=0){
        return true;
    }
}
function gameEngine() {
    //updating snake array and food
    if(isCollide(snakeArr)){
        //gameoversound.play();
        //musicsound.pause();
        inputDir= { x: 0, y: 0 };
        swal("Game Over!", "Press 'Enter' to Play Again", "info");
        snakeArr = [{ x: 13, y: 15 }];
        musicsound.play();
        score=0;

    }
    //if you have eaten the food , increment the food and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x===food.x){
        musicsound.play();
     //foodsound.play();
        score+=1;
     scorebox.innerHTML="Score:"+ score;
     snakeArr.unshift({x : snakeArr[0].x+inputDir.x , y:snakeArr[0].y+inputDir.y});
     let a=2;
     let b=16;
     food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
    }
    //moving the snake
    for (let i = snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]={...snakeArr[i]}     
    }
    snakeArr[0].x+=inputDir.x
    snakeArr[0].y+=inputDir.y

    //display Snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // snakeElement.classList.add("snake");
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    //displaying the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

}
//main logic
// movesound.play();
window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    inputDir={x:0,y:1}
    switch (e.key) {
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDowm":
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
})
