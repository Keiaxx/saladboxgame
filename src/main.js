import Phaser from 'phaser'
import './assets/css/main.css'
import BootScene from './scenes/BootScene'
import StartGameScene from './scenes/StartGameScene'
import introScene from './scenes/IntroScene'
import UserInterfaceScene from './scenes/UserInterfaceScene'

import dialogPlugin from './plugins/dialog_plugin'
import choicePLugin from './plugins/choice_dialog'

window.onload = startGame()

function create () {
  window.addEventListener('resize', resize)

  setTimeout(function () {
    resize()
  }, 10)
}

function resize () {
  var canvas = document.querySelector('canvas')
  var windowWidth = window.innerWidth
  var windowHeight = window.innerHeight
  var windowRatio = windowWidth / windowHeight
  var gameRatio = game.config.width / game.config.height
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + 'px'
    canvas.style.height = (windowWidth / gameRatio) + 'px'
  } else {
    canvas.style.width = (windowHeight * gameRatio) + 'px'
    canvas.style.height = windowHeight + 'px'
  }
}

function startGame () {
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

  const config = {
    type: Phaser.WEBGL,
    parent: 'app',
    pixelArt: true,
    width: 1280,
    height: 720,
    scene: [BootScene, UserInterfaceScene, StartGameScene, introScene],
    'render.transparent': true,
    plugins: {
      scene: [
        {key: 'DialogModalPlugin', plugin: dialogPlugin, mapping: 'dialog'},
        {key: 'ChoiceDialogPlugin', plugin: choicePLugin, mapping: 'choiceDialog'}
      ]
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: { y: 900 }
      },
      matter: {
        debug: true,
        gravity: { y: 0.5 }
      }
    }
  }
  const game = new Phaser.Game(config)
  window.game = game
  create()
}
