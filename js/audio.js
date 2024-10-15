var dark_mode = true;
var piano1 = new Audio(); // Need to shorten the audio clips
var piano3 = new Audio();

piano1.src = "audio/piano1-1.wav";
piano3.src = "audio/piano3-1.wav";

function playAudio() {
  if (dark_mode) {
    piano3.play();
    setTimeout(() => {
      piano3.pause();
    }, 5000);
  } else {
    piano1.play();
    setTimeout(() => {
      piano1.pause();
    }, 5000);
  }
  dark_mode = !dark_mode;
}
