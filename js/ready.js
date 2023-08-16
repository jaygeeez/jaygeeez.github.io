function ready() {
  var canvas = document.getElementById("myCanvas");
  canvas.width = 1080;
  canvas.height = 500;

  var context = canvas.getContext("2d");
  context.font = "25px Arial";

  var goodSound = new Audio();
  goodSound.src = "audio/good.wav";

  var badSound = new Audio();
  badSound.src = "audio/bad.wav";

  var bgSound = new Audio();
  bgSound.src = "audio/bg.wav";

  var bgSound2 = new Audio();
  bgSound2.src = "audio/bg2.wav";

  var charImage = new Image();
  charImage.src = "img/char.png";

  var goodImage = new Image();
  goodImage.src = "img/good.png";

  var badImage = new Image();
  badImage.src = "img/bad.png";

  var goodImage2 = new Image();
  goodImage2.src = "img/good2.png";

  var badImage2 = new Image();
  badImage2.src = "img/bad2.png";

  // Control character
  var myChar = {
    x: 0,
    y: 250,
    width: 100,
    height: 100,
  };

  // Good Item
  var mySquare = {
    x: 1080,
    y: 150,
    width: 100,
    height: 100,
    xSpeed: 6,
  };

  // Bad Item
  var mySquare2 = {
    x: 1080,
    y: 350,
    width: 100,
    height: 100,
    xSpeed: 7,
  };

  // Good Item 2
  var mySquare3 = {
    x: 1080,
    y: 250,
    width: 100,
    height: 100,
    xSpeed: 10,
  };

  // Bad Item 2
  var mySquare4 = {
    x: 1080,
    y: 350,
    width: 100,
    height: 100,
    xSpeed: 11,
  };

  var gameStart = false;
  var firstStart = 0;
  var level = 1;
  var bossLevel = 10;
  var levelclear = 1000;
  var lives = 10;
  var livesTemp = 10;
  var livesPrice = 100;
  var damage = 1;
  var points = 0;
  var multiplier = 1.25;
  var multiPoints = 10;
  var multPrice = 1000;
  var multLevel = 1;
  var variation = 0;
  var variation2 = 0;

  const healthUp = document.getElementById("healthButton");
  const pointsUp = document.getElementById("pointButton");

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //Drawing black circle to control
  function drawChar() {
    context.drawImage(charImage, myChar.x, myChar.y);
  }
  // Drawing green circle
  function drawItem() {
    context.drawImage(goodImage, mySquare.x, mySquare.y);
  }
  // Drawing red circle
  function drawItem2() {
    context.drawImage(badImage, mySquare2.x, mySquare2.y);
  }
  // Drawing green star
  function drawItem3() {
    context.drawImage(goodImage2, mySquare3.x, mySquare3.y);
  }
  // Drawing red star
  function drawItem4() {
    context.drawImage(badImage2, mySquare4.x, mySquare4.y);
  }

  function newPosition() {
    spot = getRndInteger(0, 2);
    if (spot === 0) {
      return 150;
    } else if (spot === 1) {
      return 250;
    } else if (spot === 2) {
      return 350;
    }
  }

  function healthButton() {
    //alert("First handler");
    if (points >= livesPrice) {
      lives = lives + 5;
      livesTemp = lives;
      points = points - livesPrice;
      livesPrice = livesPrice * 2;
    } else {
      alert("you don't have enough points.");
    }
  }

  function pointButton() {
    if (points >= multPrice) {
      multiplier = multiplier + 0.25;
      multiPoints = multiPoints * multiplier;
      points = points - multPrice;
      multPrice = multPrice * 2;
      multLevel = multLevel + 1;
    } else {
      alert("you don't have enough points.");
    }
  }

  healthUp.addEventListener("click", healthButton);
  pointsUp.addEventListener("click", pointButton);
  //second.onclick = handler1;
  //second.onclick = handler2;

  // Controls
  window.onkeydown = function (evt) {
    // Movement Up
    if (
      (evt.key == "w" && myChar.y > 150) ||
      (evt.key == "W" && myChar.y > 150)
    ) {
      myChar.y = myChar.y - 100;
    }
    // Movement Down
    if (
      (evt.key == "s" && myChar.y < 350) ||
      (evt.key == "S" && myChar.y < 350)
    ) {
      myChar.y = myChar.y + 100;
    }
    // Restart the game
    if (evt.key == "Enter" && level != 100) {
      gameStart = true;
    }
  };

  function animationFrame() {
    // Clears the whole canvas (1080-10 for portal effect)
    context.clearRect(0, 0, 1070, 600);

    // Go back to main menu when game is lost
    if (gameStart === false && firstStart === 0) {
      context.fillText("welcome to freescape.", 10, 150);
      context.fillText("press enter to play.", 10, 200);
    } else if (gameStart === false && firstStart === 1) {
      // 2nd time+ playing
      bgSound2.play();
      context.clearRect(0, 0, 1080, 600);
      context.fillText("freescape.", 10, 150);
      context.fillText("press enter to play again.", 10, 200);
    } else if (gameStart === false && firstStart === 2) {
      // Beating the game
      context.clearRect(0, 0, 1080, 600);
      context.fillText("thank you for playing freescape.", 10, 150);
    }

    // Starting the game
    if (lives > 0 && gameStart === true) {
      bgSound2.pause();
      bgSound2.currentTime = 0;
      bgSound.play();
      // Level Up based on points, speed of objects go faster
      if (points >= levelclear) {
        level = level + 1;
        damage = damage + 1;
        levelclear = levelclear + level * 1000;
        multiPoints = multiPoints + 10;
        if (mySquare.xSpeed <= 20) {
          mySquare.xSpeed = mySquare.xSpeed + 2;
          mySquare2.xSpeed = mySquare2.xSpeed + 2;

          if (level >= 5) {
            mySquare3.xSpeed = mySquare3.xSpeed + 2;
            mySquare4.xSpeed = mySquare4.xSpeed + 2;
          }
        }
      }

      // Items move to the left using speed
      mySquare.x = mySquare.x - mySquare.xSpeed;
      mySquare2.x = mySquare2.x - mySquare2.xSpeed;

      // Star items appear at level 5
      if (level >= 5) {
        mySquare3.x = mySquare3.x - mySquare3.xSpeed;
        mySquare4.x = mySquare4.x - mySquare4.xSpeed;
      }

      // Stars have varied movement
      if (mySquare3.x <= 750 && variation === 0) {
        mySquare3.y = newPosition();
        variation = 1;
      }
      if (mySquare4.x <= 750 && variation2 === 0) {
        mySquare4.y = newPosition();
        variation2 = 1;
      }

      // If player hits green gain points
      if (
        (mySquare.x <= 100 && myChar.y === mySquare.y) ||
        (mySquare3.x <= 100 && myChar.y === mySquare3.y)
      ) {
        points = Math.floor(points + multiPoints);
        goodSound.play();
      }
      // If player hits red lose health
      if (
        (mySquare2.x <= 100 && myChar.y === mySquare2.y) ||
        (mySquare4.x <= 100 && myChar.y === mySquare4.y)
      ) {
        lives = lives - damage;
        badSound.play();
      }

      // Items move from one end of the screen or picked up go back (y-coordinates randomly change)
      if (mySquare.x <= -100 || (mySquare.x <= 45 && myChar.y === mySquare.y)) {
        mySquare.x = 1080;
        mySquare.y = newPosition();
      }
      if (
        mySquare2.x <= -100 ||
        (mySquare2.x <= 45 && myChar.y === mySquare2.y)
      ) {
        mySquare2.x = 1080;
        mySquare2.y = newPosition();
      }
      if (
        mySquare3.x <= -100 ||
        (mySquare3.x <= 45 && myChar.y === mySquare3.y)
      ) {
        mySquare3.x = 1080;
        mySquare3.y = newPosition();
        variation = 0;
      }
      if (
        mySquare4.x <= -100 ||
        (mySquare4.x <= 45 && myChar.y === mySquare4.y)
      ) {
        mySquare4.x = 1080;
        mySquare4.y = newPosition();
        variation2 = 0;
      }

      drawItem();
      drawItem2();
      drawItem3();
      drawItem4();
      drawChar();

      // Tutorial controls: Shows only on the first round
      if (firstStart === 0) {
        context.fillText(" w ↑", 10, 25);
        context.fillText(" s ↓", 15.5, 50);
      }

      // Show Boss Level occurring
      if (level === bossLevel) {
        context.fillText("this is a boss level.", 10, 25);
      } else if (level > bossLevel) {
        bossLevel = bossLevel + 10;
      }
    }
    // Update attempt, music, position, speed
    if (lives <= 0 && level < 100) {
      gameStart = false;
      firstStart = 1;
      lives = livesTemp;
      bgSound.pause();
      bgSound.currentTime = 0;
      myChar.y = 250;
      mySquare.x = mySquare2.x = mySquare3.x = mySquare4.x = 1080;
      if (mySquare.xSpeed - 3 >= 6) {
        mySquare.xSpeed = mySquare.xSpeed - 3;
        mySquare2.xSpeed = mySquare2.xSpeed - 3;
        mySquare3.xSpeed = mySquare3.xSpeed - 3;
        mySquare4.xSpeed = mySquare4.xSpeed - 3;
      }
    }

    // Clear condition that ends the game at level 100
    if (level >= 100) {
      gameStart = false;
      firstStart = 2;
      bgSound.pause();
    }

    requestAnimationFrame(animationFrame);

    // Using Javascript data and converting it to HTML
    document.getElementById("insertLevel").innerHTML = "level " + level;
    document.getElementById("insertPoints").innerHTML = "points: " + points;
    document.getElementById("insertHealth").innerHTML = "health: " + lives;
    document.getElementById("insertPoint").innerHTML = livesPrice + " points";
    document.getElementById("insertMult").innerHTML = "level " + multLevel;
    document.getElementById("insertMult2").innerHTML =
      multiplier + "x point multiplier";
    document.getElementById("insertMult3").innerHTML = multPrice + " points";

    // Shop shows up before each game starts and only after gaining at least one level
    if (level >= 2 && gameStart === false && level < 100) {
      document.getElementById("insertShop").style.display = "block";
    } else {
      document.getElementById("insertShop").style.display = "none";
    }
  }
  animationFrame();
}
