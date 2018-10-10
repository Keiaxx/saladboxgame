import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import StartGameScene from './scenes/StartGameScene'
import introScene from './scenes/IntroScene'

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 800,
  height: 600,
  scene: [BootScene, StartGameScene, introScene]
}

const game = new Phaser.Game(config)
window.game = game
