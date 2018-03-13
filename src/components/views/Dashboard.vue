<template>
    <div id='gameScreen'>
        <template v-if="loading">
            <loading></loading>
        </template>
        <template v-else>
            <p @click='nextPage'>Score: {{score}}</p>
            <pacman></pacman>
            <button
                @click="goNext">
                go next
            </button>
        </template>

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
  import PacmanVue from '../partials/Pacman.vue'
  /* eslint-enable no-unused-vars */

export default {
      name: 'dashboard',
      props: {
          width: Number,
          height: Number
      },
      components: {
          loading: Loading,
          pacman: PacmanVue
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
      methods: {
          nextPage () {
              console.log('hi')
              this.$router.push({ path: 'next' })
          },
          goNext () {
              this.$store.dispatch('isLoading')
              this.$router.push({ path: 'next' })
          }
      },
      computed: {
          loading () {
              return this.$store.getters.loading
          }
      },
      mounted () {
          this.$store.dispatch('notLoading')
      }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/tools';

.dashboard {
    background: transparent;
}
</style>
