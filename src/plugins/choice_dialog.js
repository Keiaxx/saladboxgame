//Thanks https://gamedevacademy.org/create-a-dialog-modal-plugin-in-phaser-3-part-2/

var ChoiceDialogPlugin = function (scene) {
  this.scene = scene
  this.systems = scene.sys

  if (!scene.sys.settings.isBooted) {
    scene.sys.events.once('boot', this.boot, this)
  }
}

ChoiceDialogPlugin.register = function (PluginManager) {
  PluginManager.register('ChoiceDialogPlugin', ChoiceDialogPlugin, 'choiceDialog')
}

ChoiceDialogPlugin.prototype = {
  // called when the plugin is loaded by the PluginManager
  boot: function () {
    var eventEmitter = this.systems.events
    eventEmitter.on('destroy', this.destroy, this)
  },

  //  Called when a Scene shuts down, it may then come back again later
  // (which will invoke the 'start' event) but should be considered dormant.
  shutdown: function () {
    if (this.timedEvent) this.timedEvent.remove()
    if (this.text) this.text.destroy()
  },

  // called when a Scene is destroyed by the Scene Manager
  destroy: function () {
    this.shutdown()
    this.scene = undefined
  },

  // Initialize the dialog modal
  init: function (opts) {
    // Check to see if any optional parameters were passed
    if (!opts) opts = {}
    // set properties from opts object or use defaults
    this.borderThickness = opts.borderThickness || 3
    this.borderColor = opts.borderColor || 0x907748
    this.borderAlpha = opts.borderAlpha || 1
    this.windowAlpha = opts.windowAlpha || 0.8
    this.windowColor = opts.windowColor || 0x303030
    this.windowHeight = opts.windowHeight || 150
    this.padding = opts.padding || 32
    this.closeBtnColor = opts.closeBtnColor || 'darkgoldenrod'
    this.dialogSpeed = opts.dialogSpeed || 3

    this.fontFamily = opts.fontFamily || 'gamer'
    this.choices = opts.choices || ['No Choices']
    this.fontPixelSize = opts.fontPixelSize || 40
    this.eventCounter = 0
    this.visible = true
    this.text
    this.dialog
    this.graphics
    this.closeBtn
    this.lines
    this.linecount = 0
    this.currentline = 0
    this.question = opts.question || ''

    this.choiceTexts

    this.onChoice = opts.onChoice || function (choice) {
    }
    this.onProgress = opts.onProgress || function () {
    }

    // Create the dialog window
    this._createWindow()
    this.setText(this.question, false)
    this.showChoices()
  },

  // Hide/Show the dialog window
  toggleWindow: function () {
    this.visible = !this.visible
    if (this.text) this.text.visible = this.visible
    if (this.graphics) this.graphics.visible = this.visible
    if (this.closeBtn) this.closeBtn.visible = this.visible
  },

  // Slowly displays the text in the window to make it appear annimated
  _animateText: function () {
    this.eventCounter++
    this.text.setText(this.text.text + this.dialog[this.eventCounter - 1])

    if (this.eventCounter === this.dialog.length) {
      this.timedEvent.remove()

      this.text.setInteractive()
      this.text.on('pointerup', function () {
        console.log('INTERACTIVE CLICK')
        // this.setText('second line animation test', true)

        if (this.currentline < this.linecount - 1) {
          this.currentline++

          this.onProgress(this.currentline)
          this.setText(this.lines[this.currentline], true)
        } else {

          this.toggleWindow()
          if (this.timedEvent) this.timedEvent.remove()
          if (this.text) this.text.destroy()

          this.onDone()
        }
      }, this)
    }
  },
  setMultistageText: function (text, animate) {
    // Reset the dialog
    this.lines = text

    this.currentline = 0
    this.linecount = text.length

    this.eventCounter = 0
    this.dialog = text[0].split('')
    if (this.timedEvent) this.timedEvent.remove()

    var tempText = animate ? '' : text[0]
    this._setText(tempText)

    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 150 - (this.dialogSpeed * 30),
        callback: this._animateText,
        callbackScope: this,
        loop: true
      })
    }
  },

  // Sets the text for the dialog window
  setText: function (text, animate) {
    // Reset the dialog
    this.eventCounter = 0
    this.dialog = text.split('')
    if (this.timedEvent) this.timedEvent.remove()

    var tempText = animatse ? '' : text
    this._setText(tempText)

    if (animate) {
      this.timedEvent = this.scene.time.addEvent({
        delay: 150 - (this.dialogSpeed * 30),
        callback: this._animateText,
        callbackScope: this,
        loop: true
      })
    }
  },

  // Calcuate the position of the text in the dialog window
  _setText: function (text) {
    // Reset the dialog
    if (this.text) this.text.destroy()

    var x = this.padding + 10
    var y = this._getGameHeight() - this.windowHeight - this.padding + 10

    this.text = this.scene.make.text({
      x,
      y,
      text,
      style: {
        wordWrap: {width: this._getGameWidth() - (this.padding * 2) - 25},
        font: this.fontPixelSize + 'px ' + this.fontFamily, fill: '#a9aca4'
      }
    }).setScrollFactor(0)
  },

  showChoices: function () {
    var x = this.padding + 10
    var y = this._getGameHeight() + this.fontPixelSize - this.windowHeight - this.padding + 20

    this.choiceTexts = []

    for (let i in this.choices) {

      let choice = this.choices[i]
      let madeText = this.scene.make.text({
        x,
        y,
        text: choice,
        style: {
          wordWrap: {width: this._getGameWidth() - (this.padding * 2) - 25},
          font: this.fontPixelSize + 'px ' + this.fontFamily, fill: '#a9aca4'
        }
      }).setScrollFactor(0)
      madeText.setInteractive()
      madeText.on('pointerup', function () {
        console.log('INTERACTIVE CLICK')
        this.onChoice(i)

        this.toggleWindow()
        if (this.timedEvent) this.timedEvent.remove()
        if (this.text) this.text.destroy()
        if (this.choiceTexts) {
          for (let j in this.choiceTexts) {
            this.choiceTexts[j].destroy()
          }
        }
      }, this)
      this.choiceTexts.push(madeText)
      y = y + this.fontPixelSize + 10
    }

  },

  // Creates the dialog window
  _createWindow: function () {
    var gameHeight = this._getGameHeight()
    var gameWidth = this._getGameWidth()
    var windowDimensions = this._calculateWindowDimensions(gameWidth, gameHeight, this.choices.length)
    this.graphics = this.scene.add.graphics()

    this._createOuterWindow(windowDimensions)
    this._createInnerWindow(windowDimensions)
    // this._createCloseModalButtonBorder();
    //this._createCloseModalButton();

  },

  // Gets the width of the game (based on the scene)
  _getGameWidth: function () {
    return this.scene.sys.game.config.width
  },

  // Gets the height of the game (based on the scene)
  _getGameHeight: function () {
    return this.scene.sys.game.config.height
  },

  // Calculates where to place the dialog window based on the game size
  _calculateWindowDimensions: function (width, height) {
    this.windowHeight = ((this.choices.length + 1) * this.fontPixelSize) + this.fontPixelSize + this.padding
    var x = this.padding
    var y = height - this.windowHeight - this.padding
    var rectWidth = width - (this.padding * 2)
    var rectHeight = this.windowHeight
    return {
      x,
      y,
      rectWidth,
      rectHeight
    }
  },

  // Creates the inner dialog window (where the text is displayed)
  _createInnerWindow: function ({x, y, rectWidth, rectHeight}) {
    this.graphics.fillStyle(this.windowColor, this.windowAlpha).setScrollFactor(0)
    this.graphics.fillRect(x + 1, y + 1, rectWidth - 1, rectHeight - 1).setScrollFactor(0)
  },

  // Creates the border rectangle of the dialog window
  _createOuterWindow: function ({x, y, rectWidth, rectHeight}) {
    this.graphics.lineStyle(this.borderThickness, this.borderColor, this.borderAlpha).setScrollFactor(0)
    this.graphics.strokeRect(x, y, rectWidth, rectHeight).setScrollFactor(0)
  },

  // Creates the close dialog button border
  _createCloseModalButtonBorder: function () {
    var x = this._getGameWidth() - this.padding - 20
    var y = this._getGameHeight() - this.windowHeight - this.padding
    this.graphics.strokeRect(x, y, 20, 20)
  },

  // Creates the close dialog window button
  _createCloseModalButton: function () {
    var self = this
    this.closeBtn = this.scene.make.text({
      x: this._getGameWidth() - this.padding - 14,
      y: this._getGameHeight() - this.windowHeight - this.padding + 3,
      text: 'X',
      style: {
        font: 'bold 12px Arial',
        fill: this.closeBtnColor
      }
    }).setScrollFactor(0)
    this.closeBtn.setInteractive()

    this.closeBtn.on('pointerover', function () {
      this.setTint(0xff0000)
    })
    this.closeBtn.on('pointerout', function () {
      this.clearTint()
    })
    var _this = this

    this.closeBtn.on('pointerdown', function () {
      self.toggleWindow()
      if (self.timedEvent) self.timedEvent.remove()
      if (self.text) self.text.destroy()

      this.onDone()

    })
  }
}

ChoiceDialogPlugin.prototype.constructor = ChoiceDialogPlugin

//  Make sure you export the plugin for webpack to expose

module.exports = ChoiceDialogPlugin