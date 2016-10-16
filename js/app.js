var Y_STEP = 83;
var X_STEP = 101;
var scoreboard = document.getElementById('scoreboard');

var Entity = function(settings) {
    this.x = settings.x;
    this.y = settings.y;
    this.sprite = settings.sprite;
}

// Draw the entity on the screen, required method for game
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(settings) {
    Entity.apply(this, arguments);

    this.multiply = getRandomArbitrary(0.5, 1);
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

// Update the entity's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    allEnemies.forEach(function(item, i, arr) {
        // Check collisions with player
        if( (item.y == player.y) && (Math.ceil(item.x) + 71 >= player.x && Math.ceil(item.x) - 50 <= player.x) ) {
            fillScoreboard(player.score = 0);
            player.x = 202;
            player.y = 385;
        }

        if(item.x > 505) {
            item.x = -101;
            this.multiply = getRandomArbitrary(0.2, 1);
        }

        item.x += item.multiply;
    });
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(settings) {
    Entity.apply(this, arguments);

    this.score = 0;

    // setter for X value
    this.setX = function(value) {
        if(value > 404 || value < 0) return;

        this.x = value;
    }

    // setter for Y value
    this.setY = function(value) {
        // move player on start position
        if(value <= -30) {
            this.x = 202;
            this.y = 385;
            // increase and show score
            fillScoreboard(this.score += 10);
            return;
        }

        if(value > 385) return;

        this.y = value;
    }
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Enemy;

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            this.setX(this.x - X_STEP);
            break;
        case 'up':
            this.setY(this.y - Y_STEP);
            break;
        case 'right':
            this.setX(this.x + X_STEP);
            break;
        case 'down':
            this.setY(this.y + Y_STEP);
            break;
    }
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    this.x = this.x;
    this.y = this.y;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var numOfEnemies = 3;
var allEnemies = [];
var player = new Player({
    x: 202,
    y: 385,
    sprite: 'images/char-boy.png'
});

for(var i = 0; i < numOfEnemies; i++) {
    allEnemies.push( new Enemy({
        x: -101,
        y: i * Y_STEP + 53,
        sprite: 'images/enemy-bug.png'
    }) );
}

function fillScoreboard(value) {
    if(value < 0) {
        scoreboard.innerHTML = 0;
        return;
    }

    scoreboard.innerHTML = value;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
