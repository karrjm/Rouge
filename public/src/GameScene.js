/* global centerX, centerY, centerGameObjects */

class GameScene extends Phaser.Scene {
  // Run when the scene is first loaded
  init() {
    // Show message that the assets are loading
    this.loadingText = this.add.text(centerX(this), centerY(this),
      'Loading ...', {
        font: '16px Arial',
        fill: '#dddddd',
        align: 'center'
      })
    centerGameObjects([this.loadingText])
  }

  // Pre-load function: queues all needed assets for downloading
  // (they are actually downloaded asynchronously, prior to 'create')
  preload() {
    this.load.image('player', 'assets/sprites/player.png')

    this.load.image('tiles', 'assets/sprites/tileset.png')
    this.load.tilemapTiledJSON('map', 'assets/map/rougeMap.json')
  }

  // Run after all loading (queued in preload) is finished
  create() {
    // Delete loading text
    this.loadingText.destroy()

    let map = this.make.tilemap({
      key: 'map'
    })

    let tileset = map.addTilesetImage('rougeTileset', 'tiles')

    let backgroundLayer = map.createStaticLayer('Background', tileset, 0, 0)
    let foregroundLayer = map.createStaticLayer('Foreground', tileset, 0, 0)

    // Bring the debug draw layer to the top
    if (__DEV__) {
      this.debugDraw.bringToTop()
    }
  }
}

/**
 * Creates a new player. 
 * @class
 * 
 * @property {number} level - starts at one and progresses
 * @property {number} health - keep this above zero
 * @property {string} weapon - ties to an object with a damage rating
 * @property {object} coords - location on the grid
 * @property {number} xp - experience points
 */
class Player {
  constructor(level, health, weapon, coords, xp) {
    this.level = level
    this.health = health
    this.weapon = weapon
    this.coords = coords
    this.xp = xp
  }
}

/**
 * Creates a new enemy. 
 * @class
 * 
 * @property {Number} health
 * @property {Object} coords
 * @property {Number} damage
 */
class Enemy {
  constructor(health, coords, damage) {
    this.health = health
    this.coords = coords
    this.damage = damage
  }
}

class Game {
  constructor() {
    this.map = []
    this.shadow = []
    this.isShadowToggled = false
    this.enemies = []
    this.canvas = null
    this.context = null
  }
}

/**
 * Reset all level-specific properties
 */
Game.prototype.reset = function () {
  this.enemies = []
  this.shadow = []
  this.map = []
}

// Ensure this is a globally accessible class
window.GameScene = GameScene
