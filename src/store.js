import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/stores/auth.store';
import menu from '@/stores/menu.store';
import additional from '@/stores/additional.store';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: false,
        initialized: false,
        layout: 'master',
        logo: null,
        title: '',
        isMobile: window.innerWidth < 992,
        isAndroid: !!window.cordova,
        requiredRule: {required: true, message: 'এই ঘরটি পূরণ করতে হবে'}
    },
    mutations: {

        loading(state, loading) {
            state.loading = loading;
        },

        changeLayout(state, layout) {
            state.layout = layout;
        },

        changeDevice(state, isMobile) {
            state.isMobile = isMobile;
        },

        initialized(state) {
            state.initialized = true;
        }
    },
    actions: {
        async initialize({commit, state}) {
            window.matchMedia('(min-width: 992px)').addEventListener('change', e => {
                commit('changeDevice', !e.matches);
            });

            const {$setting} = Vue.prototype;

            state.logo = await $setting('logo');
            state.title = await $setting('title');

            document.title = state.title;
        },

        async bootstrapped() {
        }
    },
    modules: {auth, additional, menu}
});
