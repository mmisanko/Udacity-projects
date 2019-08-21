// Hero class
class Hero {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.horizontal = 101;
    this.vertical = 83;
    this.startX = this.horizontal * 2;
    this.startY = this.vertical * 5 - 20;
    this.x = this.startX;
    this.y = this.startY;
  }

  update() {
    // Check collision here
    for (let enemy of allEnemies) {
      // Did player x and y collide with enemy?
      if (this.y === enemy.y) {
      console.log('Same row!');
    }
    console.log(this.y, enemy.y)
  }
    // Check win here?
      // Did player x and y reach final tile?
  }

  // Draw player sprite on current x and y coord position
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  /**
   * Update player's x and y property according to input
   *
   * @param {string} input - Direction to travel
   */
  handleInput(input) {
    switch(input) {
      case 'left':
          if (this.x > 0) {
            this.x -= this.horizontal;
          }
        break;
      case 'up':
          if (this.y > 0) {
            this.y -= this.vertical;
          }
        break;
      case 'right':
          if (this.x < this.horizontal * 4) {
            this.x += this.horizontal;
          }
        break;
      case 'down':
          if (this.y < this.vertical * 4) {
            this.y += this.vertical;
          }
        break;
  }
}
};

    // Methods
      // Update position



      // Check win here?
        // Did player x and y reach final tile?
      // Render

      // Handle keyboard input
          //
      // Reset Hero
          // Set x and y to starting x and y

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y + 60;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary =  this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If enemy is not passed boundary
    if(this.x < this.boundary) {
      // Move forward
      // Increment x by speed * dt
        this.x += this.speed * dt;
    }
     else
     // reset position to start
        this.x = this.resetPos;
};

// New Hero object
const player = new Hero();
// New Enemy object
const beetle1 = new Enemy(-101, 0, 200);
const beetle2 = new Enemy((-101 * 4), 0, 200);
const beetle3 = new Enemy(-101, 83, 320);
const beetle4 = new Enemy((-101 * 2.5), 168, 200);
const beetle5 = new Enemy((-101 * 5), 168, 200);
// Init allEnemies array
const allEnemies = [];
// For each enemy create and push new Enemy object into above array
allEnemies.push(beetle1, beetle2, beetle3, beetle4, beetle5);
console.log(allEnemies);

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
