import request from '@/modules/request';

export default {
    namespaced: true,

    state: {
        header: {
            items: []
        },
        dashboard: [],
        'footer-1': {
            items: []
        },
        'footer-2': {
            items: []
        },
        show: false
    },

    mutations: {
        toggle(state, show) {
            state.show = show;
        },

        dashboardMenu(state, items) {
            state.dashboard = items;
        }
    },

    actions: {
        async initialize({state}) {
            request('menu').response().then(res => {
                const menu = res.json();

                for (let key in menu) {
                    state[key] = menu[key];
                }
            });

        }
    }
};
