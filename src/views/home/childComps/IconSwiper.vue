<template>
  <swiper ref="swiper" class="my-swipe" :showIndicator="false" :loop="false">
    <swiper-item v-for="(page, index) in pages" :key="index">
        <div class="icon-item" v-for="item in page" :key="item.categoryId">
          <div class="img-wrapper">
            <img :src="item.imgUrl" alt="">
          </div>
          <span class="name">{{item.name}}</span>
        </div>
    </swiper-item>
  </swiper> 
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";
export default {
    name: "IconSwiper",
    components: {
        Swiper,
        SwiperItem,
    },
    data () {
        return {
            categoryList: [
            {
            name: '新蜂超市',
            imgUrl: '//s.weituibao.com/1583585285461/cs.png',
            categoryId: 100001
            }, {
            name: '新蜂服饰',
            imgUrl: '//s.weituibao.com/1583585285468/fs.png',
            categoryId: 100003
            }, {
            name: '全球购',
            imgUrl: '//s.weituibao.com/1583585285470/qq.png',
            categoryId: 100002
            }, {
            name: '新蜂生鲜',
            imgUrl: '//s.weituibao.com/1583585285472/sx.png',
            categoryId: 100004
            }, {
            name: '新蜂到家',
            imgUrl: '//s.weituibao.com/1583585285467/dj.png',
            categoryId: 100005
            }, {
            name: '充值缴费',
            imgUrl: '//s.weituibao.com/1583585285465/cz.png',
            categoryId: 100006
            }, {
            name: '9.9元拼',
            imgUrl: '//s.weituibao.com/1583585285469/pt.png',
            categoryId: 100007
            }, {
            name: '领劵',
            imgUrl: '//s.weituibao.com/1583585285468/juan.png',
            categoryId: 100008
            }, {
            name: '省钱',
            imgUrl: '//s.weituibao.com/1583585285471/sq.png',
            categoryId: 100009
            }, {
            name: '全部',
            imgUrl: '//s.weituibao.com/1583585285470/qb.png',
            categoryId: 100010
            }
        ],
        }
    },
    computed: {
        pages () {
        const pages = []
        this.categoryList.forEach((item,index)=>{
            const num = Math.floor(index/8)
            if(!pages[num]){
            pages[num] = []
            }
            pages[num].push(item)
        })
        return pages
        } 
    }
}
</script>

<style lang="stylus" scoped>
.my-swipe
  width 100%
  height 160px
  .icon-item
    float left
    width 25%
    text-align center
    .name
      font-size 16px
    .img-wrapper
      padding 8px 8px
      img 
        width 50%
</style>