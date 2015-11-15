var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var ninja;
var platforms;
var cursors;

function preload() {

    game.load.image('brick', 'assets/brick.png');
    game.load.image('floor', 'assets/floor.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('ninja', 'assets/ninja.png', 50, 77);

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
  floor = platforms.create(0 + i*32, game.world.height - 64, 'floor');
  floor.body.immovable = true;
}



ninja = game.add.sprite(50, 50, 'ninja');
ninja.animations.add('run', [16, 17, 18, 19, 20, 21, 22, 23], 30, true);

game.physics.arcade.enable(ninja);
ninja.body.bounce.y = 0;
ninja.body.gravity.y = 600;
ninja.body.collideWorldBounds = true;

cursors = game.input.keyboard.createCursorKeys();
}

function update() {
game.physics.arcade.collide(ninja, platforms);
movement();
}

function movement(){
  ninja.body.velocity.x = 0;

  if (cursors.left.isDown)
  {
      //  Move to the left
      ninja.body.velocity.x = -150;

      ninja.animations.play('run');
  }
  else if (cursors.right.isDown)
  {
      //  Move to the right
      ninja.body.velocity.x = 150;

      ninja.animations.play('run');
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
