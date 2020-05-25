function PlaySound(key) {
  switch (key) {
    case "l":
      var audio = new Audio("sounds/kick-bass.mp3");
      audio.play();
      break;
    case "w":
      var audio = new Audio("sounds/tom-1.mp3");
      audio.play();
      break;
    case "a":
      var audio = new Audio("sounds/tom-2.mp3");
      audio.play();
      break;
    case "s":
      var audio = new Audio("sounds/tom-3.mp3");
      audio.play();
      break;
    case "d":
      var audio = new Audio("sounds/tom-4.mp3");
      audio.play();
      break;
    case "j":
      var audio = new Audio("sounds/snare.mp3");
      audio.play();
      break;
    case "k":
      var audio = new Audio("sounds/crash.mp3");
      audio.play();
      break;

    default:
      break;
  }
}

function AnimationButton(value){
    var buttonSelect=document.querySelector("."+value);
    buttonSelect.classList.add("pressed");
    setTimeout(function(){
        buttonSelect.classList.remove("pressed");
    },100);
    
}
for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function () {
    var value = this.innerHTML;
    PlaySound(value);
    AnimationButton(value);
  });

  document.addEventListener("keypress", function (event) {
    PlaySound(event.key);
    AnimationButton(event.key);
  });
}
