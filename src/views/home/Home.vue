<template>
  <div id="home">
      <home-header></home-header>
      <scroll
        class="content"
        ref="scroll"
        :probeType="1" 
        :pullUpLoad="true"
        @pullingUp="loadMore"
        @scroll="contentScroll"
      >
            <!-- 轮播图组件  -->
            <home-swiper :pics="pics"></home-swiper> 

            <!-- icon滑动组件 -->
            <icon-swiper :loop="false"></icon-swiper>

            <!-- 有限数量商品列表 -->
            <div class="title">热门商品</div>
            <good-list :goods="hot"></good-list>

            <div class="title">新品上线</div>
            <good-list :goods="news"></good-list>

            <!-- 无限滚动加载 -->
            <div class="title">推荐商品</div>
            <good-list :goods="recommend"></good-list>
      </scroll>

      <!--当我们需要监听一个组件的原生事件时，必须给对应的事件加上.native修饰符-->
      <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import Scroll from "content/scroll/Scroll";

import HomeHeader from './childComps/HomeHeader.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import IconSwiper from './childComps/IconSwiper.vue'
import GoodList from 'content/goods/GoodList.vue';

import { getHomeInfo } from 'network/home.js'
import { search } from 'network/goods.js'
import { backTopMixin } from 'assets/js/mixins.js'


export default {
    name: 'Home',
    components: {
        HomeHeader,
        HomeSwiper,
        IconSwiper,
        GoodList,
        Scroll,
    },
    data () {
        return {
        color: '#1baeae',
        pics: [],
        hot: [],
        news: [],
        recommend: [], // 无限列表中存储的
        show: [], // 真正渲染的
        page: 1,
        loading: false,
        finished: false,
        totalPage: 0
        }
    },
    mounted () {
      this._getHomeInfo()
    },
  mixins:[backTopMixin],
  methods: {
    async _getHomeInfo() {
      const { data } = await getHomeInfo()
      this.pics = data.carousels
      this.hot = data.hotGoodses
      this.news = data.newGoodses
      // this.$refs.scroll.refresh();
    },
    /**
     * 子传父事件
     */
    async loadMore() {
      //加载更多图片
        // 下拉加载
        if(this.page<this.totalPage){
            this.page = this.page + 1 
        }
        const { data, data: { list } } = await search({pageNumber: this.page, keyword: '手机'})
        // console.log(list.length)
        
        this.recommend = this.recommend.concat(list)// this.productList = list
        

        this.totalPage = data.totalPage
        this.loading = false
        if(this.page >= this.totalPage) this.finished = true 
        
        //告诉better-scroll上拉加载数据已完毕 
        this.$refs.scroll.finishPullUp();
        //刷新scroll  
        this.$refs.scroll.refresh();
        
    },

    gotoDeatil(id) {
      this.$router.push('/productDetail/' + id)
    },

    contentScroll(position) {
      //1.判断BackTop是否显示
      this.listenShowBackTop(position);
    }
  }, 
}
</script>

<style lang="stylus" scoped>
#home
    .title
        height 40px
        line-height 40px
        background-color $bc
        font-size 20px
        color $primary 

</style>
