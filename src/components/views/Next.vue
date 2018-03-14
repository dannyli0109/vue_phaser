<template>
    <div id='gameScreen'>
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
          console.log('next mounted')
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
              this.$store.dispatch('notLoading')
              this.$router.push({ path: '/' })
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
