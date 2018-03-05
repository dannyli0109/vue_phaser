<template>
    <div id='gameScreen1'>
        <button @click='nextPage'>hi1</button>
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
                  }
              })
          }
      },
      methods: {
          preload () {
              console.log('Yeah')
          },
          create (phaser) {
          },
          update (phaser) {
          },
          nextPage () {
              console.log('hi')
          }
      },
      data () {
          return {
              game: null
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
