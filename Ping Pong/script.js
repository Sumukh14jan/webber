const ball = document.getElementById('ball');
const rod1 = document.getElementById('rod1');
const rod2 = document.getElementById('rod2');
const r = document.querySelector(':root');


function applycol() {
    r.style.setProperty('--rod1col', document.querySelector('#rod1col').value);
    r.style.setProperty('--rod2col', document.querySelector('#rod2col').value);
    r.style.setProperty('--ballcol', document.querySelector('#ballcol').value);
    if(document.querySelector("#flexRadioDefault1").checked){
        document.querySelector("#control").innerHTML = "                    <div class=\"modal-body\" id=\"control\">\n" +
            "                        <div class=\"padded\"><kbd>Right arrow(<span class=\"arrow\">➡</span>) or A</kbd>: Move player 1's rod to right.<br></div>\n" +
            "                        <div class=\"padded\"><kbd>Left arrow(<span class=\"arrow\">⬅</span>) or D</kbd>: Move player 1's rod to left.</div>"
    }else{
        document.querySelector("#control").innerHTML = "<div class=\"padded\"><kbd>Right arrow(<span class=\"arrow\">➡</span>) or A</kbd>: Move player 1's rod to right.<br></div>\n" +
            "<div class=\"padded\"><kbd>D</kbd>: Move player 2's rod to right.</div>\n" +
            "\n" +
            "<div class=\"padded\"><kbd>Left arrow(<span class=\"arrow\">⬅</span>)</kbd>: Move player 1's rod to left.</div>\n" +
            "<div class=\"padded\"><kbd>A</kbd>: Move player 2's rod to left.</div>"
    }
}

const storeName = "PPName";
const storeScore = "PPMaxScore";
let rod1Name = "Player1";
let rod2Name = "Player2";


let score,
    score1=0,
    maxScore,
    movement,
    rod,
    ballSpeedX = 2,
    ballSpeedY = 2;

let gameOn = false;

let windowWidth = window.innerWidth,
    windowHeight = window.innerHeight;



(function () {
    maxScore = 0;
    rod = "Rod1";

    resetBoard(rod);
})();



function resetBoard(rodName) {

    rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + 'px';
    rod2.style.left = (window.innerWidth - rod2.offsetWidth) / 2 + 'px';
    ball.style.left = (windowWidth - ball.offsetWidth) / 2 + 'px';


    // Lossing player gets the ball
    if (rodName === rod2Name) {
        ball.style.top = (rod1.offsetTop + rod1.offsetHeight) + 'px';
        ballSpeedY = 2;
    } else if (rodName === rod1Name) {
        ball.style.top = (rod2.offsetTop - rod2.offsetHeight) + 'px';
        ballSpeedY = -2;
    }

    score = 0;
    score1=0;
    gameOn = false;

}



function storeWin(rod, score) {


    clearInterval(movement);
    resetBoard(rod);
    if(rod=="player1"){alert(rod + " wins with a score of " + (score1 * 100));}else{alert(rod + " wins with a score of " + (score * 100));}

}






window.addEventListener('keydown', function () {
    console.log(event.code);
    let rodSpeed = 20;

    let rodRect = rod1.getBoundingClientRect();
    let rodRect2 = rod2.getBoundingClientRect();

    if (document.querySelector("#flexRadioDefault1").checked){
        if (event.code === "KeyD" && ((rodRect.x + rodRect.width) < window.innerWidth)) {
            rod1.style.left = (rodRect.x) + rodSpeed + 'px';
            rod2.style.left = rod1.style.left;
        } else if (event.code === "KeyA" && (rodRect.x > 0)) {
            rod1.style.left = (rodRect.x) - rodSpeed + 'px';
            rod2.style.left = rod1.style.left;
    }}else{
        if (event.code === "KeyD" && ((rodRect.x + rodRect.width) < window.innerWidth)) {
            rod1.style.left = (rodRect.x) + rodSpeed + 'px';
        } else if (event.code === "KeyA" && (rodRect.x > 0)) {
            rod1.style.left = (rodRect.x) - rodSpeed + 'px';
        }
        if (event.code === "ArrowRight" && ((rodRect2.x + rodRect2.width) < window.innerWidth)) {
            rod2.style.left = (rodRect2.x) + rodSpeed + 'px';
        } else if (event.code === "ArrowLeft" && (rodRect2.x > 0)) {
            rod2.style.left = (rodRect2.x) - rodSpeed + 'px';
        }

    }


    if (event.code === "Enter") {

        if (!gameOn) {
            gameOn = true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY = ballRect.y;
            let ballDia = ballRect.width;

            let rod1Height = rod1.offsetHeight;
            let rod2Height = rod2.offsetHeight;
            let rod1Width = rod1.offsetWidth;
            let rod2Width = rod2.offsetWidth;


            movement = setInterval(function () {
                // Move ball
                ballX += ballSpeedX;
                ballY += ballSpeedY;

                let rod1X = rod1.getBoundingClientRect().x;
                let rod2X = rod2.getBoundingClientRect().x;

                ball.style.left = ballX + 'px';
                ball.style.top = ballY + 'px';


                if ((ballX + ballDia) > windowWidth || ballX < 0) {
                    ballSpeedX = -ballSpeedX; // Reverses the direction
                }

                // It specifies the center of the ball on the viewport
                let ballPos = ballX + ballDia / 2;

                // Check for Rod 1
                if (ballY <= 75+rod1Height) {
                    ballSpeedY = -ballSpeedY; // Reverses the direction
                    document.querySelector(".rod1").innerText = `Score: ${score1*100}`;
                    score1++;

                    // Check if the game ends
                    if ((ballPos < rod1X) || (ballPos > (rod1X + rod1Width))) {
                        storeWin(rod2Name, score);
                    }
                }

                // Check for Rod 2
                else if ((ballY + ballDia) >= (windowHeight - rod2Height)) {
                    ballSpeedY = -ballSpeedY; // Reverses the direction
                    document.querySelector(".rod2").innerText = `Score: ${score*100}`;
                    score++;

                    // Check if the game ends
                    if ((ballPos < rod2X) || (ballPos > (rod2X + rod2Width))) {
                        storeWin(rod1Name, score);
                    }
                }

            }, 10);

        }
    }

});
