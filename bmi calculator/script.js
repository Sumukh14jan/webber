const heightl = document.getElementById("height1");
const weightl = document.getElementById("weightl");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const inches = document.getElementsByClassName("hidden");
const reset_butt = document.getElementById("reset");
const cm = document.getElementById("height1");
const pound = document.getElementById("pound");
const bmi_gui = document.getElementById("hide");
let iframe = document.getElementById("hide");
const bmi_show = document.getElementsByClassName("headsol")[0];
let bmi;
// bmi = weight/height^2 where weight is in kg and height is in m

function reset() {
    reset_butt.click();
}

function calculate() {
    iframe.style.display = "none";
    if(height.value == ""){
        alert("You cannot give empty value in height");
        return;
    }
    if(weight.value == ""){
        alert("You cannot give empty value in weight");
        return;
    }
   let height_value = parseInt(height.value);
   let weight_value = parseInt(weight.value);
   let inches_value = parseInt(inches[0].value);
   if (height_value < 2 || height_value > 210) {
       alert("Sorry, but the height can only be between 2 and 210");
    //    return;
   } if(weight_value < 5 || weight_value > 150){
       alert("Sorry, but the height value can only be between 5 and 150");
    //    return;
   }
    // Doing Conversion
    if (cm.innerHTML == "feets"){
        height_value = ((height_value*12) + inches_value)*0.0254;
    }else{height_value = height_value/100;}

    if(pound.innerHTML == "pound"){
        weight_value = weight_value / 2.205;
    }

    bmi = weight_value / (height_value ** 2)
    bmi = bmi.toFixed(1);
    iframe.style.display = "block";
    iframe.contentWindow.document.getElementById("Give").value = bmi*10;
    setTimeout(() => {iframe.contentWindow.document.getElementById("SpeedCheck").click();}, 1000);
    bmi_show.style.display = "block";
    if (bmi<18.5) {
        bmi_show.style.color="yellow";
        bmi_show.innerHTML = `Your BMI is ${bmi}, i.e. you are Underweight`;
    } else if(bmi_show < 24.9){
        bmi_show.style.color="green";
        bmi_show.innerHTML = `Your BMI is ${bmi}, i.e. you are Normal`;
    }else if(bmi_show<29.9){
        bmi_show.style.color="orange";
        bmi_show.innerHTML = `Your BMI is ${bmi}, i.e. you are Overweight`;
    }else{
        bmi_show.style.color="red";
        bmi_show.innerHTML = `Your BMI is ${bmi}, i.e. you are Obese`;
    }
    reset();
}
const btn = document.querySelector(".theme");

const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
  } else {
    document.body.classList.toggle("dark-theme");
  }
btn.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
  } else {
    document.body.classList.toggle("dark-theme");
  }
});
