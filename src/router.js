import VueRouter from 'vue-router';
import viddleware, {group} from '@modules/viddleware';
import guest from '@middleware/guest';
import auth from '@middleware/auth';
import global from '@middleware/global';
import lazy from '@modules/lazy';

// TODO: Add 404 page

const isAndroid = !!window.cordova;

const router = new VueRouter({
    mode: isAndroid ? 'hash' : 'history',
    base: isAndroid ? '/index.html' : '/',
    routes: [
        ...group(guest, [
            {
                path: '/sign-in',
                component: () => lazy(import('./pages/sign-in/page'))
            },
            {
                path: '/sign-up',
                component: () => lazy(import('./pages/sign-up/page'))
            },
            {
                path: '/forgot-password',
                component: () => lazy(import('./pages/forgot-password/page'))
            },
            {
                path: '/password-reset',
                component: () => lazy(import('./pages/password-reset/page'))
            }
        ]),

        ...group(auth, [
            {
                path: '/dashboard',
                component: () => lazy(import('@/pages/dashboard/layout')),
                children: [
                    {
                        path: 'resume',
                        component: () => lazy(import('@/pages/dashboard/pages/resume/page'))
                    },
                    {
                        path: 'notifications',
                        component: () => lazy(import('@/pages/dashboard/pages/notification/page'))
                    },
                    {
                        path: 'profile',
                        component: () => lazy(import('@/pages/dashboard/pages/profile/page'))
                    },
                    {
                        path: 'post-job/:id?',
                        component: () => lazy(import('@/pages/dashboard/pages/job-post/page'))
                    },
                    {
                        name: 'my-jobs',
                        path: 'jobs',
                        component: () => lazy(import('@/pages/dashboard/pages/my-jobs/page')),
                    },
                    {
                        name: 'my-job',
                        path: 'jobs/:id',
                        component: () => lazy(import('@/pages/dashboard/pages/my-jobs/applications'))
                    },
                    {
                        name: 'resume',
                        path: 'jobs/:jobId/resume/:application',
                        component: () => lazy(import('@/pages/dashboard/pages/my-jobs/resume'))
                    },
                    {
                        path: 'favorites',
                        component: () => lazy(import('@/pages/dashboard/pages/favorites/page'))
                    },
                    {
                        path: 'applications',
                        component: () => lazy(import('@/pages/dashboard/pages/applications/page'))
                    }
                ],
            }
        ]),

        {
            path: '/pages/:id',
            component: () => lazy(import('./pages/page/page')),
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
        },
        {
            path: '/email-verification/:token',
            component: () => lazy(import('@components/email-verification'))
        },
        {
            path: '/404',
            name: 'four-zero-four',
            component: () => lazy(import('@/components/four-zero-four'))
        },
        {
            path: '*',
            redirect: {
                name: 'four-zero-four'
            }
        }
    ]
});

export default viddleware(router, [global]);
