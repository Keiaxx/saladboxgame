export default class MainCharacter extends Phaser.GameObjects.Sprite {
  constructor (config) {
    super(config.scene, config.x, config.y, config.key)
    config.scene.physics.world.enable(this)
    config.scene.add.existing(this)

    this.setScale(config.scale)
    this.acceleration = 600
    this.body.maxVelocity.x = 300
    this.body.maxVelocity.y = 500
    this.body.setCollideWorldBounds(true)

    this.keys = config.scene.input.keyboard.addKeys('W,A,S,D,SPACE')


    this.body.setSize(20, 32, false)
    console.log("CURRENT OFFSET " + JSON.stringify(this.body.offset));
    this.body.setOffset(6, 0)
  }

  moveLeft(){
    this.body.setVelocityX(-this.body.maxVelocity.x)

    this.anims.play('walk', true)
    this.flipX = false
  }

  moveRight(){
    this.body.setVelocityX(this.body.maxVelocity.x)

    this.anims.play('walk', true)
    this.flipX = true
  }

  jump () {
    this.body.setVelocityY(-350);
  }

  update (input, move, cursors, time, delta) {
    let angle = Phaser.Math.Angle.Between(this.body.x, this.body.y, input.x + this.scene.cameras.main.scrollX, input.y + this.scene.cameras.main.scrollY) * (180 / Math.PI)

    if (move) {
      if (angle > -90 && angle < 0) {
        this.moveRight()
      } else if (angle > 0 && angle < 90) {
        this.moveRight()
      } else if (angle > 90 && angle < 180) {
        this.moveLeft()
      } else if (angle > -180 && angle < -90) {
        this.moveLeft()
      }
    } else if (cursors.left.isDown || this.keys.A.isDown) {
      this.moveLeft()
    } else if (cursors.right.isDown || this.keys.D.isDown) {
      this.moveRight()
    } else {
      this.body.setVelocityX(0)
      this.anims.play('subtle', true)
    }
    if ((cursors.up.isDown || this.keys.SPACE.isDown) && this.body.velocity.y === 0) {
      this.jump()
    }
  }
}