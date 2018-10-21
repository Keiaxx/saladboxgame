import { Scene } from 'phaser'

import MainCharacter from '../classes/characters/MainCharacter'
import forestJSON from '../assets/maps/forest/forest.json'

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
  // constructor () {
  //   super({
  //     key: 'StartGameScene',
  //     physics: {
  //       arcade: {
  //         debug: true,
  //         gravity: { y: 200 }
  //       },
  //       matter: {
  //         debug: true,
  //         gravity: { y: 0.5 }
  //       }
  //     }
  //   })
  // }
  constructor () {
    super({key: 'StartGameScene'})
  }

  update (time, delta) {
    //this.physics.world.collide(this.player, this.button_resume);
    this.player.update(this.input, move, cursors, time, delta);
    this.forest1.tilePositionX -= 2;
    this.forest2.tilePositionX -= 1.9;
    this.forest3.tilePositionX -= 1.7;
    this.forest4.tilePositionX -= 1.5;
    this.forest5.tilePositionX -= 1.3;
    this.forest6.tilePositionX -= 1.1;
    this.forest7.tilePositionX -= 1.0;
    this.forest8.tilePositionX -= .9;
    this.forest9.tilePositionX -= .7;
    this.forest10.tilePositionX -= .5;
    this.forest11.tilePositionX -= .3;

  }

  preload(){
    this.load.tilemapTiledJSON("forestmap", forestJSON)
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
    //this.matter.world.setBounds();

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


    this.forest11 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, this.game.config.width, 793, 'forest11')
    this.forest10 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, this.game.config.width, 793, 'forest10')
    this.forest9 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, this.game.config.width, 793, 'forest9')
    this.forest8 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, this.game.config.width, 793, 'forest8')
    this.forest7 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, this.game.config.width, 793, 'forest7')
    this.forest6 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, this.game.config.width, 793, 'forest6')
    this.forest5 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, this.game.config.width, 793, 'forest5')
    this.forest4 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, this.game.config.width, 793, 'forest4')

    this.forest3 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, this.game.config.width, 793, 'forest3')

    this.forest2 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, this.game.config.width, 793, 'forest2')


    this.player = new MainCharacter({
      scene: this,
      key: 'char1',
      x: 200,
      y: 300,
      scale: scale
    })

    this.forest1 = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, this.game.config.width, 793, 'forest1')

    /** Logo and logo bounce tween */
    var logoY = this.cameras.main.centerY-100
    const logo = this.add.image(this.cameras.main.centerX, logoY, 'logo')
    this.tweens.add({
      targets: logo,
      y: logoY - 10,
      duration: ((60000 / 145) / 2),
      ease: 'Power2',
      yoyo: true,
      loop: -1
    })

    /** Button Location and scaling **/
    var buttonStartX = 150
    var buttonStartY = logo.y+100;
    var paddingBetweenButtons = 25;
    var buttonScale = 2

    this.button_resume = this.add.sprite(buttonStartX, buttonStartY, 'buttons').setFrame(0).setScale(buttonScale)
    this.button_newgame = this.add.sprite(buttonStartX, this.button_resume.y + (this.button_resume.height*buttonScale) + paddingBetweenButtons, 'buttons').setFrame(2).setScale(buttonScale)
    this.button_settings = this.add.sprite(buttonStartX, this.button_newgame.y + (this.button_newgame.height*buttonScale) + paddingBetweenButtons, 'buttons').setFrame(4).setScale(buttonScale)

    this.add.text(16, 16, 'v0.01', {fontSize: '16px', fontFamily: 'adventurer', fill: '#FFF'})
    this.add.text(16, this.sys.game.config.height - 20, 'Song: Saladbox Adventure - Keiaxx', {
      fontSize: '16px',
      fontFamily: 'adventurer',
      fill: '#FFF'
    })

    logo.setScale(1.5, 1.5)

    // startButton.setScale(0.8, 0.8)
    this.button_resume.setInteractive().on('pointerdown', () => {
      console.log('Resume Clicked')
    }).on('pointerover', () => {
      this.button_resume.setFrame(1)
    }).on('pointerout', () => {
      this.button_resume.setFrame(0)
    })

    // startButton.setScale(0.8, 0.8)
    this.button_newgame.setInteractive().on('pointerdown', () => {
      console.log('New Game Clicked')
      this.scene.start('UserInterfaceScene')
      this.scene.start('introScene')
    }).on('pointerover', () => {
      this.button_newgame.setFrame(3)
    }).on('pointerout', () => {
      this.button_newgame.setFrame(2)
    })

    // startButton.setScale(0.8, 0.8)
    this.button_settings.setInteractive().on('pointerdown', () => {
      console.log('Settings Clicked')
    }).on('pointerover', () => {
      this.button_settings.setFrame(5)
    }).on('pointerout', () => {
      this.button_settings.setFrame(4)
    })

    let music = this.sound.add('theme')

    music.play()
    music.setLoop(true)
    music.setVolume(0.02)



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
