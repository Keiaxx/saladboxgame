import {Scene} from 'phaser'
import menuMusic from '../assets/audio/menu.ogg'
import menuMusicMp3 from '../assets/audio/menu.mp3'

import crouton from '../assets/sprites/crouton1.png'


var image0;
var image1;
var tween;
var iter = 0;

export default class StartGameScene extends Scene {
    constructor() {
        super({key: 'StartGameScene'})
    }

    preload(){


        image0 = this.load.image('image0', crouton)

        this.load.audio('theme', [menuMusicMp3, menuMusic]);
    }

    toggleMenuMusic(){

    }



    create() {
        //
        // this.add.image(1,1, 'back1')

        const logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'logo')
        const startButton = this.add.image(this.cameras.main.centerX, logo.y+100, 'startbutton')

        this.add.text(16, 16, 'v0.01', { fontSize: '16px', fontFamily: 'adventurer', fill: '#FFF' });
        this.add.text(16, this.sys.game.config.height - 20, 'Song: Saladbox Adventure - Keiaxx', { fontSize: '16px', fontFamily: 'adventurer', fill: '#FFF' });


        logo.setScale(1.5, 1.5)
        startButton.setScale(0.8, 0.8)
        startButton.setInteractive().on('pointerdown', () => {
            console.log("START CLICKED")
            this.scene.start('UserInterfaceScene')
            this.scene.start('introScene')
        }).on('pointerover', ()=>{
            startButton.setAlpha(0.5)
        }).on('pointerout', ()=>{
            startButton.setAlpha(1)
        })

        let music = this.sound.add('theme');

        music.play();
        music.setLoop(true);

        this.tweens.add({
            targets: logo,
            y: this.cameras.main.centerY - 10,
            duration: ((60000 / 145)/2),
            ease: "Power2",
            yoyo: true,
            loop: -1
        })


        var self = this;
        this.events.on('shutdown', function(){
            console.log("Stopping menu music");
            music.stop();
        });

    }
}
