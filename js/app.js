var Y_STEP = 83;
var X_STEP = 101;
var maxEnemySpeed = 80;
var scoreboard = document.getElementById('scoreboard');
var level = document.getElementById('level');
var popup = document.getElementById('popup');

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

    this.speed = getRandomArbitrary(maxEnemySpeed - 60, maxEnemySpeed);
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.checkCollisions = function() {
    var itemX = Math.ceil(this.x);

    if( (this.y == player.y) && (itemX + 71 >= player.x && itemX - 50 <= player.x) ) {
        changeLevel(player.score = 0);
        player.reset();
        popup.className = 'show';
    }
};

Enemy.prototype.reinit = function() {
    if(this.x > 505) {
        this.x = -101;
        this.y = enemiesLines[ Math.round( getRandomArbitrary(0, 3) ) ];
        this.speed = getRandomArbitrary(maxEnemySpeed - 60, maxEnemySpeed);
    }
};

// Update the entity's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should speed any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    allEnemies.forEach(function(item, i, arr) {
        item.checkCollisions();
        item.reinit();

        item.x += (item.speed * dt);
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
            player.reset();
            // increase and show score
            changeLevel(this.score += 10);
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

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 385;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var numOfEnemies = 4;
var enemiesLines = [53, 136, 219];
var allEnemies = [];
var player = new Player({
    x: 202,
    y: 385,
    sprite: 'images/char-boy.png'
});

for(var i = 0; i < numOfEnemies; i++) {
    allEnemies.push( new Enemy({
        x: -101,
        y: enemiesLines[ Math.round( getRandomArbitrary(0, 3) ) ],
        sprite: 'images/enemy-bug.png'
    }) );
}

function changeLevel(value) {
    if(value <= 0) {
        scoreboard.innerHTML = 0;
        // change level to 1
        level.innerHTML = 1;
        maxEnemySpeed = 80;
        return;
    }

    scoreboard.innerHTML = value;

    // change level
    switch( Math.floor(value / 100) ) {
        case 1:
            level.innerHTML = 2;
            maxEnemySpeed = 85;
            break;
        case 2:
            level.innerHTML = 3;
            maxEnemySpeed = 90;
            break;
        case 3:
            level.innerHTML = 4;
            maxEnemySpeed = 95;
            break;
        case 4:
            level.innerHTML = 5;
            maxEnemySpeed = 100;
            break;
        case 5:
            level.innerHTML = 6;
            maxEnemySpeed = 105;
            break;
        case 6:
            level.innerHTML = 7;
            maxEnemySpeed = 110;
            break;
        case 7:
            level.innerHTML = 8;
            maxEnemySpeed = 115;
            break;
        case 8:
            level.innerHTML = 9;
            maxEnemySpeed = 120;
            break;
        case 9:
            level.innerHTML = 10;
            maxEnemySpeed = 125;
            break;
    }

    allEnemies.forEach(function(item, i, arr) {
        item.speed = getRandomArbitrary(maxEnemySpeed - 1, maxEnemySpeed);
    });
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

    // if popup is open
    if(popup.classList.contains('show')) {
        // hide popup
        popup.className = '';
        return;
    }

    player.handleInput(allowedKeys[e.keyCode]);
});

popup.addEventListener('click', function(e) {
    popup.className = '';
});
