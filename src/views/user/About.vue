<template>
  <div id="about">
      <nav-bar>
        <template v-slot:center>关于我们</template>
      </nav-bar>
      <div class="desc">
        <p> 加油，打工人！</p>
      </div>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
export default {
    name: 'About',
    components: {
      NavBar,
    },
}
</script>

<style lang="stylus" scoped>
.desc
  position relative
  margin-top 75px
  min-height calc( 100vh - 75px )
  font-size 50px
  color #1baeae
  p
    width 400px
    position absolute
    left calc( 50% - 200px )
    top calc( 50vh - 75px )
</style>