var dark_mode = true;
var piano1 = new Audio(); // Need to shorten the audio clips
var piano3 = new Audio();

piano1.src = "audio/piano1-1.wav";
piano3.src = "audio/piano3-1.wav";

function audioChoice(song) {
  song.play();
  setTimeout(() => {
    song.pause();
  }, 5000);
}

function playAudio() {
  if (dark_mode) {
    audioChoice(piano3);
  } else {
    audioChoice(piano1);
  }
  dark_mode = !dark_mode;
}
