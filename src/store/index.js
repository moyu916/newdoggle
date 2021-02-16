import Vue from 'vue'
import Vuex from 'vuex'

import { addCart } from 'network/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartCount: 0,
    cartList: [],
  },
  actions: {
    // 方案二
    judgeProduct(context,product){
      let list = context.state.cartList;
      for(let i in list){
          if(list[i].goodsId==product.goodsId){
              context.commit("addCount",i);
              return;
          } 
      }
      context.commit("addProduct",product);
    },
    // 方案一
    // async getCart(ctx) {
    //   const { data } = await getCart()
    //   let num = 0;
    //   for (let i of data){
    //     Vue.set(i,'checked',false)
    //     Vue.set(i,'index',num)
    //     num++
    //   } 
    //   ctx.commit('getCart', data)
    // },

  },
  mutations: {
    initCartData(state,payload) {
      state.cartList = payload
    },
    // 方案二
    addCount(state,index){
      state.cartList[index].count++
    },
    addProduct(state,product){
        product.index=state.cartList.length;
        state.cartList.push(product);
        addCart({goodsCount: 1, goodsId: product.goodsId})
    },  

    // 方案一
    getCart(state, payload) {
      state.cartList = payload
      // console.log(state.cartList)
    },

    //计算购物车商品数量
    addCart (state, payload) { 
      state.cartCount = payload.count
    },

    // getData (state, payload) {
    //   state.cartList.splice(0,state.cartList.length)
    //   for(let i of payload.data) {
    //     state.cartList.push(i)
    //   }
    //   // state.cartData = payload.data 
    // },
    addToCart(state,payload) {
      payload.checked = false;
      payload.index = state.cartCount-1
      state.cartList.push(payload)
    },

    modifyChecked(state,index){
      state.cartList[index].checked=!state.cartList[index].checked;
    },
    allSelected(state){
      state.cartList.forEach(item=>{
          return item.checked=true;
      })
    },
    unAllSelected(state){
      state.cartList.forEach(item=>{
          return item.checked=false;
      })
  },
  }
})
