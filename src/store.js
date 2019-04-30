import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        menu: [
            {
                title: 'বাড়ি',
                link: '/'
            },

            {
                title: 'Profile',
                link: '/profile'
            },
            {
                title: 'Contact',
                link: '/contact'
            },
            {
                title: 'Services',
                children: [
                    {
                        title: 'Home',
                        link: '/'
                    },
                    {
                        title: 'Item One',
                        link: '/'
                    },
                    {
                        title: 'Item Two',
                        link: '/',
                        children: [
                            {
                                title: 'Home',
                                link: '/'
                            },
                            {
                                title: 'Item One',
                                link: '/'
                            }
                        ]
                    }
                ]
            },
            {
                title: 'About',
                link: '/about'
            }
        ]
    },
    mutations: {},
    actions: {}
})
