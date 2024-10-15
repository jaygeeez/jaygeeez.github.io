var dark_mode = true;

// Need to shorten the audio clips
var piano1 = new Audio();
piano1.src = "audio/piano1.wav";

var piano3 = new Audio();
piano3.src = "audio/piano3.wav";

function playAudio() {
  if (dark_mode) {
    piano3.play();
    dark_mode = false;
  } else {
    piano1.play();
    dark_mode = true;
  }
}
