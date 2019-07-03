import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/authenticator'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false,
        menu: [
            {
                title: 'প্রথম পাতা',
                link: '/'
            },
            {
                title: 'চাকরির বিজ্ঞাপন দিন',
                link: '/post-job',
                children: [{
                    title: 'প্রথম পাতা',
                    link: '/'
                }]
            },
            {
                title: 'যোগাযোগ',
                link: '/contact'
            }
        ],
        dashboardMenu: [
            {
                title: 'ড্যাশবোর্ড',
                link: '/dashboard',
                icon: 'el-icon-s-marketing'
            },
            {
                title: 'প্রোফাইল এডিট করুন',
                link: '/edit-profile',
                icon: 'el-icon-edit'
            },
            {
                title: 'প্রথম পাতা',
                link: '/'
            },
            {
                title: 'প্রথম পাতা',
                link: '/'
            },
            {
                title: 'প্রথম পাতা',
                link: '/'
            }
        ],
        showMenu: false,

        divisions: {
            type: 'division',
            title: 'বিভাগ সিলেক্ট করুন',
            items: [
                {
                    id: 1,
                    name: 'ঢাকা'
                },

                {
                    id: 2,
                    name: 'সিলেট'
                },

                {
                    id: 3,
                    name: 'চট্টগ্রাম'
                },

                {
                    id: 4,
                    name: 'রাজশাহী'
                },

                {
                    id: 5,
                    name: 'খুলনা'
                },

                {
                    id: 6,
                    name: 'বরিশাল'
                },

                {
                    id: 7,
                    name: 'রংপুর'
                },

                {
                    id: 8,
                    name: 'ময়মনসিংহ'
                }
            ]
        }
    },
    mutations: {
        addChildrenToPlace(state, payload) {
            Vue.set(payload.parent, 'children', payload.children)
        },

        changeLoadingState(state, loading) {
            state.loading = loading
        },

        toggleNavMenu(state, show) {
            state.showMenu = show
        },

        changeLayout(state, layout) {
            state.layout = layout
        }
    },
    modules: {auth}
})
