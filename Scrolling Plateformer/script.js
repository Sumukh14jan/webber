/*
Version 0.1.b updates:
Fixed winning text not rendering at the correct coordinates and at the right size.
Fixed health text not scaling with the canvas
Added a restart button if you get stuck. Press "r".
Started Lag Prevention mode, which will be polished up later on. Press "l".

Version 0.1.0 updates:
Added spikes!
Finished Lag Prevention mode, will still keep working on it in the future versions.

TODO:
Add more levels
Fix lag even further
Finish polishing up spikes
Fix bug where landing on 2 monsters simultaneously makes you lose 2 health
Add different themes ("t" to toggle)

Rewrite the checkCollision code to make things more clean. Add methods to arrays instead of using messy loops every time

Started February 19
First Release February 21

Some ideas:
2. Give the player a certain amount of blocks, let them place it in a grid and then start the level with their block positions. This will probably be hard to program.
3. Add powerups that have a huge weight in the game. Should be combined with #2. Some effects are faster movement, higher jumps, the ability to do an "air jump", double jumps, and maybe even some crazy ones like being able to teleport 40px in front of you by pressing a key, choosing your position with the mouse (in a 60px radius of your current position).
4. TBD
*/
window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000000;
//Player object for current level is
function setup() {
  //16:10 = MASTERRACE
  //if the user's screen has more width for 16:10 than height, put bars on the side, otherwise put it at the top
  if (windowWidth * 5 / 8 > windowHeight) {
    createCanvas(windowHeight * 8 / 5, windowHeight);
  } else {
    createCanvas(windowWidth, windowWidth * 5 / 8);
  }
  textAlign(CENTER, CENTER);
  background(250);
  //don't change, it does nothing. Couldn't get this to work so I quit;
  var playerColor = color(255, 0, 0);


  frameRate(60);
  framesSinceStart = frameCount;
}


//I might make a fork that uses nested arrays to make a grid instead of this
//stores all the data in a level
/*
Key:
G = Ground/Normal Platform
Q = Portal
Z = Player spawn position
X = Lava
T = Cannon
@ = Monster
^ = Spike
_ = Jumper spring
*/
var levelData = [

  [
    "               ",
    "               G",
    "  Z            Q",
    "GGGGGGGGGGGGGGGG",
    30],
    [
        "                Q",
        "               G",
        "  Z            ",
        "GGGGGGXXXXXXGGXXXXX",
        30],
    [
        "                   G   Q @    G",
        "                        GG^G",
        "",
        "",
        "",
        "                             G",
        "                    T",
        "            G",
        "  Z    G     ",
        "GGG",
        "",
        "          G@             __         G",
        "                 GGGGXXXGGG",
        30],
    [
        "              Q",
        "               G",
        " Z        G       ",
        "GGG   ",
        30],
    [
        "              G   GGGG",
        "",
        "            G",
        "",
        "          G",
        "",
        "Z       G",
        "GGGGGGGGXXXXXXXXXXXXXXX",
        "        GGGGGGGGGGGGGG^^^  @@@                  G",
        "                       GGGGGXXG  GXXG  GXXG  GXXG",
        "                           GXXG  GXXG  GXXG  GXXG",
        "                           GXXG  GXXG  GXXG  GXXG",
        "                           GXXG  GXXG  GXXG  GXXG",
        "                           GXXG  GXXG  GXXG  GXXG",
        "                           GXXG  GXXG  GXXG  GXXG",
        "                           GGGG  GGGG^^GGGG^^GGGG",
        "                               GG    GG    GG",
        "",
        "",
        "",
        "                       GGG",
        "                       GQG    GG   GG@@@@@@@@@@@@@@@@             G",
        "                       G                           G   GG",
        "                       GGGGG",
        "                                                     ^",
        30],
    [
    "Z                  ",
    "GGGGGGGGGGGGGGGGGGG",
    "                   ",
    "        ^           ",
    " ^GXXGGXGGXXXGXXGXXG",
    " XXXXXXXXXXXXXXXXXXX",
    " XXXXXXXXXXXXXXXXXXX",
    " XXXXXXXXXXXXXXXXXXX",
    " GGGGXXXGGGGGGGGGGGG",
    "  @GXXXX    @      Q",
    "   GXXXX @    @    G",
    "   G             ^GG",
    "                 GGG",
    "               ^GGGG",
    "G  G           GGGGG",
    "^^^^^___     ^GGGGGG",
    "GGGGGGGGGGGGGGGGGGGG",
    30],

  [
    "GGGGGGGGGGGGGGGGGGGGGGG",
    "G                   TTG",
    "G                     G",
    "G                     G",
    "          GGG         G",
    "Q                     G",
    "G    GG               G",
    "G                GGGGGG",
    "G                     G",
    "G                     G",
    "G                     G",
    "GT          G         G",
    "G                     G",
    "GT      G       G     G",
    "G                     G",
    "GT          XXXXXXXXXXG",
    "G                @@@  G",
    "GT                    G",
    "G                     G",
    "G           GGGGGGGGGGG",
    "G                     G",
    "GG         G          G",
    "GZ                    G",
    "GGGGGGGGGGGGGGGGGGGGGGG",
    30],


  [
    "       Q           ",
    "       G           ",
    "           TTT     ",
    "            G      ",
    "                   ",
    "                 TTT ",
    "                  G  ",
    "                   ",
    "            TTT      ",
    "             G       ",
    "                   ",
    "        TTT        ",
    "         G         ",
    "                   ",
    "       Z           ",
    "GGGGGGGGGGGGGGGGGGG",
    30],

  [
    "GGGGGGGGGGGGGGGGGGGGGG",
    "GZ@@@@@@@@@@@@@@@@@@@G",
    "GGGGGGG GGGGGGGGGGG  Q",
    "G                    G",
    "G                    G",
    "G                    G",
    "G                    G",
    "G     @@@@           G",
    "G                    G",
    "G   @@ @@ @@@  @   @_G",
    "                    G ",
    "G  @ @ @ @ @ @       G",
    "                     G",
    "                     G",
    "G @@ @G@ @ @   @  @ G ",
    30],

  [
    "GGGGGGGGGGGGGGGGGGGGGG",
    "GQ                   G",
    "G G G G G G GG  G G G",
    "GTT                T G",
    "G                    G",
    "G                    G",
    "G      ^     GG      G",
    "G                    G",
    "G                    G",
    "G     @@@@           G",
    "G                    G",
    "G                    G",
    "G   @@ @@ @@@  @   @ G",
    "G       __           G",
    "G                    G",
    "G                    G",
    "G  G     @T          G",
    "G                    G",
    "G                    G",
    "G                   ZG",
    "GGGGGGGGGGGGGGGGGGGGGG",
    30],

  [
    "                                 TT T T           ",
    "                                                  ",
    "                GGGGGGGGGGGGGGGGG            G    ",
    "                G                     T     G     ",
    "        T   GGG G                    T T   G      ",
    "        T   G   G                         G       ",
    "        T   G   G              GGGGGGGGGGG        ",
    "        T   G   G             G                   ",
    "            G   GGG   G      G              ^T    ",
    "     G     _G   GX_   G     G T      T            ",
    "     G     GG   GGG   G    G                      ",
    "     G     GX   G^_   G   G                 _     ",
    "     G GGGGGG   GG_GGGGGGG               ^        ",
    "     G GQGGGGGGGGGGGT                             ",
    "    _G G_GT     ^ G              XX        ^      ",
    " Z  _GGGT  G^GG                              ^    ",
    "GGGGGGGGGGGGGGGGGGGGGGG   ^^  __                  ",
    "                          T  TT    TG             ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                                                  ",
    "                    GGG      G                    ",
    "                    G                             ",
    "                    GXG    G                      ",
    "                    GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
    35]

  /*
  [//level 2

  new Platform(350, 450, 300, 20),
  new Platform(520, 300, 160, 15),
  new Platform(750, 220, 100, 10)
  ],
  [

    new Platform(10, 300, 30, 10),
    new Platform(160, 300, 30, 10),
    new Platform(320, 300, 30, 10),
    new Platform(480, 300, 30, 10),
    new Platform(640, 300, 30, 10),
    new Platform(800, 300, 30, 10),
    new Platform(960, 300, 30, 10),
    new Platform(1120, 300, 30, 10)

  ],
  [

    new Platform(0, 480, 20, 10),
    new Platform(0, 380, 20, 10),
    new Platform(0, 280, 20, 10),
    new Platform(0, 180, 20, 10),
    new Platform(100, 80, 40, 10),
    new Platform(380, 480, 20, 10)

  ],
  [

    new Platform(-100, 450, 200, 30),
    new Platform(-125, 300, 250, 10)

  ]
  */];


function windowResized() {
  //if the user's screen has more width for 16:10 than height, put bars on the side, otherwise put it at the top
  if (windowWidth * 5 / 8 > windowHeight) {
    resizeCanvas(windowHeight * 8 / 5, windowHeight);
  } else {
    resizeCanvas(windowWidth, windowWidth * 5 / 8);
  }
}
/*
var playerLevelData = [
  [385, 400, 30, 30, 0, 0],//level 1
  [385, 400, 30, 30, 0, 0],//2
  [10, 280, 30, 30, 0, 0],//3
  [0, 460, 30, 30, 0, 0],//4
  [0, 420, 30, 30, 0, 0]//5
];

var portalLevelData = [
  [300, 50, 40],//level 1
  [900, 50, 40],//2
  [1300, 200, 10],//3
  [600, 520, 40],//4
  [0, 100, 30]//5
];
*/

var platforms = [];

//timer for using controls. for example. when you go to a new level, the control timer will be set to 0 and not allow controls until it hits 30
var controlTimer = 110;

//assume you are off the ground at the start to prevent jumping before you touch a ground
var offGround = 10;

//prevents jumping just a few frames after the inital jump
var timeSinceJump = 1111;

//for future use
var slope;
var backupMonsters;
var framesSinceStart;

var level = 1;
//self-explanatory
var gravity = 0.8;

//the state of antilag mode
var antilag = false;

//Light or dark theme
var theme = "DARK";
var Player = {
  x: 385,
  y: 400,
  w: 30,
  h: 30,
  ySpeed: 0,
  xSpeed: 0,
  health: 100 };


//the jump
Player.jump = function () {
  //only execute if the player has been on the ground VERY recently
  if (offGround < 3 && timeSinceJump > 2) {
    //fiddle with this to change the jump height
    this.ySpeed = 16;
    timeSinceJump = 0;
  }
};
Player.walk = function (dir) {
  this.xSpeed += dir;
};

//checks platform collision in the x-direction
Player.walkedInPlatform = function () {

  for (var i = 0; i < platforms.length; i++) {if (window.CP.shouldStopExecution(0)) break;
    //check if they are in a wall, if so, move the f**k out!
    slope = 0;
    while (slope < 20 && platforms[i].checkCollision()) {if (window.CP.shouldStopExecution(1)) break;
      this.y -= 0.2;
      slope++;
    }window.CP.exitedLoop(1);
    if (slope === 20) {

      this.x -= this.xSpeed;
      this.xSpeed = 0;
      this.y += slope * 0.2;
    }
  }window.CP.exitedLoop(0);

};

//updates the position of the player based on current speeds
Player.updateX = function () {
  this.xSpeed *= 0.8;
  this.x += this.xSpeed;
};
Player.updateY = function () {
  //it's weird cuz positive y is downwards...
  if (this.ySpeed < 4 || keys[UP_ARROW] || keys[87]) {//to make higher jumps the longer the up arrow is pressed
    this.ySpeed -= gravity;
  } else {
    this.ySpeed -= gravity * 2;
  }
  //so I just flip the y! Smart right?
  this.y -= this.ySpeed;


  if (this.y > levelData[level - 1].length * levelData[level - 1][levelData[level - 1].length - 1]) {
    die();
  }
};
Player.draw = function () {
  noStroke();
  fill(255, 0, 0);
  rect(this.x, this.y, this.w, this.h, this.w / 10);
  fill(0);

  //jump costumes
  if (this.ySpeed > 0.5) {
    //jump looking right
    if (this.xSpeed > 0.8) {

      //eyes
      rect(this.x + this.w * 0.3, this.y + this.h * 0.22, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.75, this.y + this.h * 0.22, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.40, this.y + this.h * 0.54, this.w * 0.4, this.h * 0.25);
    } else if (this.xSpeed < -0.8) {//jump looking left

      //eyes
      rect(this.x + this.w * 0.1, this.y + this.h * 0.22, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.55, this.y + this.h * 0.22, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.20, this.y + this.h * 0.54, this.w * 0.4, this.h * 0.25);
    } else {//jump regular

      //eyes
      rect(this.x + this.w * 0.2, this.y + this.h * 0.22, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.65, this.y + this.h * 0.22, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.30, this.y + this.h * 0.54, this.w * 0.4, this.h * 0.25);
    }
  } else if (this.ySpeed < -3.3) {//falling
    //falling looking right
    if (this.xSpeed > 0.8) {

      //eyes
      rect(this.x + this.w * 0.3, this.y + this.h * 0.43, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.75, this.y + this.h * 0.43, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.40, this.y + this.h * 0.73, this.w * 0.4, this.h * 0.25);
    } else if (this.xSpeed < -0.8) {//falling looking left

      //eyes
      rect(this.x + this.w * 0.1, this.y + this.h * 0.43, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.55, this.y + this.h * 0.43, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.20, this.y + this.h * 0.73, this.w * 0.4, this.h * 0.25);
    } else {//falling regular

      //eyes
      rect(this.x + this.w * 0.2, this.y + this.h * 0.43, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.65, this.y + this.h * 0.43, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.30, this.y + this.h * 0.73, this.w * 0.4, this.h * 0.25);
    }
  } else {
    //looking right
    if (this.xSpeed > 0.8) {

      //eyes
      rect(this.x + this.w * 0.3, this.y + this.h / 3, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.75, this.y + this.h / 3, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.40, this.y + this.h * 2 / 3, this.w * 0.4, this.h * 0.25);
    } else if (this.xSpeed < -0.8) {//looking left
      //eyes
      rect(this.x + this.w * 0.1, this.y + this.h / 3, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.55, this.y + this.h / 3, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.20, this.y + this.h * 2 / 3, this.w * 0.4, this.h * 0.25);
    } else {//regular
      //eyes
      rect(this.x + this.w * 0.2, this.y + this.h / 3, this.w * 0.15, this.h * 0.15);
      rect(this.x + this.w * 0.65, this.y + this.h / 3, this.w * 0.15, this.h * 0.15);

      //mouth
      rect(this.x + this.w * 0.30, this.y + this.h * 2 / 3, this.w * 0.4, this.h * 0.25);
    }
  }
};
//portal object that changes places every level
var Portal = {
  x: 0,
  y: 0,
  r: 0,
  time: 0 };


Portal.draw = function () {
  if (!antilag) {
    if (Math.abs(this.x - Player.x - Player.w < 400) && Math.abs(this.y - Player.y - Player.h) < 250) {
      /*legacy code
      fill(22, 184, 224);
      ellipse(this.x, this.y, this.r * 2, this.r * 2);

      strokeWeight(6);
      for(var i = 0; i < this.r; i++) {
        stroke(random(255), random(255), random(255));
        var xp = 123412;
        var yp = 123412;
        //makes sure the points are all ON the circle, else tries a new (completely random) point
        while(dist(this.x, this.y, xp, yp) > this.r) {
          xp = random(this.x - this.r, this.x + this.r);
          yp = random(this.y - this.r, this.y + this.r);
        }
        point(xp, yp);
      }
      */
      colorMode(HSB, 170);
      noStroke();
      for (var i = 0; i < this.r; i += 2) {if (window.CP.shouldStopExecution(2)) break;
        fill(255, 0, 255, i * 10);
        ellipse(this.x, this.y, this.r * 2 - i * 2, this.r * 2 - i * 2);
      }window.CP.exitedLoop(2);
      colorMode(HSB, 250);
      noFill();
      strokeWeight(2);
      for (var i = 0; i < this.r; i += 2) {if (window.CP.shouldStopExecution(3)) break;
        stroke(frameCount % 255, 255, 255, sin(i * frameCount / 60) * 70);
        ellipse(this.x, this.y, this.r * 2 - i * 2, this.r * 2 - i * 2);
      }window.CP.exitedLoop(3);
      colorMode(RGB);
      ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
    //antilag
  } else {
    noStroke();
    fill(200, 240, 255);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
};

Portal.checkCollision = function () {
  //return circlerect(this.x, this.y, this.r, Player.x, Player.y, Player.w, Player.h);
  return circlerect(this, Player);
};

function Lava(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.draw = function () {
    if (!antilag) {
      if (Math.abs(this.x - Player.x) < width + Player.w && Math.abs(this.y - Player.y) < height + Player.h) {
        for (var i = 0; i < 2; i++) {if (window.CP.shouldStopExecution(4)) break;
          for (var j = 0; j < 2; j++) {if (window.CP.shouldStopExecution(5)) break;
            fill(random(150, 255), 0, 0);
            rect(this.x + i * this.w / 2, this.y + j * this.h / 2, this.w / 2, this.h / 2);
          }window.CP.exitedLoop(5);
        }window.CP.exitedLoop(4);
      }
    } else {
      fill(200, 0, 0);
      rect(this.x, this.y, this.w, this.h);
    }
  };
  this.checkCollision = function () {
    return rectrect(this.x, this.y, this.w, this.h, Player.x, Player.y, Player.w, Player.h);
  };
}
var lavas = [];

function Cannon(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.angle;
  //updates the angle
  this.update = function () {
    var dx = this.x - (Player.x + Player.w / 2);
    var dy = this.y - (Player.y + Player.h / 2);
    this.angle = atan2(dy, dx);
  };
  this.draw = function () {
    if (Math.abs(this.x - Player.x) < width + Player.w && Math.abs(this.y - Player.y) < height + Player.h) {
      rectMode(CENTER);
      translate(this.x, this.y);
      rotate(this.angle - PI / 2);
      fill(0, 0, 100);
      ellipse(0, this.h / 6, this.w / 2, this.h / 2);
      rect(0, -this.h / 8, this.w / 3, this.h / 2);
      rotate(-this.angle + PI / 2);
      translate(-this.x, -this.y);
      rectMode(CORNER);
    }
    this.shoot = function () {
      if (frameCount % 120 === 0) {
        bullets.push(new Bullet(this.x, this.y, this.w / 5, this.angle + PI));
      }
    };
  };
}
var cannons = [];

function Bullet(x, y, r, angle) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.angle = angle;
  this.draw = function () {
    ellipse(this.x, this.y, this.r, this.r);
  };
  //updates the position
  this.update = function () {
    //xVelocity = velocity * cos(angle);
    //yVelocity = velocity * sin(angle);

    //the 1* is there so changes can be quickly made
    this.x += 4 * cos(angle);
    this.y += 4 * sin(angle);
  };
  this.checkCollision = function () {
    return circlerect(this, Player);
  };
}
var bullets = [];
function Monster(x, y, w, h, xVel) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.xVel = 1;
  this.draw = function () {
    if (!antilag) {
      if (Math.abs(this.x - Player.x) < width + Player.w && Math.abs(this.y - Player.y) < height + Player.h) {
        // draw the monster
        fill(23, 130, 57);
        noStroke();
        rect(this.x, this.y, this.w, this.h, Math.abs(cos(frameCount / 60)) * 10); // main body

        fill(255, 255, 255);
        stroke(0);
        strokeWeight(1);
        ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, this.h / 2); // the white of the eye
        // the pupil
        translate(this.x + this.w / 2, this.y + this.h / 2);
        rotate(this.angle + PI - 0.7);
        fill(0);
        ellipseMode(CORNER);
        ellipse(0, 0, this.w / 5, this.h / 5);
        ellipseMode(CENTER);
        rotate(-this.angle - PI + 0.7);
        translate(-this.x - this.w / 2, -this.y - this.h / 2);
      }
    } else {
      fill(23, 130, 57);
      noStroke();
      rect(this.x, this.y, this.w, this.h, this.w / 5);
      fill(255);
      stroke(0);
      strokeWeight(1);
      ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, this.h / 2);
      fill(0);
      ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w / 6, this.h / 6);
    }
  };

  //updates the angle
  this.update = function () {
    if (!antilag) {
      var dx = this.x + this.w / 2 - (Player.x + Player.w / 2);
      var dy = this.y + this.h / 2 - (Player.y + Player.h / 2);
    }
    this.angle = atan2(dy, dx);
    this.x += this.xVel;
    for (var i = 0; i < platforms.length; i++) {if (window.CP.shouldStopExecution(6)) break;
      if (rectrect(this.x, this.y, this.w, this.h, platforms[i].x, platforms[i].y, platforms[i].w, platforms[i].h)) {
        this.xVel = -this.xVel;
        this.x += this.xVel;
      }
    }window.CP.exitedLoop(6);

    if (this.checkCollision()) {
      if (Player.ySpeed >= 0) {
        Player.health -= 2;
      } else if (Player.ySpeed < -3 && this.y - Player.y > Player.h / 2 - 5) {
        this.dead = true; // the monster is "dead"
        Player.ySpeed = 18; // make the player hop (slightly higher than a normal jump)

      }
    }
  };
  this.checkCollision = function () {
    return rectrect(this.x, this.y, this.w, this.h, Player.x, Player.y, Player.w, Player.h);
  };
}
var monsters = [];
function Tramp(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.draw = function () {
    //pink
    fill(255, 130, 110);
    rect(this.x, this.y, this.w, this.h);
  };
  this.checkCollision = function () {
    return rectrect(this.x, this.y, this.w, this.h, Player.x, Player.y, Player.w, Player.h);
  };
}
var tramps = [];
function Spike(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.draw = function () {
    fill(70);
    noStroke();
    triangle(this.x + this.w / 2, this.y, this.x, this.y + this.h, this.x + this.w, this.y + this.h);
  };
  //checks player collision
  this.checkCollision = function () {
    return polygonCollide(
        [
          { x: Player.x, y: Player.y },
          { x: Player.x + Player.w, y: Player.y },
          { x: Player.x + Player.w, y: Player.y + Player.h },
          { x: Player.x, y: Player.y + Player.h }],
        //the player
        [
          { x: this.x + this.w / 2, y: this.y },
          { x: this.x, y: this.y + this.h },
          { x: this.x + this.w, y: this.y + this.h }]);

  };
}
var spikes = [];
//current keys that are being held down
var keys = [];
function keyPressed() {
  //again, like I said in my previous P5 program, I'm not sure how this assigning values to nonexistent items in a list works. Enlighten me if you're reading this and know how
  keys[keyCode] = true;
  //R = restart
  if (keyCode === 82) {
    die();
  }
  //l = toggle lag prevention
  if (keyCode === 76) {
    if (antilag) {
      antilag = false;
    } else {
      antilag = true;
    }
  }
  if (keyCode === 84) {
    if (theme === "DARK") {
      theme = "LIGHT";
    } else {
      theme = "DARK";
    }
  }
}
function keyReleased() {
  keys[keyCode] = false;
}
function polygonCollide(shape1, shape2) {
  function isBetween(c, a, b) {
    return (a - c) * (b - c) <= 0;
  }

  /* Do ranges a and b overlap? */
  function overlap(a, b) {
    return isBetween(b.min, a.min, a.max) || isBetween(a.min, b.min, b.max);
  }

  /*
     * Project shape onto axis.  Simply
     * compute dot products between the
     * shape's vertices and the axis, and
     * keep track of the min and max values.
     */
  function project(shape, axis) {
    var mn = Infinity;
    var mx = -Infinity;
    for (var i = 0; i < shape.length; i++) {if (window.CP.shouldStopExecution(7)) break;
      var dot = shape[i].x * axis.x + shape[i].y * axis.y;
      mx = max(mx, dot);
      mn = min(mn, dot);
    }window.CP.exitedLoop(7);
    return { min: mn, max: mx };
  }

  /* Compute all projections axes of shape. */
  function getAxes(shape) {
    var axes = [];
    for (var i = 0; i < shape.length; i++) {if (window.CP.shouldStopExecution(8)) break;
      var n = (i + 1) % shape.length;
      /*
             * The edge is simply the delta between i and n.
             * The axis is the edge's normal. And a normal
             * of (x, y) is either of (y, -x) or (-y, x).
             */
      axes[i] = {
        y: shape[i].x - shape[n].x,
        x: -(shape[i].y - shape[n].y) };

    }window.CP.exitedLoop(8);
    return axes;
  }

  var shapes = [shape1, shape2];
  for (var s = 0; s < shapes.length; s++) {if (window.CP.shouldStopExecution(9)) break;
    var axes = getAxes(shapes[s]);
    for (var i = 0; i < axes.length; i++) {if (window.CP.shouldStopExecution(10)) break;
      var axis = axes[i];
      /* Project both shapes onto this axis */
      var p1 = project(shape1, axis);
      var p2 = project(shape2, axis);
      if (!overlap(p1, p2)) {
        /* The two shapes cannot overlap */
        return false;
      }
    }window.CP.exitedLoop(10);
  }window.CP.exitedLoop(9);
  return true; //they overlap
} //for triangular collisions

/*
//handles rect and rect collisions
function rectrect(rect1, rect2) {

  //Uhh for some reason I can't quite figure out how to do a rectrect collision function with rectmode corner, so I just converted the parameters as if it were rectmode center.
  rect1.x += rect1.w/2;
  rect1.y += rect1.h/2;
  rect2.x += rect2.w/2;
  rect2.y += rect2.h/2;

  return Math.abs(rect1.x - rect2.x) <= rect1.w/2 + rect2.w/2 && Math.abs(rect1.y - rect2.y) <= rect1.h/2 + rect2.h/2;
}
*/
//handles rect and rect collisions
function rectrect(x1, y1, w1, h1, x2, y2, w2, h2) {

  //Uhh for some reason I can't quite figure out how to do a rectrect collision function with rectmode corner, so I just converted the parameters as if it were rectmode center.
  x1 += w1 / 2;
  y1 += h1 / 2;
  x2 += w2 / 2;
  y2 += h2 / 2;

  return Math.abs(x1 - x2) <= w1 / 2 + w2 / 2 && Math.abs(y1 - y2) <= h1 / 2 + h2 / 2;
}
//the more complicated collision detection between a circle and rect.
function circlerect(circ, rect) {
  var distX = Math.abs(circ.x - rect.x - rect.w / 2);
  var distY = Math.abs(circ.y - rect.y - rect.h / 2);

  if (distX > rect.w / 2 + circ.r) {return false;}
  if (distY > rect.h / 2 + circ.r) {return false;}

  if (distX <= rect.w / 2) {return true;}
  if (distY <= rect.h / 2) {return true;}

  var dx = distX - rect.w / 2;
  var dy = distY - rect.h / 2;
  return dx * dx + dy * dy <= circ.r * circ.r;
}
//platform prototype
function Platform(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.draw = function () {
    noStroke();
    if (theme === "DARK") {
      //dark dark brown
      fill(15, 10, 0);
    } else {
      //light light yellow
      fill(242);
    }
    rect(this.x, this.y, this.w, this.h);

  };
  this.checkCollision = function () {
    return rectrect(this.x, this.y, this.w, this.h, Player.x, Player.y, Player.w, Player.h);
  };
}

function win() {
  background(245);
  textSize(width / 16);
  text("You beat all levels.", width / 2, height / 2);
  noLoop();
  return;
}
function lose() {
  background(245);
  textSize(width / 16);
  text("You ran out of lives.", width / 2, height / 2);
  noLoop();
  return;
}
function die() {
  bullets = [];
  monsters = [];
  for (var i = 0; i < backupMonsters.length; i++) {if (window.CP.shouldStopExecution(11)) break;
    monsters.push(Object.assign({}, backupMonsters[i]));
  }window.CP.exitedLoop(11);
  Player.health = 100;
  Portal.time = 0;
  Player.x = originalCoords[0];
  Player.y = originalCoords[1];
}
function reset() {
  //makes sure any movements don't carry from the previous level
  Player.xSpeed = 0;
  Player.ySpeed = 0;
  //resets all arrays for usage of next level
  platforms = [];
  lavas = [];
  cannons = [];
  bullets = [];
  monsters = [];
  tramps = [];
  spikes = [];
}
//adjusts player and portal values when going to the next level
//since we use nested arrays to describe levels now, this "reads" the array
function nextLevel() {
  if (level > levelData.length) {
    win();
  }
  backupMonsters = [];
  //resets the player's health
  Player.health = 100;
  reset();
  //last item in the level data is the size of each square, the grid size.
  var gridSize = levelData[level - 1][levelData[level - 1].length - 1];
  for (var i = 0; i < levelData[level - 1].length - 1; i++) {if (window.CP.shouldStopExecution(12)) break;
    for (var j = 0; j < levelData[level - 1][i].length; j++) {if (window.CP.shouldStopExecution(13)) break;
      switch (levelData[level - 1][i].charAt(j)) {
        case "G":
          platforms.push(new Platform(j * gridSize, i * gridSize, gridSize, gridSize));
          break;
        case "Z":
          Player.x = j * gridSize + 0.5;
          Player.y = i * gridSize + 0.5;

          //-1 is for some subtle collision changes that are for the better
          Player.w = gridSize * 0.9;
          Player.h = gridSize * 0.9;

          //the original position of the player in a level, used to reset the player to that position when you die
          originalCoords = [Player.x, Player.y];
          break;
        case "Q":
          Portal.x = j * gridSize + gridSize / 2;
          Portal.y = i * gridSize + gridSize / 2;
          Portal.r = gridSize / 2;
          break;
        case "X":
          lavas.push(new Lava(j * gridSize, i * gridSize, gridSize, gridSize));
          break;
        case "T":
          cannons.push(new Cannon(j * gridSize + gridSize / 2, i * gridSize + gridSize / 2, gridSize, gridSize));
          break;
        case "@":
          monsters.push(new Monster(j * gridSize + 0.5, i * gridSize + 0.5, gridSize - 1, gridSize - 1));
          backupMonsters.push(new Monster(j * gridSize + 0.5, i * gridSize + 0.5, gridSize - 1, gridSize - 1));
          break;
        case "_":
          tramps.push(new Tramp(j * gridSize, i * gridSize + gridSize * 0.8, gridSize, gridSize * 0.2));
          break;
        case "^":
          spikes.push(new Spike(j * gridSize, i * gridSize, gridSize, gridSize));
          break;}

    }window.CP.exitedLoop(13);
  }

  /*legacy
  Player.x = playerLevelData[level - 1][0];
  Player.y = playerLevelData[level - 1][1];
  Player.w = playerLevelData[level - 1][2];
  Player.h = playerLevelData[level - 1][3];
  Player.xSpeed = playerLevelData[level - 1][4];
  Player.ySpeed = playerLevelData[level - 1][5];
  Portal.x = portalLevelData[level - 1][0];
  Portal.y = portalLevelData[level - 1][1];
  Portal.r = portalLevelData[level - 1][2];
  */window.CP.exitedLoop(12);

  controlTimer = 0;
}
//readies things up for level 1
nextLevel();

//overrides the value assignment in the next level function because you should be able to move immediately on the first level
var controlTimer = 110;

//main game loop
function draw() {
  //for horizontal scrolling
  push();
  scale(width / 800, height / 500);
  if (theme === "DARK") {
    background(120);
  } else {
    background(190);
  }


  //only allows controls if a certain amount of time has passed on the timer (on a new level, etc)
  //if(controlTimer > 29) {
  //handles player input
  if (keys[UP_ARROW] || keys[87]) {
    Player.jump();
  }
  if (keys[LEFT_ARROW] || keys[65]) {
    Player.walk(-1.25);
  }
  if (keys[RIGHT_ARROW] || keys[68]) {
    Player.walk(1.25);
  }
  /*} else {
    textSize(12);
    text("Controls currently locked", 80, 15)
    controlTimer++;
  //}*/
  //updates the player's position (before drawing obviously, you don't want a 1 frame delay between input and output)
  Player.updateX();

  //checks if the update of player position caused a collision with a platform, if so, move it out
  Player.walkedInPlatform();

  //deals with the changes in Y next
  Player.updateY();

  for (var i = 0; i < tramps.length; i++) {if (window.CP.shouldStopExecution(14)) break;
    if (tramps[i].checkCollision()) {
      Player.ySpeed = 20;
      Player.y -= Player.ySpeed;
    }
  }
  //increases the amount of frames that the player has been off the ground
  window.CP.exitedLoop(14);offGround++;
  timeSinceJump++;
  //If the player is found to be touching the ground (only caused by vertical movements)
  for (i = 0; i < platforms.length; i++) {if (window.CP.shouldStopExecution(15)) break;


    //handles platform collisions.
    if (platforms[i].checkCollision()) {
      while (platforms[i].checkCollision()) {if (window.CP.shouldStopExecution(16)) break;
        if (Player.ySpeed > 0) {

          //ceiling detection
          Player.y += 0.2;
        } else {

          //floor detection
          offGround = 0;
          //make this value higher for better performance but it makes things a lot less accurate should be a factor of gravity or else weird sh*t is gonna happen
          Player.y -= 0.2;
        }
      }

      //touching a ground stops all y speeds
      window.CP.exitedLoop(16);Player.ySpeed = 0;
    }

  }window.CP.exitedLoop(15);


  translate(-Player.x - Player.w / 2 + 400, -Player.y - Player.h / 2 + 250);
  Portal.draw();
  for (i = 0; i < platforms.length; i++) {if (window.CP.shouldStopExecution(17)) break;
    //draws the platform
    platforms[i].draw();
  }window.CP.exitedLoop(17);
  for (i = 0; i < tramps.length; i++) {if (window.CP.shouldStopExecution(18)) break;
    tramps[i].draw();
  }window.CP.exitedLoop(18);

  for (i = 0; i < spikes.length; i++) {if (window.CP.shouldStopExecution(19)) break;

    if (spikes[i].checkCollision()) {
      Player.health -= 5;
      Player.ySpeed = 14;
      //move player off of spike to prevent too much damage from approaching it at the side.
      Player.y -= 0;
    }

    spikes[i].draw();

  }window.CP.exitedLoop(19);

  Player.draw();
  for (i = 0; i < lavas.length; i++) {if (window.CP.shouldStopExecution(20)) break;
    lavas[i].draw();
    if (lavas[i].checkCollision()) {
      Player.health--;
    }
  }
  /*
  for(i = 0; i < cannons.length; i++) {
    cannons[i].update();
    cannons[i].shoot();
    cannons[i].draw();
  }
  */window.CP.exitedLoop(20);
  for (i = 0; i < cannons.length; i++) {if (window.CP.shouldStopExecution(21)) break;
    cannons[i].update();
    cannons[i].draw();
    cannons[i].shoot();
  }
  //var bulletData = bullets;
  window.CP.exitedLoop(21);for (i = bullets.length - 1; i > -1; i--) {if (window.CP.shouldStopExecution(22)) break;
    bullets[i].update();
    bullets[i].draw();
    if (bullets[i].checkCollision()) {
      bullets.splice(i, 1);
      Player.health -= 10;
      break;
    }
    for (var j = 0; j < platforms.length; j++) {if (window.CP.shouldStopExecution(23)) break;
      if (circlerect(bullets[i], platforms[j])) {
        bullets.splice(i, 1);
        break;
      }
    }window.CP.exitedLoop(23);

  }

  //bullets = bulletData;
  window.CP.exitedLoop(22);for (i = monsters.length - 1; i > -1; i--) {if (window.CP.shouldStopExecution(24)) break;
    monsters[i].update();
    monsters[i].draw();
    if (monsters[i].dead) {
      monsters.splice(i, 1);
    }
  }window.CP.exitedLoop(24);
  pop();

  fill(0);
  textSize(width / 27);
  text("Health: " + round(Player.health), width - width / 9, height / 25);
  //text("FPS: " + round(frameRate()/10)*10, width - 70, 70)

  //checks if lives are all out
  if (Player.health < 0.1) {
    die();
  }
  //checks collision with portal, if there is collision, move player to the next level
  if (Portal.checkCollision()) {
    Portal.time += 2;
    if (Portal.time > 120) {
      level++;
      nextLevel();
    }
  } else {
    if (frameCount - framesSinceStart < 60) {
      Portal.time -= 3;
    } else {
      Portal.time--;
    }
  }
  Portal.time = constrain(Portal.time, 0, 180);
  fill(255, 255, 255, 0 + Portal.time * 2);
  rect(0, 0, width, height);
}
