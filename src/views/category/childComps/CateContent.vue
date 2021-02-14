<template>
    <div v-if="data">
        <div v-for="item in data" :key="item.categoryId"> 
            <div v-if="currentIndex == item.categoryId">
                <div v-for="second in item.secondLevelCategoryVOS" :key="second.categoryId" class="second">
                    <p class="title">{{second.categoryName}}</p>
                    <div v-for="third in second.thirdLevelCategoryVOS" :key="third.categoryId" class="third" @click="selectGoods(third.categoryId)">
                        <img src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" alt="">
                        <p>{{third.categoryName}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
  name: 'CateContent',
  props: {
    data: {
      type: Array
    },
    currentIndex: {
        type: Number
    }
  },
  data(){
     return {
        //   currentIndex: 15,
     }
  },
  methods: {
        selectGoods (id) {
            this.$router.push({ path: `/productList?categoryId=${id}` })
        },
  }
}
</script>

<style lang="stylus" scoped>
.title
    height 35px
    line-height 35px
    font-size 15px
    font-weight 600
    text-align left
.second
    text-align left
    p
        text-align center
    .third
        display inline-block
        width 33%
        text-align center
        img 
            width 30px
            height 30px
        p
            padding 8px 0
</style>