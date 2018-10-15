import { Scene } from 'phaser'

import StateMachine from 'javascript-state-machine'

export default class introScene extends Scene {
  constructor () {
    super({key: 'introScene'})
  }

  create () {
    let _this = this
    let cam = _this.cameras.main

    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'back1').setScale(1.5)

    let music = this.sound.add('angry')

    music.play()
    music.setLoop(true)
    music.setVolume(0.02)

    this.scene.get('UserInterfaceScene').showDialog([
      'It is morning. You realize you are almost late for school. What are you going to make for lunch?',
      'You think to yourself. "Hmm, I could eat McDonalds or... wait a second... AHA."',
      'You run downstairs to the fridge and find a fresh bag of lettuce',
      'As loud as you could you yelled, "SALAD BOX LUNCH TIME XBOX 1337 GUYS"',
      'Your friend hears you yelling from upstairs. It is the last bag of salad.'
    ], (progress) => {
      console.log('Progress' + progress)

      if (progress === 4) {
        cam.shake(500)
        cam.pan(166, 304, 400)
        cam.zoomTo(4, 1500)
      }

    }, (done) => {
      console.log('Done')

      this.scene.get('UserInterfaceScene').showChoiceDialog('What do you do?', [
        'Take the last bag of salad and run',
        'Hide the salad to eat later',
        'Replace the lettuce with spinach'
      ], (selected) => {
        console.log('SELECTED CHOICE ' + selected)

        music.stop()
        this.scene.start('StartGameScene')
        this.scene.stop()
      })
    })
  }

  update (time, delta) {
    // this.controls.update(delta);
  }
}
