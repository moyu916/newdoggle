<template>
  <div id="setting">
      <nav-bar>
          <span slot="middle">账号管理</span>
      </nav-bar>
      <div class="item">
        <van-field v-model="name" label="昵称" />
        <van-field v-model="introduceSign" label="个性签名" />
        <van-field v-model="password" type='password' label="修改密码" />
      </div>
      <van-button class="save-btn" color="#1baeae" type="primary" @click="save" block>保存</van-button>
      <van-button class="save-btn" color="#1baeae" type="primary" @click="logout" block>退出登录</van-button>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import { getUserInfo, editUserInfo, logout } from 'network/user'

import Vue from 'vue';
import { Field, Toast } from 'vant';

Vue.use(Field).use(Toast);

export default {
    name: 'Setting',
    components: {
        NavBar,
    },
    data() {
        return {
            name: '',
            introduceSign: '',
            password: ''
        }
    },
    async mounted() {
        const { data } = await getUserInfo()
        this.name = data.nickName
        this.introduceSign = data.introduceSign
    },
    methods: {
        async save() {
            const params = {
                nickName: this.name,
                introduceSign: this.introduceSign,
                passwordMd5: this.$md5(this.password)
            }
            await editUserInfo(params)
            Toast.success('保存成功')
            this.$router.push('/user')
        },
        async logout() {
            const { resultCode } =  await logout()
            if (resultCode == 200) {
                localStorage.setItem('token','')
                // this.$router.push('/')
                window.location.href = '/'
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.item
    margin-top 75px
    padding 0 30px
    >>> .van-cell
        font-size 25px
        padding 30px 0
.van-button
    width 80%
    margin 20px auto
</style>