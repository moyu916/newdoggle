<template>
      <nav-bar class="home-header">
        <template v-slot:left>
          <i class="iconfont icon-nav-list" @click="gotoCategory()"></i>
          <span class="name">doggle</span>
        </template>

        <template v-slot:center>
          <router-link 
              to="/productList" 
              tag="input" 
              type="text" 
              placeholder="请输入您要搜索的商品">
          </router-link>
        </template>

        <template v-slot:right>
          <router-link 
              to="/user" 
              tag="span"
              v-if="token"  
              class="iconfont icon-usercenter">
          </router-link>
          <router-link 
              to="/login" 
              tag="span" 
              v-else 
              class="login">
              登录
          </router-link>
        </template>
    </nav-bar>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
export default {
    name: 'HomeHeader',
    components: {
      NavBar,
    },
    computed: {
      token () {
        return localStorage.getItem('token')
      },
    },
    methods: {
        gotoCategory() {
            this.$router.push('/category')
        }
    }
}
</script>

<style lang="stylus" scoped>
.home-header
  color $primary
  height 40px
  line-height 40px
  .icon-nav-list
    padding-left 8px
  .name
    padding-left 15px
    vertical-align bottom
  .login
    padding-right 8px
  .icon-usercenter
    padding-right 8px
    font-size 7.13vw
  input 
    width 210px
    text-align center
    font-size 15px
    border-radius 20px
    margin 0 10px
    background-color rgba(255,255,255,0.6)


</style>