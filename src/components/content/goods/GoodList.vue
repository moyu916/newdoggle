<template>
    <div class="goods">
        <good-list-item class="goods-item" v-for="item in goods" :key="item.goodsId" :item="item" @click="gotoDetail(item.goodsId)"/>

       <!-- <RecycleScroller
        class="scroller"
        :items="goods"
        :item-size="32">
            <template slot-scope="props">
               <good-list-item :key="props.goodsId"></good-list-item>
            </template> 
         </RecycleScroller> -->

    </div>
</template>
<script>
import GoodListItem from './GoodListItem'
import GoodListItem from './GoodListItem.vue'
export default {
    name:'GoodList',
    props:{
        goods:{
         type:Array,
         default(){
             return []
         }
        },
    },
    components:{
        GoodListItem
    },
    methods: {
        gotoDeatil(id) {
            this.$router.push('/productDetail/' + id)
        },        
    }
}
</script>
<style lang="stylus" scoped>
.goods
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;       
</style>