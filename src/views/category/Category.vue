<template>
  <div id="category">
    <!-- 页面头部 -->
    <nav-bar>
        <template v-slot:left>
          <i class="iconfont icon-leftarrow" @click="$router.go(-1)"></i>
        </template>
    </nav-bar>
    <div class="list">
      <scroll class="list-left">
          <cate-menu v-if="data" :data="data" @selectMenu="toggle"></cate-menu>
      </scroll>
      <scroll class="list-right" ref="child">
          <cate-content v-if="data" :data="data" :currentIndex="currentIndex"></cate-content>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar.vue'
import Scroll from "content/scroll/Scroll";

import CateMenu from './childComps/CateMenu'
import CateContent from './childComps/CateContent'

import { getCategory } from 'network/goods'

export default {
    name: "Category",
    components: {
      NavBar,
      Scroll,
      CateMenu,
      CateContent,
    },
    data () {
        return {
            title: '分类',
            data: [],
            currentIndex: 15
        }
    },
    methods: {
        async _getCategory() {
            const { data } = await getCategory()
            this.data = data  //怎么解决data最开始渲染为空的问题            
        },
        toggle(id) {
            this.currentIndex=id
        }
    },
    mounted () {
        this._getCategory()
    },
    updated() {
        this.$refs.child.scrollTo(0,0,0)
        this.$refs.child.refresh()
    }
}
</script>

<style lang="stylus" scoped>
.list
    margin-top 10px
    display flex
    font-size 12px
    .list-left
        box-sizing border-box
        width 100px
        height calc(100vh - 60px)
        background-color $bc
    .list-right
        flex 1
        box-sizing border-box
        width 100px
        height calc(100vh - 60px)
        padding 0 10px
</style>