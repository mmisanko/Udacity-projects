/***********app.js****************
 **********************************/
//game's initial level
var level = 1;
// Enemies our player must avoid
var Enemy = function(locX, locY) {
  this.sprite =
    "https://raw.githubusercontent.com/udacity/frontend-nanodegree-arcade-game/master/images/enemy-bug.png";
  this.x = locX;
  this.y = locY;
  this.argument1 = locX;
  this.argument2 = locY;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  //sets the speed of the Enemy based on the level
  if (level === 1) {
    for (var i = 0; i < allEnemies.length; i++) {
      allEnemies[i].speed = 160;
    }
  }
  if (level === 2) {
    for (var j = 0; j < allEnemies.length; j++) {
      allEnemies[j].speed = 210;
    }
  }
  if (level === 3) {
    for (var k = 0; k < allEnemies.length; k++) {
      allEnemies[k].speed = 260;
    }
  }
  // multiplying any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  this.x = this.x + this.speed * dt;

  //reset enemy's position
  if (this.x >= 500) {
    this.reset();
  }
  //handling collision with the enemies
  if (player.x >= this.x - 40 && player.x <= this.x + 40) {
    if (player.y >= this.y - 40 && player.y <= this.y + 40) {
      player.x = 200;
      player.y = 400;
    }
  }
};
Enemy.prototype.reset = function() {
  this.x = this.argument1;
  this.y = this.argument2;
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y) {
  this.sprite =
    "https://raw.githubusercontent.com/udacity/frontend-nanodegree-arcade-game/master/images/char-boy.png";
  this.x = x;
  this.y = y;
};
Player.prototype.update = function(dt) {
  //changes, handles and displays the level
  if (this.y < -18) {
    this.reset();
    level++;
    if (level > 3) {
      $("h3")
        .css("display", "block")
        .append("You Win!")
        .addClass("animated infinite pulse");
      setTimeout(showResult, 1000);
      level = 1;
    }
    document.getElementById("myspan").innerHTML = level;
  }
};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(rcv) {
  if (rcv === "left" && this.x > 0) this.x = this.x - 20;
  else if (rcv === "right" && this.x < 400) this.x = this.x + 20;
  else if (rcv === "up" && this.y > -50) this.y = this.y - 20;
  else if (rcv === "down" && this.y < 400) this.y = this.y + 20;
};
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

var showResult = function() {
  $("h3")
    .css("display", "none")
    .text("");
};

// Now instantiate your objects.
var enemy1 = new Enemy(-100, 60);
var enemy2 = new Enemy(-600, 60);
var enemy3 = new Enemy(-165, 140);
var enemy4 = new Enemy(-500, 140);
var enemy5 = new Enemy(-200, 220);
var enemy6 = new Enemy(-400, 220);
var enemy7 = new Enemy(-300, 60);
var enemy8 = new Enemy(-300, 140);
var player1 = new Player(200, 400);

var allEnemies = [
  enemy1,
  enemy2,
  enemy3,
  enemy4,
  enemy5,
  enemy6,
  enemy7,
  enemy8
];
var player = player1;

//for playing with a touch device like smartphone
$(function() {
  $("canvas").bind("swipeleft", function() {
    player.handleInput("left");
  });

  $("canvas").bind("swiperight", function() {
    player.handleInput("right");
  });

  $("canvas").bind("swipeup", function() {
    player.handleInput("up");
  });

  $("canvas").bind("swipedown", function() {
    player.handleInput("down");
  });
});

//for playing with keyboard
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

//swipedown and swipe up code
(function() {
  var supportTouch = $.support.touch,
    scrollEvent = "touchmove scroll",
    touchStartEvent = supportTouch ? "touchstart" : "mousedown",
    touchStopEvent = supportTouch ? "touchend" : "mouseup",
    touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
  $.event.special.swipeupdown = {
    setup: function() {
      var thisObject = this;
      var $this = $(thisObject);
      $this.bind(touchStartEvent, function(event) {
        var data = event.originalEvent.touches
            ? event.originalEvent.touches[0]
            : event,
          start = {
            time: new Date().getTime(),
            coords: [data.pageX, data.pageY],
            origin: $(event.target)
          },
          stop;

        function moveHandler(event) {
          if (!start) {
            return;
          }
          var data = event.originalEvent.touches
            ? event.originalEvent.touches[0]
            : event;
          stop = {
            time: new Date().getTime(),
            coords: [data.pageX, data.pageY]
          };

          // prevent scrolling
          if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
            event.preventDefault();
          }
        }
        $this
          .bind(touchMoveEvent, moveHandler)
          .one(touchStopEvent, function(event) {
            $this.unbind(touchMoveEvent, moveHandler);
            if (start && stop) {
              if (
                stop.time - start.time < 1000 &&
                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                Math.abs(start.coords[0] - stop.coords[0]) < 75
              ) {
                start.origin
                  .trigger("swipeupdown")
                  .trigger(
                    start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown"
                  );
              }
            }
            start = stop = undefined;
          });
      });
    }
  };
  $.each(
    {
      swipedown: "swipeupdown",
      swipeup: "swipeupdown"
    },
    function(event, sourceEvent) {
      $.event.special[event] = {
        setup: function() {
          $(this).bind(sourceEvent, $.noop);
        }
      };
    }
  );
})();
