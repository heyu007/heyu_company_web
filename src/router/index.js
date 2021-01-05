import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: ()=> import('../views/Article.vue')
  },
  {
    path:'/404',
    name:'404',
    meta:{
      keepAlive:true,
      isTab:false,
      isAuth:false,
    },
    component:()=>import('../views/404.vue'),
  },
  {
    path:'*',
    redirect:'/404',
    name:'notFound',
   
    hidden:true,
  }
]

const router = new VueRouter({
  mode: 'hash', // history
  base: process.env.BASE_URL,
  routes
})

export default router
