<template>
    <div class="check" @click="checkClick">
        <!--动态绑定class时监听不到对象里属性的变化如：:class="{action:item.checked}，通过click时修改item.checked时样式并不会随之变化-->
        <div class="item" :class="{action:action}"></div>
    </div>
</template>
<script>
export default {
    name:'CheckButton',
    props:{
        action:{
            type:Boolean,
            default(){
                return false
            }
        }
    },
    methods:{
        checkClick(){
            // this.action=!this.action;
            this.$emit("checkClick");
        }
    }
}
</script>
<style lang="stylus" scoped>
.check
    display: inline-block
    width: 20px
    height: 20px
    float: left
    margin-left: 10px
.item
    border: 1px solid #aaa
    width: 18px
    height: 18px
    border-radius: 50%
.action
    border: 1px solid #fff
    background-color: #1baeae
    background-image: url("~@/assets/img/cart/tick.svg")
    background-size: 100%
</style>