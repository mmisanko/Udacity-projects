
// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // X pos
    // Y pos
    this.x = x;
    this.y = y+55;
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
    this.speed = speed;


    this.victory = false;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemy is not passed boundary
    if (this.x < this.boundary) {
        // move forward
        // increment x by speed * dt
        this.x += this.speed * dt;
    }
    // else
        // reset to start point
    else {
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    this.x;
    this.y;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player Class "Hero"
class Hero {

    // Constructor || Properties : x pos, y pos + sprite img
    constructor() {
        // Top left corner of the board
        this.x = 0;
        this.y = 0;

        // Spaces between blocks, this numbers comes from engine.js
        this.jump = 83;
        this.step = 101;

        // Start place on the bottmo middle row
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;

        // update the init location for our player "Hero"
        this.x = this.startX;
        this.y = this.startY;

        // This is the image of the player
        this.sprite = "images/char-cat-girl.png";
    }

// Methods :

    // update()
    update() {
        // check collision here
        // did player x and y collide with enemy?
        for (let enemy of allEnemies) {
            // console.log(enemy);
            if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
                this.reset()
                console.log(Touch);
            }
        }
        // did the player touch the top row?
        if (this.y === -28) {
            this.victory = true;
            console.log('winner');
        }
    }

    // render()
        // Draw player sprite on current x & y position?
        render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }

    // handleInput()
        // handle keyboard input to move the player x or y
        // @param {string} input - Direction to travel

        handleInput(input) {
            switch(input) {
                case 'left' : if (this.x > 0) { this.x -= this.step }
                break;
                case 'up' : if (this.y > 0) { this.y -= this.jump }
                break;
                case 'right' : if (this.x < this.step * 4) { this.x += this.step }
                break;
                case 'down' : if (this.y < this.jump * 4) { this.y += this.jump }
                break;

            } console.log(`Hero x: ${this.x} | y: ${this.y}`);
        }

    // Reset the position x & y to the player to old location
    reset() {
        this.y = this.startY;
        this.x = this.startX;
    }


}

// add class Prize()
    // render()
    // update()
    //

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// New player object "Hero"
// init allEnemies array
// for each enemy create & push Enemy object into above array
const player = new Hero(),
    bug1 = new Enemy(-101, 0, 200),
    bug2 = new Enemy(-101, 83, 300),
    bug3 = new Enemy(-101*2.5, 83, 300),
    bug4 = new Enemy(-101, 83*2, 250),
    allEnemies = [];
allEnemies.push(bug1,bug2,bug3,bug4);


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




/*
******* Start functions ******
*/


// array will hold selected hero image
let selectedHeroArr = [];

// selectors
const heroImages = document.querySelector('.hero-images');
const startBtn = document.querySelector('.modal_start_btn');

// listen to click
heroImages.addEventListener('click', event => {
    const clickTarget = event.target;
    if (clickTarget.classList.contains('hero')){
        clickTarget.classList.add('selected');
        addSelectedHero(clickTarget);
        selectAndDeselect ();
        getSpriteString();
    }
console.log('image selected');
});

// push selected images to "selectedHeroArr" array
function addSelectedHero(clickTarget) {
    selectedHeroArr.push(clickTarget);
    console.log(selectedHeroArr);
}

// changing css classes
function selectAndDeselect() {
    if (selectedHeroArr.length > 1) {
        selectedHeroArr[0].classList.remove("selected");
        selectedHeroArr[1].classList.add("selected");
        selectedHeroArr = [selectedHeroArr[1]];
    };
        console.log('Player selected');
}

// Get the parent class and returned as a string
function getSpriteString() {
    const parent = selectedHeroArr[0].parentElement;
    let parentString = parent.classList[0];
    console.log(parentString + ' Menas');
    return parentString;
}

//startBtn.addEventListener('click', isHeroSelected);


// MODAL Start"
function toggleStartModal() {
    const modal = document.querySelector('.modal_start');
    modal.classList.toggle('hide');
}
