<template>
<div id="product-list">
    <nav-bar class="product-header">
        <template v-slot:left>
          <i class="iconfont icon-leftarrow" @click="handleBack()"></i>  
        </template>
        <template v-slot:center>
            <input v-model="keywords" type="text" placeholder="">
        </template>
        <template v-slot:right>
            <button @click="handleSearch()">搜索</button>
        </template>
    </nav-bar>

    

    <van-tabs v-model="active" class="tabs" @click="changeTab" type="card" color="#1baeae">
        <van-tab title="推荐" name=""></van-tab>
        <van-tab title="新品" name="new"></van-tab>
        <van-tab title="价格" name="price"></van-tab>
    </van-tabs>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh()" class="refresh">
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad()"
        >
            <div class="product-item" v-for="(item,index) in productList" :key="index" @click="productDetail(item)">
                <div class="img_wrapper">
                    <img :src="`//47.99.134.126:28019${item.goodsCoverImg}`" alt="">
                </div>
                <div class="item-info">
                    <p>{{item.goodsName}}</p>
                    <p class="desc">{{item.goodsIntro}}</p>
                    <span>￥{{item.sellingPrice}}</span>
                </div>
            </div>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import { search } from 'network/goods'

import Vue from 'vue';
import { Tab, Tabs, PullRefresh,List } from 'vant';

Vue.use(Tab).use(Tabs).use(PullRefresh).use(List);

export default {
    name: 'ProductList',
    components: {
        NavBar
    },
    data () {
        return {
            active: 2,
            keywords: '', // 搜索的关键词
            orderBy: '', // 按哪个tab栏获取数据
            refreshing: false, // 是否是下拉刷新
            loading: false,
            finished: false,
            productList: [],
            page: 1,
            totalPage: 0,
        }
    },
    methods: {
        handleBack(){
            this.$router.go(-1)
        },
        handleSearch(){
            // console.log('click')
            this.onRefresh()
        },
        changeTab(name) {
            this.orderBy = name
            this.onRefresh()
        },
        onRefresh() {
            this.refreshing = true 
            this.finished = false
            this.loading = true
            this.page = 1
            // console.log('onrefresh')
            this.onLoad()
        },
        onLoad() {
            // 不是下拉刷新，而是下拉加载
            if(!this.refreshing && this.page<this.totalPage){
                this.page = this.page + 1 
            }
            // 是下拉刷新
            if(this.refreshing) {
                this.productList = []
                this.refreshing = false
            }
            // console.log('onload')
            this.init()
        },
        async init() {
            const { categoryId } = this.$route.query
            if(!this.keywords && !categoryId) {
                this.finished = true
                this.loading = false
                return
            }
            // console.log(this.page)
            const { data, data: { list } } = await search({pageNumber: this.page, goodsCategoryId: categoryId, keyword: this.keywords, orderBy: this.oederBy})
            // console.log(list)
            this.productList = this.productList.concat(list)// this.productList = list
            // console.log(this.productList)
            this.totalPage = data.totalPage
            this.loading = false
            if(this.page >= this.totalPage) this.finished = true
        },
        productDetail(item) {
            this.$router.push({ path: `productDetail/${item.goodsId}` })
        }
    },
}
</script>

<style lang="stylus" scoped>
.product-header
    background-color #fff
    text-align center
    .icon-leftarrow
        width 40px
        padding-left 14px
        font-size 16px
        text-align left
    input 
        width 100%
        text-align center
        font-size 15px
        border-radius 20px
        border 1px $primary solid
        margin 0 10px
        background-color rgba(255,255,255,0.6)
    button
        width: 80%
        height 30px
        line-height 30px
        background-color: $primary;
        border-radius 10px
        color #fff
        margin-left 15px
.van-tabs
    margin-top 50px
    >>>.van-tabs__wrap
        height 25px
    >>> .van-tabs__nav--card
        height 25px
.refresh
    margin-top 40px
.product-item
    display flex
    box-sizing border-box
    width 100%
    border-bottom 2px #ddd solid
    padding 10px 10px
    font-size 14px
    .img_wrapper
        box-sizing border-box
        width 150px
        height 150px
        flex-shrink: 0
        padding 8px 8px
        img 
            width 100%
    .item-info
        flex 1
        text-align left 
        min-width 0
        p
            ellipsis()
            margin 10px 0
        span
            color $primary
        .desc
            color #888
.van-pull-refresh
    margin-top 0
.van-list
    min-height 100vh
</style>