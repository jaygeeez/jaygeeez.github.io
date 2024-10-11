// try randomizing or having audio different based on light or dark
function playAudio() {
  var piano1 = new Audio();
  piano1.src = "audio/piano1.wav";
  piano1.loop = true;
  piano1.play();
  setTimeout(() => {
    piano1.pause();
  }, 6000);
}
