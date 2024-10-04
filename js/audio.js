function playAudio() {
  var piano1 = new Audio();
  piano1.pause(); // Trying to get page to stop all other sounds before playing it again
  piano1.src = "audio/piano1.wav";
  piano1.play();
}
