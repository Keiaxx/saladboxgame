import { Scene } from 'phaser'

import MainCharacter from '../classes/characters/MainCharacter'

var image1
var tween
var iter = 0

var anim
var sprite

var cursors
var player
var walksprite
var move = false
var moveRight = false
export default class StartGameScene extends Scene {
  constructor () {
    super({key: 'StartGameScene'})
  }

  update (time, delta) {
    this.player.update(this.input, move, cursors, time, delta);
  }

  create () {
    //
    // this.add.image(1,1, 'back1')

    // skin1:
    // row1: intense idle anim
    // row2: walk anim
    // row3: subtle idle anim

    this.cameras.main.roundPixels = true;

    this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height, true, true, true, true)

    var scale = 3
    this.cameras.main.setBackgroundColor('rgba(255, 255, 255, 0.5)')


    // var intenseidle_anim = this.anims.create(intenseidle);
    // var iisprite = this.add.sprite(200, 300, 'char1').setScale(scale);
    // iisprite.anims.load('intenseidle');
    // iisprite.anims.play('intenseidle');

    // walksprite = this.add.sprite(300, 300, 'char1').setScale(scale);
    // walksprite.anims.load('walk');
    // walksprite.anims.play('walk');

    // player = this.physics.add.sprite(200, 300, 'char1', 6).setScale(scale)

    this.player = new MainCharacter({
      scene: this,
      key: 'char1',
      x: 200,
      y: 300,
      scale: scale
    })


    //
    // var subtle = {
    //     key: 'subtle',
    //     frames: this.anims.generateFrameNumbers('char1', { start: 9, end: 11 }),
    //     frameRate: 10,
    //     yoyo: false,
    //     repeat: -1
    // };
    // this.anims.create(subtle);
    // var subsprite = this.add.sprite(400, 300, 'char1').setScale(scale);
    // subsprite.anims.load('subtle');
    // subsprite.anims.play('subtle');

    const logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'logo')
    const startButton = this.add.image(this.cameras.main.centerX, logo.y + 100, 'startbutton')

    this.add.text(16, 16, 'v0.01', {fontSize: '16px', fontFamily: 'adventurer', fill: '#FFF'})
    this.add.text(16, this.sys.game.config.height - 20, 'Song: Saladbox Adventure - Keiaxx', {
      fontSize: '16px',
      fontFamily: 'adventurer',
      fill: '#FFF'
    })

    logo.setScale(1.5, 1.5)
    startButton.setScale(0.8, 0.8)
    startButton.setInteractive().on('pointerdown', () => {
      console.log('START CLICKED')
      this.scene.start('UserInterfaceScene')
      this.scene.start('introScene')
    }).on('pointerover', () => {
      startButton.setAlpha(0.5)
    }).on('pointerout', () => {
      startButton.setAlpha(1)
    })

    let music = this.sound.add('theme')

    music.play()
    music.setLoop(true)
    music.setVolume(0.02)

    this.tweens.add({
      targets: logo,
      y: this.cameras.main.centerY - 10,
      duration: ((60000 / 145) / 2),
      ease: 'Power2',
      yoyo: true,
      loop: -1
    })

    var self = this
    this.events.on('shutdown', function () {
      console.log('Stopping menu music')
      music.stop()
    })

    // this.cameras.main.startFollow(player);
    // this.cameras.main.roundPixels = true;

    cursors = this.input.keyboard.createCursorKeys()

    this.input.on('pointerdown', function (cursor) {
      move = true
    }, this)

    this.input.on('pointerup', function (cursor) {
      move = false
    }, this)
  }
}
