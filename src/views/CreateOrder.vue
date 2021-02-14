<template>
    <div id="create-order">
        <nav-bar>
            <template v-slot:center>生成订单</template>
        </nav-bar>
        <div class="address" @click="goToAddress()">
            <div class="name">
                <span >{{address.userName}}&nbsp;</span>
                <span >{{address.userPhone}}</span>
            </div>
            <div class="addr">
                {{address.provinceName}} {{address.cityName}} {{address.regionName}} {{address.detailAddress}}
            </div>
            <van-icon class="arrow" name="arrow" />
        </div>
        <hr>
        <div class="goods">
            <div class="good-item" v-for="(item,index) in cartList" :key="index">
                <div class="img-wrapper">
                    <img :src="`//lmall.xinfeng.site${item.goodsCoverImg}`" alt="">
                </div>
                <div class="good-desc">
                    <div class="good-title">
                        <span class="name">{{item.goodsName}}</span>
                        <span class="num">x{{item.goodsCount}}</span>
                    </div>
                    <div class="price">￥{{item.sellingPrice}}</div>
                </div>
            </div>
        </div>
        <div class="create">
            <span>商品金额</span>
            <span class="money">￥{{total}}</span>
            <van-button @click="createOrder" type="primary" color="#1baeae" block>生成订单</van-button>
        </div>

        <van-popup
            closeable
            :close-on-click-overlay="false"
            v-model="showPay"
            position="bottom"
            :style="{ height: '30%' }"
            @close="close"
        >
            <div :style="{ width: '80%', margin: '0 auto', padding: '50px 0' }" class="zf">
                <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block @click="payOrder(1)">支付宝支付</van-button>
                <van-button color="#4fc08d" block @click="payOrder(2)">微信支付</van-button>
            </div>
        </van-popup>

    </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import { getByCartItemIds } from 'network/cart'
import { getDefaultAddress, getAddressDetail } from 'network/address'
import { createOrder, payOrder } from 'network/order'

import Vue from 'vue';
import { Popup } from 'vant';

Vue.use(Popup);

export default {
    name: 'CreateOrder',
    components: {
        NavBar,
    },
    data() {
        return {
            cartList: [],
            address: {},
            orderNo: '',
            showPay: false,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            // console.log(this.$route.query)
            const { addressId, cartItemIds } = this.$route.query
            // console.log(cartItemIds)
            let _cart = cartItemIds ? JSON.parse(cartItemIds) : JSON.parse(localStorage.getItem('cartItemIds'))
            // console.log(_cart)
            localStorage.setItem('cartItemIds', JSON.stringify(_cart))
            // localStorage.getItem('cartItemIds')
            const{ data } = await getByCartItemIds({ cartItemIds: _cart.join(',') })
            this.cartList = data
            // console.log(data)
            const { data: address } = addressId ? await getAddressDetail(addressId) : await getDefaultAddress(addressId)
            // console.log(address)
            if (!address) {
                this.$router.push('/address')
                return
            }
            this.address = address
        },
        goToAddress () {
            this.$router.push(`/address?cartItemIds=${JSON.stringify(this.cartItemIds)}`)
        },
        async createOrder () {
            const params = {
                addressId: this.address.addressId,
                cartItemIds: this.cartList.map( item => item.cartItemId )
            }
            const { data } = await createOrder(params)
            localStorage.setItem('cartItemIds','')
            this.orderNo = data
            this.showPay = true
        },
        async payOrder (type) {
            await payOrder({ orderNo:this.orderNo, payType:type })
            this.$router.push('/order')
        },
        close() {
        this.$router.push({ path: 'order' })
        },

    },
    computed: {
        total: function() {
            let sum = 0
            this.cartList.forEach(item => {
                sum += item.goodsCount * item.sellingPrice
            })
            return sum
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/mixin.styl'
#create-order
    height 100vh
    background-color $bc
.address
    position relative
    font-size 30px
    background-color #fff
    margin-top 80px
    height 150px
    text-align left
    padding 30px 40px
    .name
        height 100px
    .addr
        height 100px
    .arrow
        position absolute
        right 20px
        top 93px

.goods
    margin-bottom 100px
    .good-item
        background-color #fff
        display flex
        width 100%
        height 300px
        .good-desc
            position relative
            flex 1
            padding 60px 50px 0 0
            font-size 20px
            .good-title
                .name
                    float left 
                .num 
                    float right
            .price
                position absolute
                bottom 50px
                font-size 30px
                color red
        .img-wrapper
            width 240px
            height 240px
            margin 30px
            img 
                width 100%
        .con
            flex 1
.create
    height 100px
    position fixed
    bottom 0
    left 0
    right 0
    padding 20px 40px
    background-color #fff
    font-size 35px
    span
        float left 
    .money
        float right
        color red
    .van-button
        border-radius 10px
        height 60px
        font-size 25px
.zf
    .van-button
        border-radius 20px
        font-size 30px
</style>