<template>
  <div id="app">
    <keep-alive exclude="ProductDetail">
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
import { getCart } from 'network/cart'

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
  // mounted() {
  //   this.initCartList()
  // },
  watch: {
    $route(to, from){
      if(this.showNavList.includes(to.path)) {
        this.isShowNav = true
      }else{
        this.isShowNav = false
      }      
    }
  },
  methods: {
  //   async initCartList() {
  //     const { data } = await getCart()
  //     let num = 0;
  //     for (let i of data){
  //       Vue.set(i,'checked',false)
  //       Vue.set(i,'index',num)
  //       num++
  //     }
  //     this.$store.commit('initCartData', data)
  //   }
  // }
}
}
</script>
