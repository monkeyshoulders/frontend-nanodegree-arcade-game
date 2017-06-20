// values
var blockHeight = 83;
var blockWidth = 101;
var xLimit = 505;
var yLimit = -30;
var enemyStart = -100;
var initialPlayer = [7, 400];
var initialPositions = [60, 145, 225];
var chars = [
  'images/char-boy.png',
  'images/char-pink-girl.png',
  'images/char-princess-girl.png',
  'images/char-cat-girl.png',
  'images/char-horn-girl.png'
];
// random character spawn everytime game is reset
var randChar = chars[Math.floor(Math.random() * chars.length)];


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.width = 80;
  this.height = 25;
  this.speed = Math.floor(Math.random() * 300);
  this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if (this.x >= xLimit) {
    this.x = enemyStart;
  }
  this.collision();
};

//Add collision detection
// Pulled from MDN 2D collision detection
// Credits https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.collision = function() {

  if (this.x < player.x + player.width &&
    this.x + this.width > player.x &&
    this.y < player.y + player.height &&
    this.height + this.y > player.y) {
    // sets player to a restart point instead of initialPlayer position
    player.restart();
  }

};

//renders Enemy
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.width = 50;
  this.height = 40;
  this.sprite = randChar;
};

Player.prototype.update = function() {
  if (this.y <= -15) {
    this.restart();
  }
};

// renders player sprite on screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// sets a restart point for player different from initialPlayer position
Player.prototype.restart = function() {
  this.x = 205;
  this.y = 392;
};

// player movement inside game
Player.prototype.handleInput = function(input) {
  //console.log(input);
  if (this.x > 0 && input === "left") {
    this.x -= blockWidth;
  }
  if (this.x < 400 && input === "right") {
    this.x += blockWidth;
  }
  if (this.y > 0 && input === "up") {
    this.y -= blockHeight;
  }
  if (this.y < 400 && input === "down") {
    this.y += blockHeight;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 3; i++) {
  allEnemies[i] = new Enemy(-100, initialPositions[i]);
}

// Place the player object in a variable called player
var player = new Player(7, 400);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
