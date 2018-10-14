import Phaser from 'phaser'
import './assets/css/main.css'
import BootScene from './scenes/BootScene'
import StartGameScene from './scenes/StartGameScene'
import introScene from './scenes/IntroScene'
import UserInterfaceScene from './scenes/UserInterfaceScene'

import dialogPlugin from './plugins/dialog_plugin'
import choicePLugin from './plugins/choice_dialog'



const config = {
  type: Phaser.CANVAS,
  parent: 'app',
    pixelArt: true,
  width: 720,
    height: 1280,
  scene: [BootScene, UserInterfaceScene, StartGameScene, introScene],
    "render.transparent"    : true,
    plugins: {
        scene: [
            { key: 'DialogModalPlugin', plugin: dialogPlugin, mapping: 'dialog' },
            { key: 'ChoiceDialogPlugin', plugin: choicePLugin, mapping: 'choiceDialog' }
        ]
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    }
}




const game = new Phaser.Game(config)
window.game = game

function create () {
    window.addEventListener('resize', resize);

    setTimeout(function(){
        resize();
    }, 10)
}

function resize() {
    var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    var wratio = width / height, ratio = canvas.width / canvas.height;

    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
}

create();