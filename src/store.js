import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/authenticator';

Vue.use(Vuex);

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
                link: '/post-job'
            },
            {
                title: 'যোগাযোগ',
                link: '/contact'
            }
        ],

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
            Vue.set(payload.parent, 'children', payload.children);
        },

        changeLoadingState(state, loading) {
            state.loading = loading;
        }
    },
    modules: {auth}
});
