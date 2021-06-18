const canvas = document.getElementsByTagName("canvas")[0];
function getOS() {
    let userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}
let os = getOS();
function fade(id) {
    $(id).fadeOut(4000)
}
function welcome(){
    $("#0").fadeIn(2000);
    setTimeout(fade("#0"), 7000);
}

function welcome1(){
    if (os == "android" || os == "iOS"){
        $("#2").fadeIn(2000);
        setTimeout(fade("#3"), 12000);
    }else{
        $("#1").fadeIn(2000);
        setTimeout(fade("#1"), 12000);
    }
}

function welcome2(){
    $("#3").fadeIn(2000);
    setTimeout(fade("#3"), 7000);
}

function welcome3(){
    $("#4").fadeIn(2000);
    setTimeout(fade("#4"), 7000);
}

function gameBefore(){
    document.getElementsByTagName("video")[0].style.display="none";
    document.getElementsByTagName("html")[0].style.background="white";
}

window.onload = function(){
    setTimeout(welcome, 3000);
    setTimeout(welcome1, 9000);
    setTimeout(welcome2, 15000);
    setTimeout(welcome3, 21000);
    setTimeout(gameBefore, 27000);
    // setTimeout($("#1").fadeIn(2000), 8000);
    setTimeout(startGame, 27000);
};
function none(){

}

document.addEventListener('keyup', (event) => {
    const code = event.code;
    if (code === "ArrowUp" || code === "Space") {
        accelerate(0.02)
    }
}, false);
document.addEventListener('keydown', (event) => {
    const code = event.code;
    if (code === "ArrowUp" || code === "Space") {
        accelerate(-0.2);
    }
}, false);

let myGamePiece;
let myBackground;
const myObstacles = [];
let myScore;

const myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        updateGameArea();
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function startGame() {

    myGamePiece = new component(30, 30, "../img/flappy.gif", 10, 120, "image");
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Calibri", "black", 280, 40, "text");
    myBackground = new component(656, 270, "../img/background.png", 0, 0, "background");
    myGameArea.start();
}


function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = "img/flappy.gif";
    }
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        }
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    if (!myGameArea.interval) {myGameArea.interval = setInterval(updateGameArea, 20);}

    myGamePiece.gravity = n;
}