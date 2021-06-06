const modal = document.getElementById("myModal");
const p1 = document.getElementById("p1");
const span = document.getElementsByClassName("span");
const heading = document.getElementById("heading");
const modal_header = document.getElementById("modal-header");
const modal_footer = document.getElementById("modal-footer");


let player = "player1";
let load = true;

let names = ["", ""];

const display = document.getElementById("display");
display.innerHTML = "";
const image = document.getElementsByClassName("small");
const boxes = document.getElementsByClassName("images");
let maybe = [];
let maybe1 = [];
let new_arr = [];
let winn = "false";

function sd() {
  modal.style.display = "none";
}
span.onclick = sd();

function check(num){
    if (num){
        return true;
    }else{return false;}

}

function true_check(array) {
    let trues = [];
    for (let i = 0; i < array.length; i++) {
        if(array[i]){
            trues.push(i);
        }
    }
    return trues;
}

function notify(winner){
    if(winner == "NONE"){
        modal_header.style.backgroundColor = "#bac838";
        modal_footer.style.backgroundColor = "#bac838";
        heading.innerHTML = "Sorry";
        p1.innerHTML = `Sorry ${names[0]} and ${names[1]},  but no one won the game it is a draw `;
        modal.style.display = "block";
    }else{
        modal_header.style.backgroundColor = "#5cb85c";
        modal_footer.style.backgroundColor = "#5cb85c";
        p1.innerHTML = `Congratulations, ${winner} `;
        modal.style.display = "block";
        if(winner == "player1"){
            let trues = true_check(maybe);
            for(i=0;i<trues.length;i++){
                box[trues[i]].style.backdropFilter = "contrast(.8)";
            }
        }else if(winner == "player2"){
            let trues = true_check(maybe1);
            for(i=0;i<trues.length;i++){
                box[trues[i]].style.backdropFilter = "blur(8px)";
            }
        }
    }
    images_of_box[0].style.pointerEvents = "none";
    images_of_box[1].style.pointerEvents = "none";
    images_of_box[2].style.pointerEvents = "none";
    images_of_box[3].style.pointerEvents = "none";
    images_of_box[4].style.pointerEvents = "none";
    images_of_box[5].style.pointerEvents = "none";
    images_of_box[6].style.pointerEvents = "none";
    images_of_box[7].style.pointerEvents = "none";
    images_of_box[8].style.pointerEvents = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function displayer() {
    if (player == "player1"){
        display.innerHTML = `It's ${names[0]} move. I.e. Cross`;
        image[0].style.display = "inline";
        image[1].style.display = "none";
    }else if(player == "player2"){
        display.innerHTML = `It's ${names[1]} move. I.e. Circle`;
        image[1].style.display = "inline";
        image[0].style.display = "none";
    }
    
     last_save();
}

function win(){
    for(i=1;i<=9;i++){
        if (boxes[i-1].getAttribute("src") != `images/square.png`){
            new_arr.push(true);
            if(boxes[i-1].getAttribute("src") == `images/player1.png`){maybe.push(true);maybe1.push(false)}
            else{maybe1.push(true);maybe.push(false)}
        }
        else{maybe.push(false);maybe1.push(false);new_arr.push(false);}
    }

    if ((maybe[0] && maybe[1] && maybe[2])){
        notify(names[0]);
        winn = "true";
    }

    else if(maybe[3] &&maybe[4] &&maybe[5] ){
       notify(names[0]);
       winn = "true";
    }
    else if(maybe[6] &&maybe[7] &&maybe[8] ){
       notify(names[0]);
       winn = "true";
    }
    else if(maybe[0] &&maybe[4] &&maybe[8] ){
       notify(names[0]);
       winn = "true";
    }
    else if(maybe[2] &&maybe[4] &&maybe[6] ){
       notify(names[0]);
       winn = "true";
    }
    else if(maybe[0] &&maybe[3] &&maybe[6] ){
       notify(names[0]);
       winn = "true";
    }
    else if(maybe[1] &&maybe[4] &&maybe[7] ){
       notify(names[0]);
       winn = "true";
    }
    else if(maybe[2] &&maybe[5] &&maybe[8] ){
       notify(names[0]);
       winn = "true";
    }

        if (maybe1[0] && maybe1[1] && maybe1[2]){
        notify(names[1]);
        winn = "true";
    }

    else if(maybe1[3] &&maybe1[4] &&maybe1[5] ){
       notify(names[1]);
       winn = "true";
    }
    else if(maybe1[6] &&maybe1[7] &&maybe1[8] ){
       notify(names[1]);
       winn = "true";
    }
    else if(maybe1[0] &&maybe1[4] &&maybe1[8] ){
       notify(names[1]);
       winn = "true";
    }
    else if(maybe1[2] &&maybe1[4] &&maybe1[6] ){
       notify(names[1]);
       winn = "true";
    }
    else if(maybe1[0] &&maybe1[3] &&maybe1[6] ){
       notify(names[1]);
       winn = "true";
    }
    else if(maybe1[1] &&maybe1[4] &&maybe1[7] ){
       notify(names[1]);
       winn = "true";
    }
    else if(maybe1[2] &&maybe1[5] &&maybe1[8] ){
       notify(names[1]);
       winn = "true";
    }else if((new_arr.every(check)) && winn=="false"){
        notify("NONE");
    }
    maybe = [];
    maybe1 = [];
    new_arr = [];
    last_save();
}

function box(box_num) {

    if(document.getElementById(box_num).getAttribute("src") == "images/square.png"){
    document.getElementById(box_num).setAttribute("src", `images/${player}.png`);
    win();
    switch (player) {
        case "player1":
            player = "player2";
            break;
        case "player2":
            player = "player1";
            break;
    }}
    displayer();

}

const images_of_box = document.getElementsByClassName("images");

images_of_box[0].style.pointerEvents = "none";
images_of_box[1].style.pointerEvents = "none";
images_of_box[2].style.pointerEvents = "none";
images_of_box[3].style.pointerEvents = "none";
images_of_box[4].style.pointerEvents = "none";
images_of_box[5].style.pointerEvents = "none";
images_of_box[6].style.pointerEvents = "none";
images_of_box[7].style.pointerEvents = "none";
images_of_box[8].style.pointerEvents = "none";

const restart = document.getElementsByClassName("restart");


function start() {
    clear();
    images_of_box[0].style.pointerEvents = "all";
    images_of_box[1].style.pointerEvents = "all";
    images_of_box[2].style.pointerEvents = "all";
    images_of_box[3].style.pointerEvents = "all";
    images_of_box[4].style.pointerEvents = "all";
    images_of_box[5].style.pointerEvents = "all";
    images_of_box[6].style.pointerEvents = "all";
    images_of_box[7].style.pointerEvents = "all";
    images_of_box[8].style.pointerEvents = "all";
    restart[0].disabled = false;
    restart[0].addEventListener("click", clear);

    if(localStorage.getItem("player1name") != ""){
        console.log(localStorage.getItem("player1name"));
        load = confirm("Do you want to load previous names?");

    }else{
        load = false;
    }
    if (load == true) {
        if (localStorage.getItem("player1name") != null) {
            names[0] = localStorage.getItem("player1name");
            names[1] = localStorage.getItem("player2name");
        } else {
            names[0] = "player1";
            names[1] = "player2";    
        }
    } else {
        new Attention.Prompt({
            title: 'Enter data',
            content: 'Please enter player 2 name: ',
            onSubmit: function(component, value) {
                names[1] = value;
            }
});

    new Attention.Prompt({
        title: 'Enter data',
        content: 'Please enter player 1 name: ',
        onSubmit: function(component, value) {
            if(value==null){
                names[0] = "player1";
            }else{
            names[0] = value;
            }
        }
});        
    }

    displayer();
}



function clear() {
    images_of_box[0].setAttribute("src", "images/square.png");
    images_of_box[1].setAttribute("src", "images/square.png");
    images_of_box[2].setAttribute("src", "images/square.png");
    images_of_box[3].setAttribute("src", "images/square.png");
    images_of_box[4].setAttribute("src", "images/square.png");
    images_of_box[5].setAttribute("src", "images/square.png");
    images_of_box[6].setAttribute("src", "images/square.png");
    images_of_box[7].setAttribute("src", "images/square.png");
    images_of_box[8].setAttribute("src", "images/square.png");
    images_of_box[0].style.pointerEvents = "none";
    images_of_box[1].style.pointerEvents = "none";
    images_of_box[2].style.pointerEvents = "none";
    images_of_box[3].style.pointerEvents = "none";
    images_of_box[4].style.pointerEvents = "none";
    images_of_box[5].style.pointerEvents = "none";
    images_of_box[6].style.pointerEvents = "none";
    images_of_box[7].style.pointerEvents = "none";
    images_of_box[8].style.pointerEvents = "none";
    display.innerHTML = "";
    image[0].style.display = "none";
    image[1].style.display = "none";

    restart[0].disabled = true;
}
function last_save(){
localStorage.setItem("player1name", names[0]);
localStorage.setItem("player2name", names[1]);
}
// names = ["", ""];
// document.addEventListener('img', event => event.preventDefault());
const btn = document.querySelector(".theme");

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

btn.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
  } else {
    document.body.classList.toggle("dark-theme");
  }
});

