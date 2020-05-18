import Vue from 'vue';

import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ExternalLink from '@components/ext-link';

// Directives
import Loading from 'element-ui/packages/loading/src/directive';
import highlight from 'vue-highlight-text/public/directive.min.js';


import App from '@/layout/app';

// Styles
import '@/styles/styles.scss';

import store from '@/store';
import router from '@/router';
import common from '@/plugins/common.plugin';
import request from '@/plugins/fetch.plugin';
import initializeStore from '@/modules/store-initializer';

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// configure language
locale.use(lang);

Vue.component('ext-link', ExternalLink)
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Loading);
Vue.directive('highlight', highlight);
Vue.use(common);
Vue.use(request);

window.loadAuthDep = async function (user) {
    return (await import('@/modules/auth-extra-loader')).default(user);
};

new Vue({
    store,
    router,
    render: h => h(App),
    async created() {
        await initializeStore(this.$store);

        this.$store.commit('loading', false);
        this.$store.commit('initialized');
    }
}).$mount('#app');
