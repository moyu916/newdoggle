<template>
  <div id="login">
    <img src="~assets/logo.png" alt="logo" class="logo">
    <div v-if="type == 'login'" class="login_body login">
        <van-form @submit="onSubmit" label-align="center">
            <van-field
                v-model="username"
                name="username" 
                label="用户名"
                placeholder="请填写用户名"
                :rules="[{ required: true }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="请填写密码"
                :rules="[{ required: true }]"
            />
            <div style="margin: 16px;">
                <div class="link-register" @click="toggle('register')">立即注册</div>
                <van-button round block type="info" native-type="submit">
                登录
                </van-button>
            </div>
        </van-form>
    </div>
    <div v-else class="login_body register">
        <van-form @submit="onSubmit">
            <van-field
                v-model="username1"
                name="username1" 
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password1"
                type="password"
                name="password1"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <div class="link-login" @click="toggle('login')">已有账号登录</div>
                <van-button round block type="info" native-type="submit">
                注册
                </van-button>
            </div>
        </van-form>
    </div>
  </div>
</template>

<script>
import {login, register} from 'network/user.js'

export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        username1: '',
        password1: '',        
        type: 'login',
      }
  },
    methods: {
        async onSubmit(values) {

            if(this.type == 'login'){
                const { data } = await login({
                   "loginName": values.username,
                   "passwordMd5": this.$md5(values.password)  //取name那里的值而不是v-model,所以要把name改成password
                })
                console.log(data)
                // if (resultCode == 200) {
                //     localStorage.setItem('token',data)
                //     console.log(localStorage.getItem('token'))
                //     // window.vRouter.push('/') 
                //     window.location.href = '/'
                //     // this.$router.push('/')  用这个会出现登录无效
                // }
                localStorage.setItem('token', data)
                window.location.href = '/'
   
            }
            else {
                 await register({
                    "loginName": values.username1,
                    "password": values.password1
                })
                
                this.$toast.show('注册成功')
                this.type = 'login'
            }
        },
        toggle(pram) {
            this.type = pram
            this.verify = false
        }
    },
}
</script>

<style lang="stylus" scoped>
/deep/ .van-cell
    padding 20px 20px
#login
    .logo
        width 100px
        height 75px
        margin-left calc(50%-60px)
        margin-top 75px
    .login_body
        margin-top 60px
        padding 0 20px
        font-size 25px
        .link-register
            padding 15px 0
        .link-login
            padding 15px 0
.van-field
    font-size 15px
.link-register
    font-size 14px
.van-button
    font-size 14px
</style>