var pongBall;

var myGameArea;

function loadGame() {
    pongBall = new rectangle(30, 30, "red", 20, 120);
    myGameArea.launch();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    launch : function() {
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function rectangle(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.vx;
        this.y += this.vy;
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
    pongBall.x += 1;
    pongBall.update();
}