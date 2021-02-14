<template>
  <div id="order">
      <nav-bar>
          <template v-slot:center>我的订单</template>
      </nav-bar>
      <van-tabs @change="onChangeTab" :color="'#1baeae'" :title-active-color="'#1baeae'" class="order-tab" v-model="status">
        <van-tab title="全部" name=''></van-tab>
        <van-tab title="待付款" name="0"></van-tab>
        <!-- <van-tab title="待确认" name="1"></van-tab> -->
        <van-tab title="待发货" name="2"></van-tab>
        <van-tab title="待收货" name="3"></van-tab>
        <van-tab title="交易完成" name="4"></van-tab>
      </van-tabs>

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="order-list-refresh">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                @offset="300"
            >
                <div v-for="(item, index) in list" :key="index" class="order-item-box" @click="goTo(item.orderNo)">
                    <div class="order-item-header">
                        <span class="order-time">订单时间：{{ item.createTime }}</span>
                        <span class="order-status">{{ item.orderStatusString }}</span>
                    </div>
                    <van-card
                        v-for="one in item.newBeeMallOrderItemVOS"
                        :key="one.orderId"
                        :num="one.goodsCount"
                        :price="one.sellingPrice"
                        desc="全场包邮"
                        :title="one.goodsName"
                        :thumb="`http://lmall.xinfeng.site${one.goodsCoverImg}`"
                    />
                </div>
            </van-list>
        </van-pull-refresh>

  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import { getOrderList } from 'network/order'

import Vue from 'vue';
import { Tab, Tabs, List, Card } from 'vant';
import { PullRefresh } from 'vant';

Vue.use(PullRefresh);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List).use(Card);

export default {
    name: 'Order',
    components: {
        NavBar,
    },
    data() {
        return {
            loading: false,
            page: 1,
            status: '',
            finished: false,
            refreshing: false,
            list: []
        }
    },
    methods: {
        async loadData() {
            const { data } = await getOrderList({ pageNumber: this.page, status: this.status})
            this.list = [...data.list]
            console.log(this.list)
            this.loading = false
            if( this.page >= data.totalPage ) this.finished = true // this.page == data.totalPage 
        },
        onChangeTab(name) {
            this.status = name
            this.onRefresh()
        },
        onRefresh() {
            this.refreshing = true
            this.finished = false
            this.loading = true
            this.page = 1
            this.onLoad()
        },
        onLoad() {
            // 加载更多
            if(!this.refreshing && this.page < this.totalPage) {
                this.page = this.page + 1
            }
            //刷新
            if (this.refreshing) {
                this.list = []
                this.refreshing = false
            }
            this.loadData()
        }
    }
}
</script>

<style lang="stylus" scoped>
.order-tab
    margin-top 75px
    height 70px
    >>> .van-tabs__wrap
        height 70px
    >>> .van-tab
        font-size 25px
    >>> .van-tab__text
        overflow visible
.order-list-refresh
    margin 20px 0
    padding 20px 50px
    .order-item-box
        margin 25px
        .order-item-header
            height 30px
            font-size 20px
            .order-time
                float left
        .van-card
            background-color #fff
            font-size 25px
            >>> .van-card__thumb
                height 150px
                width 150px
            >>> .van-card__content
                text-align left
            >>> .van-card__desc
                margin 10px 0
            >>> .van-ellipsis
                overflow visible
            >>> .van-multi-ellipsis--l2
                overflow visible
                margin 10px 0
</style>