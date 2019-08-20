import Vue from 'vue'

import Vuex from 'vuex'
import VueRouter from 'vue-router'

// Directives
import Loading from 'element-ui/packages/loading/src/directive'

import App from '@/layout/app'
import {Fragment} from 'vue-fragment'
import {auth, guest} from '@components/auth'
// import userType from '@components/user-type'
import Notification from 'element-ui/packages/notification/src/main'
import MessageBox from 'element-ui/packages/message-box/src/main'
import request from '@modules/request'

Vue.prototype.$notify = Notification
Vue.prototype.$fetch = request
Vue.prototype.$messageBox = MessageBox

// Styles
import './styles/styles.scss'

import store from './store'
import router from './router'
// import {i18n} from './i18n';

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Loading)

Vue.component('fragment', Fragment)
Vue.component('auth', auth)
Vue.component('guest', guest)
// Vue.component('user-type', userType)

new Vue({
    store,
    router,
    // i18n,
    render: h => h(App),
}).$mount('#app')
