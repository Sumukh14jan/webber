
let adjective = ["Excited", "Anxious", "Overweight", "Demonic", "Jumpy", "Misunderstood", "Squashed", "Gargantuan","Broad", "Crooked", "Curved", "Deep", "Even","Excited", "Anxious", "Overweight", "Demonic", "Jumpy", "Misunderstood", "Squashed", "Gargantuan","Broad", "Crooked", "Curved", "Deep", "Even", "Flat", "Hilly", "Jagged", "Round", "Shallow", "Square", "Steep", "Straight", "Thick", "Thin", "Cooing", "Deafening", "Faint", "Harsh", "High-pitched", "Hissing", "Hushed", "Husky", "Loud", "Melodic", "Moaning", "Mute", "Noisy", "Purring", "Quiet", "Raspy", "Screeching", "Shrill", "Silent", "Soft", "Squeaky", "Squealing", "Thundering", "Voiceless", "Whispering"];
let object = ["Taco", "Operating System", "Sphere", "Watermelon", "Cheeseburger", "Apple Pie", "Spider", "Dragon", "Remote Control", "Soda", "Barbie Doll", "Watch", "Purple Pen", "Dollar Bill", "Stuffed Animal", "Hair Clip", "Sunglasses", "T-shirt", "Purse", "Towel", "Hat", "Camera", "Hand Sanitizer Bottle", "Photo", "Dog Bone", "Hair Brush", "Birthday Card"];
let list = [];
for (let i=0; i<=10;i++){
    list.push({0: adjective[Math.floor(Math.random() * adjective.length)], 1: object[Math.floor(Math.random() * object.length)]});
}

let list_low = [];
for(let i of list){
    list_low.push({0: i[0].toLocaleLowerCase(), 1: i[1].toLocaleLowerCase().replace(" ", "_")})
}

let robots = [];

for (let i = 1; i <= 10; i++) {
    let lower1 = list[i-1][1];
    let lower = list[i-1][1].replace(" ", "_");
    robots.push({id:i,name:list[i-1][0]+" "+lower1,email:list_low[i-1][0]+"."+lower.toLocaleLowerCase()+"@robotworld.corp"});
}

export default robots;