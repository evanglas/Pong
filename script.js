var pongBall;

function loadGame() {
    myGameArea.launch();
    pongBall = new rectangle(30, 30, "red", 20, 120);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    launch : function() {
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

function rectangle(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

function moveUp() {
    pongBall.x = pongBall.x + 10;
    ctx.fillRect(this.x, this.y, this.width, this.height);

}

function updateGameArea() {
    
}