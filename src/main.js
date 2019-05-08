import Vue from 'vue';

import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Authenticator from './modules/authenticator';

// Directives
import Loading from 'element-ui/packages/loading/src/directive';

import App from './app';
import './modules/registerServiceWorker';

// Styles
import './styles/styles.scss';

import store from './store';
import router from './router';
import {i18n} from './i18n';

Vue.use(VueRouter);
Vue.use(Authenticator);
Vue.use(Vuex);
Vue.use(Loading);

new Vue({
    store,
    router,
    i18n,
    render: h => h(App),
}).$mount('#app');
