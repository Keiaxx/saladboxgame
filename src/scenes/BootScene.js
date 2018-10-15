import { Scene } from 'phaser'
import logo from '../assets/logo.png'
import startButton from '../assets/shittystartbutton.png'

//Stuff for intro
import back1 from '../assets/intro1.png'
import angry from '../assets/audio/angrysoot.mp3'

//Main menu
import char1 from '../assets/sprites/main_character-skin1.png'
import menuMusic from '../assets/audio/menu.ogg'
import menuMusicMp3 from '../assets/audio/menu.mp3'

//forest
import forest1 from '../assets/maps/forest/forest1.png'
import forest2 from '../assets/maps/forest/forest2.png'
import forest3 from '../assets/maps/forest/forest3.png'
import forest4 from '../assets/maps/forest/forest4.png'
import forest5 from '../assets/maps/forest/forest5.png'
import forest6 from '../assets/maps/forest/forest6.png'
import forest7 from '../assets/maps/forest/forest7.png'
import forest8 from '../assets/maps/forest/forest8.png'
import forest9 from '../assets/maps/forest/forest9.png'
import forest10 from '../assets/maps/forest/forest10.png'
import forest11 from '../assets/maps/forest/forest11.png'
import forestcollision from '../assets/maps/forest/forestcollision.png'

export default class BootScene extends Scene {
  constructor () {
    super({key: 'BootScene'})
  }

  preload () {

    this.load.image('logo', logo)
    this.load.image('startbutton', startButton)

    //Stuff for intro
    this.load.image('back1', back1)
    this.load.audio('angry', [angry])

    //load forest
    this.load.image("forest1", forest1)
    this.load.image("forest2", forest2)
    this.load.image("forest3", forest3)
    this.load.image("forest4", forest4)
    this.load.image("forest5", forest5)
    this.load.image("forest6", forest6)
    this.load.image("forest7", forest7)
    this.load.image("forest8", forest8)
    this.load.image("forest9", forest9)
    this.load.image("forest10", forest10)
    this.load.image("forest11", forest11)
    this.load.image("forestcollision", forestcollision)

    //Stuff for main menu
    this.load.audio('theme', [menuMusicMp3, menuMusic])
    this.load.spritesheet('char1', char1, {frameWidth: 32, frameHeight: 32})

  }

  create () {
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('char1', {frames: [6, 7, 8, 9, 10]}),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'subtle',
      frames: this.anims.generateFrameNumbers('char1', { start: 9, end: 11 }),
      frameRate: ((60000 / 145) / 64),
      repeat: -1
    })
    this.anims.create( {
      key: 'intenseidle',
      frames: this.anims.generateFrameNumbers('char1', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1
    })

    this.add.text(16, 16, 'BootScene', {fontSize: '16px', fontFamily: 'adventurer', fill: '#FFF'})
    this.scene.start('StartGameScene')


    // function fs_status()
    // {
    //     if(document.fullscreenElement)
    //     {
    //         return true;
    //     }
    //     else if(document.webkitFullscreenElement)
    //     {
    //         return true;
    //     }
    //     else if(document.mozFullScreenElement)
    //     {
    //         return true;
    //     }
    //     else
    //     {
    //         return false;
    //     }
    // }
    //
    // function goFullscreen()
    // {
    //     if(fs_status())
    //     {
    //         return;
    //     }
    //
    //     var el = document.getElementsByTagName('canvas')[0];
    //     var requestFullScreen = el.requestFullscreen || el.msRequestFullscreen || el.mozRequestFullScreen || el.webkitRequestFullscreen;
    //
    //     if(requestFullScreen)
    //     {
    //         requestFullScreen.call(el);
    //     }
    // }
    //
    // document.getElementsByTagName('div')[0].addEventListener('click', goFullscreen);

  }
}
