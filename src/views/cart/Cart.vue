<template>
  <div id="cart">
    <NavBar>
      <template v-slot:center>购物车</template>
    </NavBar>
    <scroll class="cart-content" ref="scroll">
        <cart-list :cartList="cartList"></cart-list>
    </scroll>
    <div class="submit-all">
        <check-button :action="all" @checkClick="checkClick"></check-button>
        <span class="textall">全选</span>
        <span class="money">金额：￥{{total}}</span>
        <button @click="onSubmit">结算</button>
    </div>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar.vue'
import Scroll from 'content/scroll/Scroll'


import Vue from 'vue';
import { Checkbox, CheckboxGroup, SwipeCell, Stepper, SubmitBar } from 'vant';
import CartList from './childComps/CartList.vue';

import CheckButton from "content/CheckButton"

Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(SwipeCell);
Vue.use(Stepper).use(SubmitBar)

export default {
    name: "Cart",
    components: {
      NavBar,
      Scroll,
      CartList,
      CheckButton,
    },
    data () {
      return {
        cartList: [],
        checkAll: false,
        checkedItem:[],
      }
    },
    computed: {
        total: function() {
            let sum = 0
            let data_checked = this.cartList.filter(item => item.checked == true)
            data_checked.forEach(item => {
                sum+= item.goodsCount * item.sellingPrice
            })
            return sum
        },
        all() {
            this.checkedItem = this.cartList.filter(item => item.checked == true)
            if(this.checkedItem.length == this.cartList.length)
            {
                this.checkAll = true
                return true
            }
            else {
                this.checkAll = false
                return false
            }
        }
    },
    // mounted() {
    //     this.init()
    //     // console.log('mounted')
    // },
    // 方案二 
    activated() {
       this.init()
    },
    methods: {
        init() {
            // 方案一
            // await this.$store.dispatch('getCart')
            // console.log(this.$store.state.cartList)
            this.cartList = this.$store.state.cartList
        },
        checkClick() {
            if(this.checkAll) {
                this.checkAll = false
                this.$store.commit("unAllSelected"); 
            }
            else{
                this.checkAll = true
                this.$store.commit("allSelected"); 
            }        
        },

        onSubmit() {
            const params = JSON.stringify(this.checkedItem.map(item=>item.cartItemId)) 
            this.$router.push(`/createOrder?cartItemIds=${params}`)
        },
    }
}
</script>

<style lang="stylus" scoped>
.cart-content
    margin 10px 0 100px 0
    .group
        width 100%  
        .cart-item 
            display flex
            .checkbox
                width 20px
                >>> .van-checkbox__icon
                    font-size 12px
                    margin 0 auto
            .img-wrapper
                width  100px
                height 100px
                img 
                    width 100%
            .item-content
                position relative
                flex 1
                padding 20px 15px 0 0
                .name
                    float left
                .num 
                    float right 
                .price
                    position absolute
                    bottom 15px
                    font-size 15px
                    color red
                .item-btn
                    position absolute
                    bottom 15px
                    right 15px
.van-submit-bar
    bottom 55px
    height 20px
    >>> .van-submit-bar__bar
        font-size 15px   
        line-height 15px  
    >>> .van-checkbox__label
        line-height 15px
    >>> .van-icon-success
        height 12px
        width 12px 
    >>> .delete-button
        height 50px
        width 20px
    >>> .van-swipe-cell__right
        right -10px

.submit-all
    position: fixed;
    left 0
    right 0
    bottom 70px
    height 30px
    line-height 30px
    .textall
        float left
    button
        float right
        width: 25%
        height 30px
</style>