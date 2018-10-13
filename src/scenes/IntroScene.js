import {Scene} from 'phaser'
import back1 from '../assets/intro1.png'

import angry from '../assets/audio/angrysoot.mp3'

import StateMachine from 'javascript-state-machine';

export default class introScene extends Scene {
    constructor() {
        super({key: 'introScene'})
    }
    preload() {
       this.load.image('back1', back1)
        this.load.audio('angry', [angry]);
    }
    create() {
        let _this = this;
        let cam = _this.cameras.main;
        // this.choiceDialog = new StateMachine({
        //     init: 'choices',
        //     transitions: [
        //         {name: 'salad', from: 'intro', to: 'dialog1'},
        //         {name: 'mcdonalds', from: 'dialog1', to: 'done'},
        //         {name: 'hotpockets', from: 'dialog1', to: 'done'}
        //     ],
        //     methods: {
        //         onDone(){
        //             //Done
        //         },
        //         onDialog1(){
        //
        //         }
        //     }
        // });

        // var cursors = this.input.keyboard.createCursorKeys();
        //
        // var controlConfig = {
        //     camera: this.cameras.main,
        //     left: cursors.left,
        //     right: cursors.right,
        //     up: cursors.up,
        //     down: cursors.down,
        //     zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        //     zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        //     acceleration: 0.06,
        //     drag: 0.0005,
        //     maxSpeed: 1.0
        // // };
        //
        // this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);


        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'back1').setScale(1.5);

        let music = this.sound.add('angry');

        music.play();
        music.setLoop(true);



        this.scene.get('UserInterfaceScene').showDialog([
            'It is morning. You realize you are almost late for school. What are you going to make for lunch?',
            'You think to yourself. "Hmm, I could eat McDonalds or... wait a second... AHA."',
            'You run downstairs to the fridge and find a fresh bag of lettuce',
            'As loud as you could you yelled, "SALAD BOX LUNCH TIME XBOX 1337 GUYS"',
            'Your friend hears you yelling from upstairs. It is the last bag of salad.'
        ], (progress) => {
            console.log("Progress" + progress)

            if(progress === 4){
                cam.shake(500);
                cam.pan(166, 304, 400);
                cam.zoomTo(4, 1500);
            }

        }, (done) => {
            console.log("Done");

            this.scene.get('UserInterfaceScene').showChoiceDialog('What do you do?', [
                'Take the last bag of salad and run',
                'Hide the salad to eat later',
                'Replace the lettuce with spinach'
            ], (selected) => {
                console.log("SELECTED CHOICE " + selected)

                music.stop();
                this.scene.start('StartGameScene')
                this.scene.stop();
            })
        });



    }

    update (time, delta)
    {
        // this.controls.update(delta);
    }
}
