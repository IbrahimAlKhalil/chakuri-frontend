import Vue from 'vue'

import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ElementUi from 'element-ui'
import Authenticator from './modules/authenticator'

import App from './app'
import './modules/registerServiceWorker'
import '@fortawesome/fontawesome-free/js/all'

// Styles
import './styles/styles.scss'

import store from './store'
import router from './router'
import {i18n} from './i18n'


Vue.use(VueRouter);
Vue.use(ElementUi);
Vue.use(Authenticator);
Vue.use(Vuex);

new Vue({
    store,
    router,
    i18n,
    render: h => h(App),
}).$mount('#app');
