import VueRouter from 'vue-router'
import viddleware, {group} from '@modules/viddleware'
import guest from '@middleware/guest'
import auth from '@middleware/auth'
import hideMobileNav from '@middleware/hide-mobile-nav'
import switchLayout from '@middleware/switch-layout'
import lazy from '@modules/lazy'

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

        ...group(auth, [
            {
                path: '/user',
                component: () => lazy(import('./pages/user/page')),
                children: [
                    {
                        path: 'resume',
                        component: () => lazy(import('./pages/resume/page'))
                    },
                    {
                        path: 'notifications',
                        component: () => lazy(import('./pages/notification/page'))
                    },
                    {
                        path: 'profile',
                        component: () => lazy(import('./pages/profile/page'))
                    }
                ],
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
        },

        {
            path: '/jobs/:id',
            component: () => lazy(import('./pages/job/page'))
        }
    ]
})

export default viddleware(router, [switchLayout, hideMobileNav])
