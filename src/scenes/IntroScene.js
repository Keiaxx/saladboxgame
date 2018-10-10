import {Scene} from 'phaser'

var content = [
    "Welcome to the world of saladbox"
];

var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 30;
var lineDelay = wordDelay;

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

        //this.dialog.setText('You have just awoken for school.', true);


        // this.text = this.add.text(this.cameras.main.centerX/2, this.cameras.main.centerY, '', { font: "30px Arial", fill: "#19de65" });
        //
        // this.nextLine();

    }
    //
    // nextLine() {
    //
    //     if (lineIndex >= content.length)
    //     {
    //         //  We're finished
    //         return;
    //     }
    //
    //     //  Split the current line on spaces, so one word per array element
    //     line = content[lineIndex].split('');
    //
    //     //  Reset the word index to zero (the first word in the line)
    //     wordIndex = 0;
    //
    //     console.log(line)
    //
    //     //  Call the 'nextWord' function once for each word in the line (line.length)
    //
    //     //this.time.events.repeat(wordDelay, line.length, this.nextWord, this);
    //
    //     this.time.addEvent({
    //         delay: wordDelay,
    //         repeat: line.length-1,
    //         callbackScope:this,
    //         callback: this.nextWord
    //     })
    //     //  Advance to the next line
    //     lineIndex++;
    //
    // }
    //
    //  nextWord() {
    //
    //     //  Add the next word onto the text string, followed by a space
    //      console.log(wordIndex + " " + line[wordIndex] );
    //     this.text.text = this.text.text.concat(line[wordIndex] + "");
    //
    //     //  Advance the word index to the next word in the line
    //     wordIndex++;
    //
    //     //  Last word?
    //     if (wordIndex >= line.length)
    //     {
    //         //  Add a carriage return
    //         this.text.text = this.text.text.concat("\n");
    //
    //         //  Get the next line after the lineDelay amount of ms has elapsed
    //         //this.time.events.add(lineDelay, this.nextLine, this);
    //
    //
    //         this.time.delayedCall(lineDelay, this.nextLine, [], this)
    //
    //     }
    //
    // }

}
