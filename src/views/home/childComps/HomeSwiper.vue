<template>
  <swiper ref="swiper">
    <swiper-item v-for="(item, index) in pics" :key="index">
        <img :src="item.carouselUrl" alt />
    </swiper-item>
  </swiper>  
</template>

<script>
import { Swiper, SwiperItem } from "common/swiper";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    pics: {
      type: Array
    }
  },
  methods: {
    // stopTimer() {
    //   this.$refs.swiper.stopTimer();
    // },
    // startTimer() {
    //   if (this.$refs.swiper) {
    //     this.$refs.swiper.startTimer();
    //   }
    // },

  }
};
</script>

<style lang="stylus" scoped>

</style>