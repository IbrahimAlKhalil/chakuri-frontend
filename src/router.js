import VueRouter from 'vue-router'

import viddleware from 'viddleware'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: () => import('./pages/home/page')}
    ]
});

export default viddleware(router)
