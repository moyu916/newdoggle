<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="stylus" scoped>
.nav-bar 
  display flex
  top 0
  z-index: 9;
  height: 44px
  line-height: 44px
  text-align: center
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1)
  background-color: #fff
  
  .left,.right 
    width: 80px

  .center 
    width  290px
</style>