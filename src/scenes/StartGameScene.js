import {Scene} from 'phaser'

export default class StartGameScene extends Scene {
    constructor() {
        super({key: 'StartGameScene'})
    }

    create() {

        const logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'logo')
        const startButton = this.add.image(this.cameras.main.centerX, logo.y+100, 'startbutton')
        startButton.setScale(0.5, 0.5)
        startButton.setInteractive().on('pointerdown', () => {
            console.log("START CLICKED")
            this.scene.start('BootScene')
        }).on('pointerover', ()=>{
            startButton.setAlpha(0.5)
        }).on('pointerout', ()=>{
            startButton.setAlpha(1)
        })


        this.tweens.add({
            targets: logo,
            y: this.cameras.main.centerY - 10,
            duration: 200,
            ease: "Power2",
            yoyo: true,
            loop: -1
        })
    }
}
