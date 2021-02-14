<template>
<div id="user">
    <nav-bar>
      <template v-slot:left>
        <i class="iconfont icon-leftarrow" @click="handleBack()"></i>
      </template>
      <template v-slot:center>我的</template>
      <template v-slot:right>
        <i class="iconfont icon-nav-list"></i>
      </template>
    </nav-bar>
    <div class="user-info">
      <div class="info">
        <img src="//s.weituibao.com/1583583975067/user-graduate%20(1).png"/>
        <div class="user-desc">
          <span>昵称：{{ user.nickName }}</span>
          <span>登录名：{{ user.loginName }}</span>
          <span class="name">个性签名：{{ user.introduceSign }}</span>
        </div>
      </div>
    </div>
    <ul class="user-list">
      <li @click="goTo('order')">
        <span>我的订单</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('setting')">
        <span>账号管理</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('address?from=mine')">
        <span>地址管理</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('about')">
        <span>关于我们</span>
        <van-icon name="arrow" />
      </li>
    </ul>
</div>  
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import { getUserInfo } from 'network/user'
export default {
    name: "User",
    components: {
        NavBar,
    },
    data () {
        return {
            user: {},
        }
    },
    methods: {
        goTo(r) {
          this.$router.push({ path: r })
        }
    },
    async mounted () {
        const { data } = await getUserInfo()
        this.user = data
    }
}
</script>

<style lang="stylus" scoped>
.user-list >>> .van-icon
  float right
.user-info
  width 320px
  height 120px
  border-radius 10px
  background-color $primary
  margin 25px 6px 8px 6px
  .info
    display flex
    padding 8px
    img 
      width 70px
      height 70px
      border-radius 20px
    .user-desc
      flex 1
      color #ffffff
      font-size 16px
      span 
        display block
        text-align left 
        margin 5px 3px
.user-list
  margin-top 12px
  li
    text-align left 
    margin 12px
    font-size 14px
</style>