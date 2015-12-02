var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var ninja;
var platforms;
var ladders;
var cursors;
var zombie;
var enemies;
var treasure;

function preload() {

    game.load.image('brick', 'assets/brick.png');
    game.load.image('floor', 'assets/floor.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('ladder', 'assets/ladder.png')
    game.load.image('chest', 'assets/chest.png')
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
ladders = game.add.group();
ladders.enableBody = true;

var l = new ladder(150,300);
var t = new chest(600, 300);

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

enemies = game.add.group();
for (var i = 0; i < 4; i++) {
  var test = new enemy(Math.random()*700, Math.random()*400);
}



cursors = game.input.keyboard.createCursorKeys();
}

function update() {
game.physics.arcade.collide(ninja, platforms);
game.physics.arcade.overlap(ninja, treasure);
game.physics.arcade.collide(platforms, treasure);
game.physics.arcade.overlap(ninja, enemies, death, enemyCollision);
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
  enemies.forEachAlive(function(z){
  if (z.direction == 'right' && z.body.x < 736) {
    z.body.velocity.x = 100;
    z.direction = 'right';
  } else if (z.body.x < 1 && z.direction == 'left') {
    z.body.velocity.x = 100;
    z.scale.x = -1;
    z.direction = 'right';
  } else if (z.body.x >= 736 && z.direction == 'right'){
    z.direction = 'left';
    z.scale.x = 1;
    z.body.velocity.x = -100;
    z.animations.play('left');
  } else if (z.direction == 'left') {
    z.body.velocity.x = -100;
    z.animations.play('left');
    z.direction = 'left';
  }
}, this);
}

function death() {
  ninja.kill();
}

function enemyCollision(nin, zom) {
  if (Math.abs(nin.body.x - zom.body.x) <= 20 && Math.abs(nin.body.y - zom.body.y) <= 32) {
    return true;
  } else {
    return false;
  }
}

function enemy(xcoord, ycoord){
  var zomb = game.add.sprite(xcoord, ycoord, 'zombie');
  zomb.animations.add('left', [0,1,2,3,4,5,6,7,8,9], 30, true);
  game.physics.arcade.enable(zomb);
  zomb.body.bounce.y = 0;
  zomb.body.gravity.y = 900;
  zomb.body.collideWorldBounds = true;
  zomb.direction = 'left';
  zomb.anchor.setTo(.5);
  enemies.add(zomb);
  return zomb;
}

function ladder(xcoord, ycoord){
  var ladd = ladders.create(xcoord, ycoord, 'ladder');
  ladd.body.immovable = true;
}

function chest(xcoord, ycoord){
  treasure = game.add.sprite(xcoord, ycoord, 'chest');
  game.physics.arcade.enable(treasure);
  treasure.body.bounce.y = 0;
  treasure.body.gravity.y = 1500;
  treasure.anchor.setTo(.5);
  return treasure;
}
