import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menu: [
            {
                title: 'home',
                link: '/'
            },
            {
                title: 'circular',
                link: '/post-job'
            },
            {
                title: 'contact',
                link: '/contact'
            }
        ]
    },
    mutations: {},
    actions: {}
})
