<template>
  <div class="wrapper" ref="wrapper">
    <div class="content" ref="con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// import BetterScroll from "better-scroll";
export default {
  name: "Scroll",
  props:{
    /**是否监听滚动 */
    probeType:{
      type:Number,
      default(){
        return 0
      }
    },
    /**上拉加载更多 */
    pullUpLoad:{
      type:Boolean,
      default(){
        return true
      }
    }
  },
  watch: {
    data() {
      this.$nextTick(()=>this.refresh())
      // console.log(this.$refs.swiper.firstElementChild.height)
    }
  },
  mounted() {
    setTimeout(this.initScroll,200)
    // console.log(this.$refs.wrapper.clientHeight)
    // console.log(this.$refs.con.clientHeight)
  },
  methods: {
    initScroll() {
        this.scroll = BetterScroll.createBScroll(this.$refs.wrapper, {
          click: true,
          probeType: this.probeType ,//3实时监听滚动
          pullUpLoad:this.pullUpLoad//上拉加载更多
        })
        this.scroll.on('scroll', (position) => {//监听滚动
          this.$emit('scroll',position);   
        });
        this.scroll.on('pullingUp',()=>{
          this.$emit("pullingUp");
        })
    },
    scrollTo(x, y, timer = 500) {
      if(this.scroll) {
        this.scroll.scrollTo(x, y, timer); //better-scroll内置方法，回到指定位置
      }
    },
    finishPullUp(){//上拉加载更多完成
      this.scroll.finishPullUp();
    },
    refresh(){//从新计算滚动高度
      if(this.scroll) {
        this.scroll.refresh(); 
      }  
    },
    getScrollY(){
      return this.scroll?this.scroll.y:0;
    }
  }
};
</script>
<style lang="stylus" scoped>
.wrapper
  height 100vh
  .content
    min-height 101vh
</style>