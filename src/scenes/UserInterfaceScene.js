import { Scene } from 'phaser'
import back1 from '../assets/intro1.png'

import StateMachine from 'javascript-state-machine'

export default class UserInterfaceScene extends Scene {
  constructor () {
    super({key: 'UserInterfaceScene'})
  }

  preload () {
  }

  showDialog (multitext, progress, done) {
    console.log('SHOWING DIALOG')
    this.dialog.init({
      windowHeight: 200,
      dialogSpeed: 1,
      fontFamily: 'adventurer',
      onDone: done,
      onProgress: progress
    })
    this.dialog.setMultistageText(multitext, true)
    this.scene.bringToTop()
  }

  showChoiceDialog (question, choices, selected) {
    this.choiceDialog.init({
      dialogSpeed: 10,
      fontPixelSize: 35,
      fontFamily: 'adventurer',
      question: question,
      choices: choices,
      onChoice: selected
    })
  }

  create () {
    // this.choices = function(){
    //     self.choiceDialog.init({
    //         dialogSpeed: 10,
    //         fontPixelSize: 35,
    //         fontFamily: 'adventurer',
    //         question: 'What do you do?',
    //         choices: [
    //             'Take the last bag of salad and run',
    //             'Hide the salad to eat later',
    //             'Replace the lettuce with spinach'
    //         ],
    //         onChoice: function (choiceIndex) {
    //             console.log("CHOSE " + choiceIndex);
    //         }
    //     });
    // }
    //this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'logo')

    this.add.text(16, 16, 'UI SCENE', {fontSize: '16px', fontFamily: 'adventurer', fill: '#FFF'})

  }

  update (time, delta) {
    // this.controls.update(delta);
  }
}
