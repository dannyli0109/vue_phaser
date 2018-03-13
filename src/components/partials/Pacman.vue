<template>
    <div id='gameScreen'>
    </div>
</template>

<script>
  /* eslint-disable no-unused-vars */
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  import Pacman from '../../lib/Pacman'
  import Blinky from '../../lib/Blinky'
  import Loading from '../partials/Loading.vue'
  /* eslint-enable no-unused-vars */

export default {
      name: 'pacman',
      props: {
          width: Number,
          height: Number
      },
      components: {
          loading: Loading
      },
      data () {
          return {
              game: null,
              pacman: null,
              cursor: null,
              map: null,
              layer: null,
              lastPressed: null,
              score: 0
          }
      },
      mounted () {
          this.newGame()
      },
      methods: {
          preload () {
              this.game.load.spritesheet('dot', '../../../static/root/pacman/dot.png')
              this.game.load.spritesheet('pacman', '../../../static/root/pacman/pacman.png', 24, 24)
              this.game.load.image('tiles', '../../../static/root/pacman/pacman-tiles.png')
              this.game.load.image('door', '../../../static/root/pacman/door.png')
              this.game.load.tilemap('map', '../../../static/root/pacman/pacman-map.json', null, Phaser.Tilemap.TILED_JSON)
          },
          create (phaser) {
              this.pacman = new Pacman({
                  game: this.game,
                  x: 22,
                  y: 22,
                  asset: 'pacman'
              })

              this.blinky = new Blinky({
                  game: this.game,
                  x: 50,
                  y: 22,
                  asset: 'pacman'
              })
              this.map = this.game.add.tilemap('map')
              this.map.addTilesetImage('pacman-tiles', 'tiles')
              this.map.addTilesetImage('door', 'door')

              this.layer = this.map.createLayer('Pacman')
              this.layer.resizeWorld()

              this.dots = this.game.add.physicsGroup()

              this.map.createFromTiles(7, 14, 'dot', this.layer, this.dots)

              this.dots.setAll('x', 6, false, false, 1)
              this.dots.setAll('y', 6, false, false, 1)

              this.map.setCollisionByExclusion([14], true, this.layer)
              this.game.add.existing(this.pacman)
              this.game.add.existing(this.blinky)
              this.cursors = this.game.input.keyboard.createCursorKeys()
              this.$store.dispatch('notLoading')
          },
          update (phaser) {
              this.game.physics.arcade.collide(this.pacman, this.layer, this.collide, null, this)
              this.game.physics.arcade.collide(this.blinky, this.layer)
              this.game.physics.arcade.overlap(this.pacman, this.dots, this.eatDot, null, this)
          },
          render (phaser) {
          },
          eatDot (pacman, dot) {
              this.score += 100
              dot.kill()
          },
          collide () {
              // console.log('collide')
          },
          newGame () {
              let self = this

              if (this.game == null) {
                  this.score = 0
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
          }
      },
      watch: {
          $router (to, from) {
              console.log('change')
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
