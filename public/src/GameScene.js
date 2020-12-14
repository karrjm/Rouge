/* global centerX, centerY, centerGameObjects */

class GameScene extends Phaser.Scene {
  // Run when the scene is first loaded
  init () {
    // Show message that the assets are loading
    this.loadingText = this.add.text(centerX(this), centerY(this),
      'Loading ...', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    centerGameObjects([this.loadingText])
  }

  // Pre-load function: queues all needed assets for downloading
  // (they are actually downloaded asynchronously, prior to 'create')
  preload () {
    this.load.image('player', 'assets/sprites/player.png')

    this.load.image('tiles', 'assets/sprites/tileset.png')
    this.load.tilemapTiledJSON('map', 'assets/map/rougeMap.json')
  }

  // Run after all loading (queued in preload) is finished
  create () {
    // Delete loading text
    this.loadingText.destroy()

    let map = this.make.tilemap({ key: 'map' })

    let tileset = map.addTilesetImage('rougeTileset', 'tiles')

    let backgroundLayer = map.createStaticLayer('Background', tileset, 0, 0)
    let foregroundLayer = map.createStaticLayer('Foreground', tileset, 0, 0)

    // Bring the debug draw layer to the top
    if (__DEV__) {
      this.debugDraw.bringToTop()
    }
  }
}

// Ensure this is a globally accessible class
window.GameScene = GameScene
