import {Scene} from 'phaser'
import menuMusic from '../assets/audio/menu.ogg'
import menuMusicMp3 from '../assets/audio/menu.mp3'

import crouton from '../assets/sprites/crouton1.png'
import char1 from '../assets/sprites/main_character-skin1.png'


var image0;
var image1;
var tween;
var iter = 0;

var anim;
var sprite;

var cursors;
var player;
var walksprite;
var move = false;
var moveRight = false;
export default class StartGameScene extends Scene {
    constructor() {
        super({key: 'StartGameScene'})
    }



    preload(){


        image0 = this.load.image('image0', crouton)

        this.load.audio('theme', [menuMusicMp3, menuMusic]);

        this.load.spritesheet('char1', char1, { frameWidth: 32, frameHeight: 32 });



    }

    toggleMenuMusic(){

    }

    update(time, delta) {
        // if (cursors.left.isDown)
        // {
        //     player.body.setVelocityX(-260);
        //
        //     player.anims.play('walk', true);
        // }
        // else if (cursors.right.isDown)
        // {
        //     player.body.setVelocityX(260);
        //
        //     player.anims.play('walk', true);
        // }
        // else
        // {
        //     player.body.setVelocityX(0);
        //
        //     //player.anims.play('turn');
        //     player.anims.stop('walk');
        // }

        var angle = Phaser.Math.Angle.Between(player.x, player.y, this.input.x + this.cameras.main.scrollX, this.input.y + this.cameras.main.scrollY) * (180 / Math.PI);;

        if(move) {
            if (angle > -90 && angle < 0) {
                player.body.setVelocityX(260);

                player.anims.play('walk', true);
                player.flipX = true;
            } else if (angle > 0 && angle < 90) {
                player.body.setVelocityX(260);

                player.anims.play('walk', true);
                player.flipX = true;
            } else if (angle > 90 && angle < 180) {
                player.body.setVelocityX(-260);

                player.anims.play('walk', true);
                player.flipX = false;
            } else if (angle > -180 && angle < -90) {
                player.body.setVelocityX(-260);

                player.anims.play('walk', true);
                player.flipX = false;
            }
        }else{
            player.body.setVelocityX(0);

            //player.anims.play('turn');
            player.anims.stop('walk');
        }

    }



    create() {
        //
        // this.add.image(1,1, 'back1')

        // skin1:
        // row1: intense idle anim
        // row2: walk anim
        // row3: subtle idle anim

        this.physics.world.setBounds(0, 0, 700, 1200, true, true, true, true);

        var scale = 5
        this.cameras.main.setBackgroundColor('rgba(255, 255, 255, 0.5)');

        // var intenseidle = {
        //     key: 'intenseidle',
        //     frames: this.anims.generateFrameNumbers('char1', { start: 0, end: 4 }),
        //     frameRate: 10,
        //     yoyo: false,
        //     repeat: -1
        // };
        // var intenseidle_anim = this.anims.create(intenseidle);
        // var iisprite = this.add.sprite(200, 300, 'char1').setScale(scale);
        // iisprite.anims.load('intenseidle');
        // iisprite.anims.play('intenseidle');




        // walksprite = this.add.sprite(300, 300, 'char1').setScale(scale);
        // walksprite.anims.load('walk');
        // walksprite.anims.play('walk');

        player = this.physics.add.sprite(200, 300, 'char1', 6).setScale(scale);

        player.setCollideWorldBounds(true);



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
        music.setVolume(0.02);

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

        // this.cameras.main.startFollow(player);
        // this.cameras.main.roundPixels = true;

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('char1', {frames: [6, 7, 8, 9, 10]}),
            frameRate: 10,
            repeat: -1
        });



        cursors = this.input.keyboard.createCursorKeys();

        this.input.on('pointerdown', function(cursor){
            move = true;




        }, this);

        this.input.on('pointerup', function(cursor){
            move = false;


        }, this);
    }
}
