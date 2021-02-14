<template>
  <div id="app">
    <keep-alive exclude="ProductDetail, Cart">
      <router-view/>
    </keep-alive>
    <bottom-bar v-show="isShowNav"></bottom-bar>
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  font-size 16px
</style>

<script>
import BottomBar from 'content/BottomBar'

export default {
  components: {
    BottomBar,
  },  
  data () {
    return {
      isShowNav : true,
      // 只在下列路径中展示bottom-bar
      showNavList : ['/home','/category','/user','/cart'],
    }
  },
  watch: {
    $route(to, from){
      if(this.showNavList.includes(to.path)) {
        this.isShowNav = true
      }else{
        this.isShowNav = false
      }      
    }
  }

}
</script>
