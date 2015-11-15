var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var ninja;
function preload() {

    game.load.image('brick', 'assets/brick.png');
    game.load.image('floor', 'assets/floor.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('ninja', 'assets/ninja.png', 50, 77);

}

function create() {
for (var i = 0; i < 13; i++) {
  for (var j = 0; j < 10; j++) {
    game.add.sprite(0 + i*64, 0+ j*64, 'brick');
  }
}
ninja = game.add.sprite(50, 50, 'ninja');
ninja.animations.add('run', [16, 17, 18, 19, 20, 21, 22, 23], 30, true);

}

function update() {
ninja.animations.play('run');
}
