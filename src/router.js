/**
 * Created by wulichuan on 2017/4/15 0029.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Album from './components/Album.vue'
import Singer from './components/Singer.vue'
import RankPage from './components/RankPage.vue'
import Cd from './components/Cd.vue'
import Home from './components/Home.vue'
import App from './App.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/singer/:id',name:'singer', component: Singer },
  { path: '/album/:id',name:'album',  component: Album },
  { path: '/rank/:id',name:'rank',  component: RankPage },
  { path: '/cd/:id',name:'cd',  component: Cd },
  { path: '/',name:'home',component: Home},
  // { path: '/:uid',name:'home',component: Home},
  { path: '/login',name: 'login',component: Login },
  { path: '/register',name: 'register',component: Register }

]

export default new VueRouter({
  // mode: 'history',
  routes,
  //只在history模式下有用
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
