import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/authenticator'

Vue.use(Vuex)

let confirmPassResolver

export default new Vuex.Store({
    state: {
        loading: false,
        menu: [
            {
                title: 'প্রথম পাতা',
                link: '/'
            },
            {
                title: 'যোগাযোগ',
                link: '/contact'
            }
        ],
        dashboardMenu: [
            {
                title: 'প্রোফাইল',
                link: '/user/profile',
                icon: 'el-icon-lock'
            },
            {
                title: 'চাকুরীর বিজ্ঞাপন দিন',
                link: '/user/post-job',
                icon: 'el-icon-s-marketing',
                type: 2
            },
            {
                title: 'আপনার বিজ্ঞাপন সমূহ',
                link: '/user/jobs',
                icon: 'el-icon-s-order',
                type: 2
            },
            {
                title: 'নোটিফিকেশন',
                link: '/user/notifications',
                icon: 'el-icon-bell',
                badge: 5
            },
            {
                title: 'জীবন বৃত্তান্ত (CV)',
                link: '/user/resume',
                icon: 'el-icon-s-custom',
                type: 1
            },
            {
                title: 'সংরক্ষিত চাকুরী',
                link: '/user/saved-jobs',
                icon: 'el-icon-s-cooperation',
                type: 1
            }
        ],
        routes: null,
        layout: 'master',
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
        },
        confirmPass: {
            label: '',
            model: {
                pass: ''
            },
            rules: {
                pass: [{required: true, message: ' '}]
            },
            show: false
        },
        lastAuthPath: '/'
    },
    mutations: {
        lastAuthPath(state, path) {
            state.lastAuthPath = path
        },

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
        },

        resolveConfirmPass({confirmPass}, canceled) {

            // Hide the form
            confirmPass.show = false

            // Capture the value
            const value = canceled ? false : confirmPass.model.pass

            // Clear value
            confirmPass.model.pass = ''

            // Resolve
            confirmPassResolver(value)
        }
    },
    actions: {
        async confirmPassword({state}, label = 'এখানে আপনার পাসওয়ার্ড লিখুন') {
            return new Promise(resolve => {
                const {confirmPass} = state

                // Set custom label
                confirmPass.label = label

                // Store the resolve function
                confirmPassResolver = resolve

                // Show the form
                confirmPass.show = true
            })
        }
    },
    modules: {auth}
})
