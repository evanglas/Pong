var pongBall;

var myGameArea;

let canvasWidth = 600;
let canvasHeight = 400;
let pongBallWidth = 50;
let pongBallHeight = 50;
let paddleHeight = 90;
let paddleWidth = 10;

function loadGame() {
    pongBall = new rectangle(pongBallHeight, pongBallWidth, "red", 300, 120, "ball");
    paddle1 = new rectangle(paddleWidth, paddleHeight, "black", 10, 100, "paddle");
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
        this.vx = -3;
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
        this.angle = this.angle + this.angularVelo;
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
    if (myGameArea.keys && myGameArea.keys[37]) {pongBall.vx = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {pongBall.vx = 1; }


    if (myGameArea.keys && myGameArea.keys[38]) {paddle1.vy = -5; }
    if (myGameArea.keys && myGameArea.keys[40]) {paddle1.vy = 5; }

    if (pongBall.x < 20) {
        let hitPaddle1 = false;
        if ((pongBall.y + pongBallHeight) > paddle1.y) {
            if ((pongBall.y + pongBallHeight / 2) < paddle1.y + paddleHeight / 3) {
                hitPaddle1 = true;
                pongBall.vy = -1;
            } else if ((pongBall.y + pongBallHeight / 2) < paddle1.y + 2 * paddleHeight / 3) {
                hitPaddle1 = true;
                pongBall.vy = 0;
            } else if (pongBall.y < paddle1.y + paddleHeight) {
                hitPaddle1 = true;
                pongBall.vy = 1;
            }
        }
        if (hitPaddle1) {
            pongBall.vx = -pongBall.vx;
            pongBall.angularVelo = pongBall.angularVelo - paddle1.vy * Math.PI / 360;
        }
    } else if (pongBall.x + pongBallWidth > canvasWidth) {
        pongBall.vx = -pongBall.vx;
    }

    if (pongBall.y < 0) {
        pongBall.vy = -pongBall.vy;
    } else if (pongBall.y + pongBallHeight > canvasHeight) {
        pongBall.vy = -pongBall.vy;
    }

    pongBall.newAngle();
    pongBall.newPos();    
    pongBall.update();
    paddle1.newPos();
    paddle1.update();
}