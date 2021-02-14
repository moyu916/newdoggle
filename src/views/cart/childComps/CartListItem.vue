<template>
    <div class="cart-list-item">
        <check-button :action="item.checked" @checkClick="checkClick" class="checkButton"/>
        <div class="cart-content">
            <img :src="prefix(item.goodsCoverImg)" alt="">
            <div class="good-mess">
                <div class="title">{{item.goodsName}}</div>
                <div class="buy">
                    <span class="price">￥{{item.sellingPrice}}</span>
                    <span class="count">x{{item.goodsCount}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CheckButton from "content/CheckButton"
export default {
    name:'CartList',
    props:{
        item:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    components:{
        CheckButton,
    },
    methods:{
        checkClick(){
            this.$store.commit("modifyChecked",this.item.index);
        }
    }

}
</script>
<style scoped>
.cart-list-item{
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-bottom: 1px solid rgb(202, 202, 202);
}
.checkButton{
    margin-right: 5px;
}
.cart-content{
    width: 100%;
}
.cart-content img{
    width: 20%;
    border-radius: 5px;
}
.good-mess{
    display: inline-block;
    width: 79%;
    padding: 5px 10px;
}
.title{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 18px;
}
.count{
    float: right;
    margin-right: 10px;
}
.buy{
    margin-top: 20px;
}
.price{
    font-size: 18px;
    color: orangered;
}
.count{
    color: #333;
}
</style>