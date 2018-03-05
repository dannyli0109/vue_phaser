<template>
    <div id='gameScreen'>
        <button @click='nextPage'>hi</button>
        <!-- <img src="../../assets/images/pacman.png" alt=""> -->
    </div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  /* eslint-enable no-unused-vars */

export default {
      name: 'dashboard',
      props: {
          width: Number,
          height: Number
      },
      mounted () {
          let self = this

          if (this.game == null) {
              this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, this.$el, {
                  preload: function preload () {
                      self.preload(this)
                  },
                  create: function create () {
                      self.create(this)
                  },
                  update: function update () {
                      self.update(this)
                  },
                  render: function render () {
                      self.render(this)
                  }
              })
          }
      },
      methods: {
          preload () {
              this.game.load.spritesheet('dot', '../../../static/root/pacman/dot.png')
              this.game.load.spritesheet('pacman', '../../../static/root/pacman/pacman.png', 32, 32)
              this.game.load.image('tiles', '../../../static/root/pacman/pacman-tiles.png')
              this.game.load.tilemap('map', '../../../static/root/pacman/pacman-map.json', null, Phaser.Tilemap.TILED_JSON)
          },
          create (phaser) {
              this.map = this.game.add.tilemap('map')
              this.map.addTilesetImage('pacman-tiles', 'tiles')

              this.layer = this.map.createLayer('Pacman')
              this.layer.resizeWorld()

              this.dots = this.game.add.physicsGroup()

              this.map.createFromTiles(7, 14, 'dot', this.layer, this.dots)

              this.dots.setAll('x', 6, false, false, 1)
              this.dots.setAll('y', 6, false, false, 1)

              this.map.setCollisionByExclusion([14], true, this.layer)

              this.pacman = this.game.add.sprite(24, 24, 'pacman')
              this.pacman.scale.setTo(0.5, 0.5)
              this.pacman.anchor.set(0.5)
              this.game.physics.arcade.enable(this.pacman)
              this.pacman.animations.add('move', [0, 1, 2], 20, true)
              this.cursors = this.game.input.keyboard.createCursorKeys()
          },
          update (phaser) {
              this.game.physics.arcade.collide(this.pacman, this.layer)
              this.game.physics.arcade.overlap(this.pacman, this.dots, this.eatDot, null, this)

              if (this.lastPressed) {
                  if (this.lastPressed === 4) {
                      this.pacman.body.velocity.x = -90
                  } else if (this.lastPressed === 1) {
                      this.pacman.body.velocity.x = 90
                  } else if (this.lastPressed === 2) {
                      this.pacman.body.velocity.y = -90
                  } else {
                      this.pacman.body.velocity.y = 90
                  }
              }
              if (this.cursors.left.isDown) {
                  this.pacman.body.velocity.x = -90
                  this.lastPressed = 4
              } else if (this.cursors.right.isDown) {
                  this.pacman.body.velocity.x = 90
                  this.lastPressed = 1
              } else if (this.cursors.up.isDown) {
                  this.pacman.body.velocity.y = -90
                  this.lastPressed = 2
              } else if (this.cursors.down.isDown) {
                  this.pacman.body.velocity.y = 90
                  this.lastPressed = 3
              }

              if (this.pacman.body.position.x > this.pacman.body.prev.x) {
                  this.pacman.animations.play('move')
                  this.pacman.angle = 0
              } else if (this.pacman.body.position.x < this.pacman.body.prev.x) {
                  this.pacman.animations.play('move')
                  this.pacman.angle = 180
              } else if (this.pacman.body.position.y > this.pacman.body.prev.y) {
                  this.pacman.animations.play('move')
                  this.pacman.angle = 90
              } else if (this.pacman.body.position.y < this.pacman.body.prev.y) {
                  this.pacman.animations.play('move')
                  this.pacman.angle = 270
              } else {
                  this.pacman.animations.stop()
              }

              if (this.pacman.body.position.x < 0) {
                  this.pacman.body.position.x = 432
              } else if (this.pacman.body.position.x > 432) {
                  this.pacman.body.position.x = 0
              }
          },
          render (phaser) {
              // this.game.debug.bodyInfo(this.pacman, 32, 300)
          },
          eatDot (pacman, dot) {
              dot.kill()
          },
          nextPage () {
              console.log('hi')
              this.$router.push({ path: 'next' })
          }
      },
      data () {
          return {
              game: null,
              pacman: null,
              cursor: null,
              map: null,
              layer: null,
              lastPressed: null
          }
      }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/tools';

.dashboard {
    background: transparent;
}
</style>
