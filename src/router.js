import VueRouter from 'vue-router';
import viddleware, { group } from '@modules/viddleware';
import guest from '@middleware/guest';
import auth from '@middleware/auth';
import lazy from '@modules/lazy';

const router = new VueRouter({
    mode: 'history',
    routes: [
        ...group(guest, [
            {
                path: '/sign-in',
                component: () => lazy(import('./pages/sign-in/page'))
            },
            {
                path: '/sign-up',
                component: () => lazy(import('./pages/sign-up/page'))
            }
        ]),

        {
            path: '/articles/:id',
            component: () => lazy(import('./pages/article/page'))
        },

        {
            path: '/search',
            component: () => lazy(import('./pages/search/page'))
        },

        {
            path: '/',
            component: () => lazy(import('./pages/home/page'))
        }
    ]
});

export default viddleware(router);
