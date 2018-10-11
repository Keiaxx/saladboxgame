import {Scene} from 'phaser'
export default class introScene extends Scene {
    constructor() {
        super({key: 'introScene'})
    }
    create() {
        this.dialog.init({
            windowHeight: 300,
            dialogSpeed: 10,
            onDone: function () {
                console.log("DONE");
            },
            onProgress: function (line){
                console.log("ON LINE " + line);
            }
        });
        this.dialog.setMultistageText([
            'It is morning. You realize you are almost late for school. What are you going to make for lunch?',
            'You think to yourself. "Hmm, I could eat McDonalds or... wait a second... AHA."',
            'You run downstairs to the fridge and find a fresh bag of lettuce',
            'As loud as you could you yelled, "SALAD BOX LUNCH TIME XBOX 1337 GUYS"'
        ], true)
    }
}
