export default {
    namespaced: true,

    state: {
        main: [
            {
                title: 'প্রথম পাতা',
                link: '/'
            },
            {
                title: 'যোগাযোগ',
                link: '/contact'
            }
        ],
        dashboard: [],
        show: false,
        dashboardUrl: '/dashboard/profile'
    },

    mutations: {
        toggle(state, show) {
            state.show = show;
        },

        dashboardMenu(state, items) {
            state.dashboard = items;
        },

        dashboardUrl(state, url) {
            state.dashboardUrl = url;
        }
    }
};
