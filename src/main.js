import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import StartGameScene from './scenes/StartGameScene'

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 800,
  height: 600,
  scene: [BootScene, StartGameScene]
}

const game = new Phaser.Game(config)
window.game = game
