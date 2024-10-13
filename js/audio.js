var dark_mode = true;

// Need to shorten the audio clips
var piano1 = new Audio();
piano1.src = "audio/piano1.wav";

var piano3 = new Audio();
piano3.src = "audio/piano3.wav";

function audioChoice(song) {
  song.play();
  // setTimeout(() => {
  //   song.pause();
  // }, 6000);
}
function playAudio() {
  if (dark_mode) {
    audioChoice(piano3);
    dark_mode = false;
  } else {
    audioChoice(piano1);
    dark_mode = true;
  }
}
