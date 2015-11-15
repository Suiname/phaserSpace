var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var ninja;
var platforms;
var cursors;
var zombie;
var enemies;

function preload() {

    game.load.image('brick', 'assets/brick.png');
    game.load.image('floor', 'assets/floor.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('ninja', 'assets/ninja.png', 50, 77);
    game.load.spritesheet('zombie', 'assets/zombie.png', 64, 64);

}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

for (var i = 0; i < 13; i++) {
  for (var j = 0; j < 10; j++) {
    game.add.sprite(0 + i*64, 0+ j*64, 'brick');
  }
}

platforms = game.add.group();
platforms.enableBody = true;

var floor;
for (var i = 0; i < 26; i++) {
  floor = platforms.create(0 + i*32, game.world.height - 16, 'floor');
  floor.body.immovable = true;
}



ninja = game.add.sprite(50, 50, 'ninja');
ninja.animations.add('run_right', [16, 17, 18, 19, 20, 21, 22, 23], 30, true);
ninja.animations.add('run_left', [8, 9, 10, 11, 12, 13, 14, 15], 30, true);
game.physics.arcade.enable(ninja);
ninja.body.bounce.y = 0;
ninja.body.gravity.y = 600;
ninja.body.collideWorldBounds = true;
ninja.anchor.setTo(.5);

zombie = game.add.sprite(650, 500, 'zombie');
zombie.animations.add('left', [0,1,2,3,4,5,6,7,8,9], 30, true);
game.physics.arcade.enable(zombie);
zombie.body.bounce.y = 0;
zombie.body.gravity.y = 900;
zombie.body.collideWorldBounds = true;
zombie.direction = 'left';
zombie.anchor.setTo(.5);
enemies = game.add.group();
enemies.add(zombie);


cursors = game.input.keyboard.createCursorKeys();
}

function update() {
game.physics.arcade.collide(ninja, platforms);
game.physics.arcade.overlap(ninja, enemies);
game.physics.arcade.collide(enemies, platforms);
movement();
enemyMovement();
}

function movement(){
  ninja.body.velocity.x = 0;

  if (cursors.left.isDown)
  {
      //  Move to the left
      ninja.body.velocity.x = -150;

      ninja.animations.play('run_left');
  }
  else if (cursors.right.isDown)
  {
      //  Move to the right
      ninja.body.velocity.x = 150;

      ninja.animations.play('run_right');
  }
  else
  {
      //  Stand still
      ninja.animations.stop();

      ninja.frame = 0;
  }

  //  Allow the player to jump if they are touching the ground.
  if (cursors.up.isDown && ninja.body.touching.down)
  {
      ninja.body.velocity.y = -350;
  }
}

function enemyMovement(){
  if (zombie.direction == 'right' && zombie.body.x < 736) {
    zombie.body.velocity.x = 100;
    zombie.direction = 'right';
  } else if (zombie.body.x < 1 && zombie.direction == 'left') {
    zombie.body.velocity.x = 100;
    zombie.scale.x = -1;
    zombie.direction = 'right';
  } else if (zombie.body.x >= 736 && zombie.direction == 'right'){
    zombie.direction = 'left';
    zombie.scale.x = 1;
    zombie.body.velocity.x = -100;
    zombie.animations.play('left');
  } else if (zombie.direction == 'left') {
    zombie.body.velocity.x = -100;
    zombie.animations.play('left');
    zombie.direction = 'left';
  }

}
