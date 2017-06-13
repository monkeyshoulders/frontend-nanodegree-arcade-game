// values
var blockHeight = 83;
var blockWidth = 101;
var xLimit = 505;
var yLimit = 50;
var enemyStart = -100;
var playerX = 175;
var playerY = 325;
var playerH = 83;
var playerW = 68;
var enemyH = 64;
var enemyW = 96;
var initialPositions = [60, 145, 225];
var eSpeed = [2, 4, 6, 8];
var randomSpeed = eSpeed[Math.floor(Math.random() * eSpeed.length)];
// var
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
  this.x = x; //horizontal position
  this.y = y; //verticle position
  this.speed = randomSpeed;
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

Enemy.prototype.update = function(dt) {

  this.x += this.speed;
 // this.x = this.x + this.speed * dt;
 // if (this.x <= xLimit) {                //check this
 //   this.x = enemyStart;
 // }

  this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  // https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/drawImage
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function() {
  //console.log("checkCollision");
};

var collision = function() {
  if (enemy.x < player.x + playerW && enemy.x + enemyW > player.x && enemy.y < player.y + playerH && enemyH + enemy.y > player.y) {
    player.restart;                              //check this
  }                                   // JS Hint- 53	Expected an assignment or function
};                                       // call and instead saw an expression.

var Player = function(x, y) {
  this.x = x;
  this.y = y;
  // this.sprite = 'images/char-boy.png';
  this.sprite = randChar; //this may be a mistake and need to be fixed with Karol
};

// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  // this.x = this.x * dt;
  // this.y = this.y * dt;
  // if (this.y <= yLimit) { //reaches verticle limit
  //   this.restart();
  // }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player.prototype.restart = function() {
//   this.x = playerX;
//   this.y = playerY;
// };

Player.prototype.handleInput = function(input) {
  //console.log(input);
  if (this.x > 0 && input === "left") {
    this.x -= blockWidth;
  }
  if (this.x < playerY && input === "right") {
    this.x += blockWidth;
  }
  if (this.y > 0 && input === "up") {
    this.y -= blockHeight;
  }
  if (this.y < playerY && input === "down") {
    this.y += blockHeight;
  }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 3; i++) {
  // Next step: different x and y coordinates, use, for example, randomness
  //allEnemies[i] = new Enemy(10,10,10);      //  being called
  allEnemies[i] = new Enemy(-100, initialPositions[i], 50);      //  being called
}
allEnemies.push();
// Place the player object in a variable called player
var player = new Player(200, 400);

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
