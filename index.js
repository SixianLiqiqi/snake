// 点击start -> startPage消失 -> 游戏开始
// 随机出现食物，出现三节蛇，开始运动
// 上下左右 -> 改变方向运动
// 判断是否吃到食物 -> 食物消失 -> 蛇自身长度加一
// 判断游戏结束 -> 弹出loser框

var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var scoreBox = document.getElementById('score');
var loserScore = document.getElementById('loserScore');
var startBtn = document.getElementById('startBtn');
var close = document.getElementById('close');
var loser = document.getElementById('loser');
var startAndPauseBtn = document.getElementById('startAndPauseBtn');
var startPage = document.getElementById('startPage');
var startGameFlag = true;
// 是否可以开始游戏
var startPauseFlag = true;
// 游戏未暂停

var snakeMove;
var speed = 200;


init();
function init() {
    this.score = 0;
    // 初始化全局init属性
    // 地图
    this.mapWidth = parseInt(getComputedStyle(content).width);
    this.mapHeight = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
    // getComputedStyle是一个可以获取当前元素所有最终使用的CSS属性值.

    // 食物
    this.foodWidth = 20;
    this.foodHeight = 20;
    this.foodX = 0;
    this.foodY = 0;
    // 蛇
    this.snakeWidth = 20;
    this.snakeHeight = 20;
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
    // 每次改变snakeBody的每个值，让后一个继承前一个的位置即可。
    // 把前一条蛇删除掉（remove class），立即创建一条新蛇（function snake （） {}）

    // 游戏属性
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;

    bindEvent();

}
function startGame() {

    startPage.style.display = 'none';
    startAndPauseBtn.style.display = 'block';
    food();
    snake();
}

function food() {
    var food = document.createElement('div');
    food.style.width = this.foodWidth + 'px';
    food.style.height = this.foodHeight + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapWidth / 20));
    this.foodY = Math.floor(Math.random() * (this.mapHeight / 20));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food');
}

function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeWidth + 'px';
        snake.style.height = this.snakeHeight + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        switch (this.direct) {
            case 'right':
                break;
            case 'up':
                snake.style.transform = 'rotateZ(270deg)';
                break;
            case 'left':
                snake.style.transform = 'rotateZ(180deg)';
                break;
            case 'down':
                snake.style.transform = 'rotateZ(90deg)';
                break;
            default:
                break;
        }
        // 改变蛇头方向
    };
}

function move() {

    for (var i = snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch (this.direct) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }
    removeClass('snake');
    snake();

    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        // 处理蛇身体
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch (this.direct) {
            case 'right':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'up':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
            case 'left':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'down':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            default:
                break;
        }

        // 处理食物
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();
    }

    if (this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapWidth / 20) {
        // console.log(111);
        reloadGame();
    }
    if (this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapHeight / 20) {
        // console.log(111);
        reloadGame();
    }
    var snakeHeadX = this.snakeBody[0][0];
    var snakeHeadY = this.snakeBody[0][1];
    for(var i = 1; i < snakeBody.length; i++) {
        if(snakeHeadX == snakeBody[i][0] && snakeHeadY == snakeBody[i][1]) {
            reloadGame();
        }
    }
}

function reloadGame () {
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    food();
    this.snakeBody = [[3, 1, 'head'], [2, 1, 'body'], [1, 1, 'body']];
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    loser.style.display = 'block'; 
    loserScore.innerHTML = this.score;   
    this.score = 0;
    scoreBox.innerHTML = this.score;
    var startGameFlag = true;
    // 是否可以开始游戏
    var startPauseFlag = true;
    // 游戏未暂停
    startAndPauseBtn.setAttribute('src', './img/pause.png');
}

function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

function setDirect(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;
    }
}

function  bindEvent () {

    close.onclick = function () {
        loser.style.display = 'none';
        startPauseFlag = true;
    }
    startBtn.onclick = function () {  
        // 控制游戏一切的开始
        startAndPause();
    }
    startAndPauseBtn.onclick = function () {
        startAndPause();

    }
}

function startAndPause () {
    if(startPauseFlag) {
        if(startGameFlag) {
            startGame();
            startGameFlag = false;
        }
        startAndPauseBtn.setAttribute('src', './img/go.png');
        document.onkeydown = function (e) {
            var code = e.keyCode;
            // 37、38、39、40
            setDirect(code);
        }
        snakeMove = setInterval(function () {
            move();
        }, speed);
        startPauseFlag = false;
    } else{
        startAndPauseBtn.setAttribute('src', './img/pause.png');
        clearInterval(snakeMove);
        document.onkeydown = function (e) {
            // 取消事件
            e.returnValue = false;
            return false;
        }
        startPauseFlag = true;
    }
}