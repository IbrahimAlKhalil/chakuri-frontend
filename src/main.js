import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ElementUi from 'element-ui'

import App from './app'
import './modules/registerServiceWorker'

// Styles
import './styles/styles.scss'

import store from './store'
import router from './router'
import Authenticator from './modules/authenticator'

Vue.use(VueRouter);
Vue.use(ElementUi);
Vue.use(Authenticator);
Vue.use(Vuex);

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app');
