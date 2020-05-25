var random1 = Math.random() * 6;
var random2 = Math.random() * 6;

random1 = Math.floor(random1) + 1;
random2 = Math.floor(random2) + 1;

var img1 = "images/dice" + random1 + ".png";
var img2 = "images/dice" + random2 + ".png";

document.querySelectorAll("img")[0].setAttribute("src", img1);
document.querySelectorAll("img")[1].setAttribute("src", img2);

if(random1>random2){
    document.querySelector("h1").innerHTML = "Player-1 Win";
}
else if(random1<random2){
    document.querySelector("h1").innerHTML = "Player-2 Win";
}
else{
    document.querySelector("h1").innerHTML = "It's A Draw";
}

