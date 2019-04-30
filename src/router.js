import VueRouter from 'vue-router'

import middleware from './modules/middleware'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: () => import('./pages/home/page') }
  ]
})

export default middleware(router)
