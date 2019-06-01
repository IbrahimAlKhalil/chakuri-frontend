import VueRouter from 'vue-router';
import viddleware, {group} from '@modules/viddleware';
import guest from '@middleware/guest';

const router = new VueRouter({
    mode: 'history',
    routes: [
        ...group(guest, [
            {
                path: '/sign-in',
                component: () => import('./pages/sign-in/page')
            },
            {
                path: '/sign-up',
                component: () => import('./pages/sign-up/page')
            }
        ]),

        {
            path: '/',
            component: () => import('./pages/home/page')
        }
    ]
});

export default viddleware(router);
