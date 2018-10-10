import {Scene} from 'phaser'
import logo from '../assets/logo.png'
import startButton from '../assets/shittystartbutton.png'

export default class BootScene extends Scene {
    constructor() {
        super({key: 'BootScene'})
    }

    preload() {

        this.load.image('logo', logo)
        this.load.image('startbutton', startButton)

    }

    create() {
        this.scene.start('StartGameScene')
    }
}
