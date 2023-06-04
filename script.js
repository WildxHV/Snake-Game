let inputDir = { x: 0, y: 0 };
let lastPrintTime = 0;
let speed = 7;
let score = 0;
let snakeArr = [
    { x: 9, y: 9 }
]
food = { x: 15, y: 13 }

function main(currentTime) {
    window.requestAnimationFrame(main);
    if ((currentTime - lastPrintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPrintTime = currentTime;
    game();

}

function collide(snakeArr) {

    // If the snake collide in the wall
    if (snakeArr[0].x <=0 || snakeArr[0].x >18 || snakeArr[0].y <=0 || snakeArr[0].y >18) {
        return true;
    }

    // If  the snake collide in itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            return true;
        }

    }
    return false;

}

function game() {

    // If snake collide to wall or itself
    if (collide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        snakeArr = [
            { x: 9, y: 9 }
        ]
        alert("Game Over, Press any key to restart")
        score = 0;
    }


    // Eating the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        console.log(score)
        scoreBox.innerHTML = "Score:" + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });

        let a = 1;
        let b = 18;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        for (let i = 0; i < snakeArr.length; i++) {
            if (food.x === snakeArr[i].x && food.y === snakeArr[i].y) {
                food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };

            }
        }
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Renderring the snake
    board = document.getElementById('board');
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });


    // Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}


window.addEventListener('keydown', e => {
 // Start the game
 scoreBox.innerHTML = "Score:" + score;
    switch (e.key) {
        case "ArrowUp":
            if (inputDir.y === 1) {
            }
            else {
                inputDir.x = 0;
                inputDir.y = -1;
            }
            break;

        case "ArrowDown":
            if (inputDir.y === -1) {
            
            }
            else {
                inputDir.x = 0;
                inputDir.y = 1;
            }
            break;

        case "ArrowLeft":
            if (inputDir.x === 1) {
                
            }
            else {
                inputDir.x = -1;
                inputDir.y = 0;
            }
            break;

        case "ArrowRight":
            if (inputDir.x === -1 ) { 
               
            }
            else{
            inputDir.x = 1;
            inputDir.y = 0;
            }
            break;
        default:
            break;
    }

});