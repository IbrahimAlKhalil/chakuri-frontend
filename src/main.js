import Vue from 'vue';

import Vuex from 'vuex';
import VueRouter from 'vue-router';

// Directives
import Loading from 'element-ui/packages/loading/src/directive';

import App from '@/layout/app';
import '@modules/registerServiceWorker';

// Styles
import './styles/styles.scss';

import store from './store';
import router from './router';
import {i18n} from './i18n';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Loading);

console.log(App);

new Vue({
    store,
    router,
    i18n,
    render: h => h(App),
}).$mount('#app');
