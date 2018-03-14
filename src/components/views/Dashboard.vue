<template>
    <div>
        <pacman></pacman>
        <router-link :to="{ name: 'next'}">next</router-link>
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
      components: {
          loading: Loading,
          pacman: PacmanVue
      },
      methods: {
          nextPage () {
              this.$router.push({ path: 'next' })
          }
      },
      computed: {

      },
      mounted () {
      }
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/tools';

.dashboard {
    background: transparent;
}
</style>
