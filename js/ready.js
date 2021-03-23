function ready() {
    
    var canvas = document.getElementById('myCanvas');
    canvas.width = 1080;
    canvas.height = 500;
                
    var context = canvas.getContext('2d');
    context.font = "25px Arial";
    
    var goodSound = new Audio();
    goodSound.src = 'audio/good.wav';
    
    var badSound = new Audio();
    badSound.src = 'audio/bad.wav';
    
    var bgSound = new Audio();
    bgSound.src = 'audio/bg.wav';
    
    var bgSound2 = new Audio();
    bgSound2.src = 'audio/bg2.wav';
    
    var charImage = new Image();
    charImage.src = 'img/char.png';
    
    var goodImage = new Image();
    goodImage.src = 'img/good.png';
    
    var badImage = new Image();
    badImage.src = 'img/bad.png';
    
    // Control character
    var myChar = {
        'x': 0,
        'y': 250,
        'w': 0,
        'h': 0
    };
    
    //Good Item
    var mySquare = {
        'x': 1080,
        'y': 150,
        'width': 100,
        'height': 100,
        'xSpeed': 6
    };

    var mySquare3 = mySquare;
    
    // Bad Item
    var mySquare2 = {
        'x': 1080,
        'y': 350,
        'width': 100,
        'height': 100,
        'xSpeed': 7
    };
    
    var gameStart = false;
    var firstStart = 0;
    var randomSpot = 0;
    var randomSpot2 = 2;
    var level = 1;
    var levelclear = 1000;
    var lives = 5;
    var livesTemp = 5;
    var livesPrice = 100;
    var damage = 1;
    var points = 0;
    var multiplier = 1.25;
    var multiPoints = 10;
    var multPrice = 1000;
    var multLevel = 1;
    
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
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

    const healthUp = document.getElementById("healthButton");
    const pointsUp = document.getElementById("pointButton");

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
    window.onkeydown = function(evt) {
        // Movement Up
        if (evt.key == "w" && myChar.y > 150 || evt.key == "W" && myChar.y > 150) {
            myChar.y  = myChar.y - 100;
        }
        // Movement Down
        if (evt.key == "s" && myChar.y < 350 || evt.key == "S" && myChar.y < 350) {
            myChar.y  = myChar.y + 100;
        }
        // Restart the game
        if (evt.key == "Enter") {
            gameStart = true;
        }
        //console.log(evt.key);
    }

    function animationFrame() {
        
        // Clears the whole canvas (1080-10 for portal effect)
        context.clearRect(0,0,1070,600);

        // Go back to main menu when game is lost
        if (gameStart === false && firstStart === 0) {
            context.fillText("welcome to freescape.",10,150);
            context.fillText("press enter to play.",10,200);
        } else if (gameStart === false && firstStart === 1) {
            bgSound2.play();
            context.clearRect(0,0,1080,600);
            context.fillText("freescape.",10,150);
            context.fillText("press enter to play again.",10,200);
        }

        // Starting the game
        if(lives > 0 && gameStart === true) {
            bgSound2.pause();
            bgSound2.currentTime = 0;
            bgSound.play();
            // Level Up based on points, speed of objects go faster
            if(points >= levelclear) {
                level = level + 1;
                damage = damage + 1;
                levelclear = levelclear + level * 1000;
                mySquare.xSpeed = mySquare.xSpeed + 3;
                mySquare2.xSpeed = mySquare2.xSpeed + 3;
            }

            // Items move to the left using speed
            mySquare.x = mySquare.x - mySquare.xSpeed;
            mySquare2.x = mySquare2.x - mySquare2.xSpeed;
            
            
            // Each items new spots
            if (randomSpot === 0) {
                mySquare.y = 150;
            } else if (randomSpot === 1) {
                mySquare.y = 250;
            } else if (randomSpot === 2) {
                mySquare.y = 350;
            }
            if (randomSpot2 === 0) {
                mySquare2.y = 150;
            }else if (randomSpot2 === 1) {
                mySquare2.y = 250;
            }else if (randomSpot2 === 2) {
                mySquare2.y = 350;
            }
            
            // Items moved from one end of the screen or picked up go back
            if (mySquare.x <= -100 || myChar.x >= mySquare.x && myChar.y === mySquare.y) {
                mySquare.x = 1080;
                // Before items go back their y-coordiates randomly change
                randomSpot = getRndInteger(0,2);
            }

            if (mySquare2.x <= -100 || myChar.x >= mySquare2.x && myChar.y === mySquare2.y) {
                mySquare2.x = 1080;
                // Before items go back their y-coordiates randomly change
                randomSpot2 = getRndInteger(0,2);
            }

            // If player hits green gain points
            if (myChar.x + 100 >= mySquare.x && myChar.y === mySquare.y) {
                points = Math.floor(points + multiPoints);
                goodSound.play();
            }
            // If player hits red lose health
            if (myChar.x + 100 >= mySquare2.x && myChar.y === mySquare2.y) {
                lives = lives - damage;
                badSound.play();
            }
            
            drawItem();
            drawItem2();
            drawChar();
            
            //Tutorial controls: Shows only on the first round
            if (firstStart === 0) {
                context.fillText(" w ↑",10,25);
                context.fillText(" s ↓",15.5,50);
            }
        
        }
        //Update attempt, music, position, speed
        if (lives <= 0) {
            gameStart = false;
            firstStart = 1;
            lives = livesTemp;
            bgSound.pause();
            bgSound.currentTime = 0;
            myChar.y = 250;
            mySquare.x = 1080;
            mySquare.xSpeed = 6;
            mySquare2.x = 1080;
            mySquare2.xSpeed = 7;
        }
        requestAnimationFrame(animationFrame);
        document.getElementById("insertLevel").innerHTML = "level " + level;
        document.getElementById("insertPoints").innerHTML = "points: " + points;
        document.getElementById("insertHealth").innerHTML = "health: " + lives;
        document.getElementById("insertPoint").innerHTML = livesPrice + " points";
        document.getElementById("insertMult").innerHTML = "level " + multLevel;
        document.getElementById("insertMult2").innerHTML = multiplier + "x point multiplier";
        document.getElementById("insertMult3").innerHTML = multPrice + " points";
        if (level >= 2 && gameStart === false) {
            document.getElementById("insertShop").style.display = "block";
        } else {
            document.getElementById("insertShop").style.display = "none";
        }
    }
    animationFrame();
}