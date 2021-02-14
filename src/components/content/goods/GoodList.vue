<template>
    <div class="goods">
        <good-list-item class="goods-item" v-for="item in goods" :key="item.goodsId" :item="item" @click="gotoDetail(item.goodsId)"/>
    </div>
</template>
<script>
import GoodListItem from './GoodListItem'
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