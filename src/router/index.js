import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "about" */ 'views/category/Category.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "about" */ 'views/cart/Cart.vue'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "about" */ 'views/user/User.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ 'views/Login.vue'),
  },
  {
    path: '/productList',
    name: 'ProductList',
    component: () => import(/* webpackChunkName: "about" */ 'views/ProductList.vue'),
  },
  {
    path: '/productDetail/:id',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "about" */ 'views/detail/ProductDetail.vue'),
  },  
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ 'views/user/About.vue'),
  },
  {
    path: '/createOrder',
    name: 'CreateOrder',
    component: () => import(/* webpackChunkName: "about" */ 'views/CreateOrder.vue'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "about" */ 'views/Order.vue'),
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import(/* webpackChunkName: "about" */ 'views/user/Setting.vue'),
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "about" */ 'views/Address.vue'),
  },
  {
    path: '/address-edit',
    name: 'AddressEdit',
    component: () => import(/* webpackChunkName: "about" */ 'views/AddressEdit.vue'),
  },


]

const router = new VueRouter({
  routes
})

export default router
