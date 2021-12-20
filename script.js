var pongBall;

var myGameArea;

let canvasWidth = document.body.clientWidth;
let canvasHeight = window.innerHeight;
let pongBallWidth = 30;
let pongBallHeight = 30;
let paddleHeight = 90;
let paddleWidth = 10;

function preGame() {
    title = new score(canvasWidth / 2 - 40, 40, 1);
    description = new score(canvasWidth / 2 + 40, 40, 2);
    onebox = new rectangle(2, canvasHeight, "white", canvasWidth / 2, 0, "line");
    twoBox = new rectangle(2, canvasHeight, "white", canvasWidth / 2, 0, "line");
    onebox = new text(canvasWidth / 2 + 40, 40, 2);
    twoBox = new text(canvasWidth / 2 + 40, 40, 2);
}

function loadGame() {
    pongBall = new rectangle(pongBallHeight, pongBallWidth, "white", canvasWidth / 2, canvasHeight / 2 - pongBallHeight / 2, "ball");
    paddle1 = new rectangle(paddleWidth, paddleHeight, "white", 10, canvasHeight / 2 - paddleHeight / 2, "paddle");
    paddle2 = new rectangle(paddleWidth, paddleHeight, "white", canvasWidth - 10 - paddleWidth, canvasHeight / 2 - paddleHeight / 2, "paddle");
    midLine = new rectangle(2, canvasHeight, "white", canvasWidth / 2, 0, "line");
    p1Score = new score(canvasWidth / 2 - 40, 40, 1);
    p2Score = new score(canvasWidth / 2 + 40, 40, 2);
    myGameArea.launch();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    launch : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        var canvasDiv = document.getElementById("canvasDiv");
        canvasDiv.appendChild(this.canvas);
        // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");            
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
        this.context.fillStyle = "white";
        this.context.font = "30px Consolas"
        this.context.fillText("Yeee", 100, 10);
    }
}

function rectangle(width, height, color, x, y, type) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;
    this.angularVelo = 0;
    if (type == "ball") {
        this.vx = -10;
    }
    this.update = function() {
        context = myGameArea.context;
        if (type == "ball") {
            // this.angle += Math.PI / 360;
            context.save();

            context.translate(this.x + pongBallWidth / 2, this.y + pongBallHeight / 2);
            context.rotate(this.angle)

            context.fillStyle = color;
            context.fillRect(this.width / -2, this.height / -2, this.width, this.height); 
            context.restore();

            this.vy = this.vy + Math.sign(this.vx) * (0.5 * this.angularVelo);
        } else {
            context.fillStyle = color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.vx;
        this.y += this.vy;
    }
    this.newAngle = function() {
        this.angle = this.angle + 3 * this.angularVelo;
    }
}

function score(x, y, player) {
    this.points = 0;
    this.x = x;
    this.y = y;
    this.player = player;
    this.goal = function() {
        this.points++;
    }
    this.update = function() {
        context = myGameArea.context;
        context.fillStyle = "white";
        context.font =  "30px Consolas";
        if (player == 1) {
            context.textAlign = "right";
            context.fillText(this.points.toString(), this.x, this.y);
        } else {
            context.textAlign = "left";
            context.fillText(this.points.toString(), this.x, this.y);
        }
    }
}

function text(text, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.show = function() {
        context = myGameArea.context;
        context.fillStyle = "white";
        context.font =  "30px Consolas";
        context.textAlign = "left";
        context.fillText(this.text, this.x, this.y);
    }
}

function moveUp() {
    myGamePiece.speedY -= 1;
}

// function moveUp() {
//     pongBall.x = pongBall.x + 10;
//     ctx.fillRect(this.x, this.y, this.width, this.height);

// }

function updateGameArea() {
    myGameArea.clear();
    paddle1.vx = 0;
    paddle1.vy = 0;

    paddle2.vx = 0;
    paddle2.vy = 0;

    if (myGameArea.keys && myGameArea.keys[39]) {paddle2.vx = 3; }
    if (myGameArea.keys && myGameArea.keys[37]) {paddle2.vx = -3; }
    if (myGameArea.keys && myGameArea.keys[38]) {paddle2.vy = -5; }
    if (myGameArea.keys && myGameArea.keys[40]) {paddle2.vy = 5; }

    if (myGameArea.keys && myGameArea.keys[65]) {paddle1.vx = -3; }
    if (myGameArea.keys && myGameArea.keys[68]) {paddle1.vx = 3; }
    if (myGameArea.keys && myGameArea.keys[87]) {paddle1.vy = -5; }
    if (myGameArea.keys && myGameArea.keys[83]) {paddle1.vy = 5; }

    if (pongBall.x + pongBallWidth > canvasWidth) {
        // myGameArea.stop();
        pongBall.vx = -pongBall.vx;
        p1Score.goal();
    } else if (pongBall.x < 0) {
        // myGameArea.stop();
        pongBall.vx = -pongBall.vx;
        p2Score.goal();
    } else if ((pongBall.x <= paddle1.x + paddle1.width) && (pongBall.x > paddle1.x - paddle1.width)) {
        let hitPaddle1 = false;
        if ((pongBall.y + pongBallHeight) > paddle1.y) {
            if ((pongBall.y + pongBallHeight / 2) < paddle1.y + paddleHeight / 3) {
                hitPaddle1 = true;
                pongBall.vy = pongBall.vy - 1;
            } else if ((pongBall.y + pongBallHeight / 2) < paddle1.y + 2 * paddleHeight / 3) {
                hitPaddle1 = true;
                pongBall.vy = pongBall.vy;
            } else if (pongBall.y < paddle1.y + paddleHeight) {
                hitPaddle1 = true;
                pongBall.vy = pongBall.vy + 1;
            }
        }
        if (hitPaddle1) {
            pongBall.vx = -pongBall.vx;
            paddle1.vx = -3;
            pongBall.angularVelo = pongBall.angularVelo - paddle1.vy * Math.PI / 360;
        }
    } else if ((pongBall.x + pongBallWidth >= paddle2.x) && (pongBall.x < paddle2.x + paddle2.width)) {
        let hitPaddle2 = false;
        if ((pongBall.y + pongBallHeight) > paddle2.y) {
            if ((pongBall.y + pongBallHeight / 2) < paddle2.y + paddleHeight / 3) {
                hitPaddle2 = true;
                pongBall.vy = pongBall.vy - 1;
            } else if ((pongBall.y + pongBallHeight / 2) < paddle2.y + 2 * paddleHeight / 3) {
                hitPaddle2 = true;
                pongBall.vy = pongBall.vy;
            } else if (pongBall.y < paddle2.y + paddleHeight) {
                hitPaddle2 = true;
                pongBall.vy = pongBall.vy + 1;
            }
        }
        if (hitPaddle2) {
            pongBall.vx = -pongBall.vx;
            paddle2.vx = 3;
            pongBall.angularVelo = pongBall.angularVelo + paddle2.vy * Math.PI / 360;
        }
    }

    if (pongBall.y < 0) {
        pongBall.vy = -pongBall.vy;
    } else if (pongBall.y + pongBallHeight > canvasHeight) {
        pongBall.vy = -pongBall.vy;
    }

    paddle2.vy = 2 * Math.sign((pongBall.y + pongBallHeight / 2) - (paddle2.y + paddleHeight / 2));

    pongBall.newAngle();
    pongBall.newPos();    
    pongBall.update();
    paddle1.newPos();
    paddle1.update();
    paddle2.newPos();
    paddle2.update();
    midLine.update();
    p1Score.update();
    p2Score.update();
}