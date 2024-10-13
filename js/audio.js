var dark_mode = true;

function playAudio() {
  var piano1 = new Audio();
  piano1.src = "audio/piano1.wav";

  var piano3 = new Audio();
  piano3.src = "audio/piano3.wav";

  if (dark_mode) {
    piano3.loop = true;
    piano3.play();
    setTimeout(() => {
      piano3.pause();
    }, 6000);
    dark_mode = false;
  } else {
    piano1.loop = true;
    piano1.play();
    setTimeout(() => {
      piano1.pause();
    }, 6000);
    dark_mode = true;
  }
}
