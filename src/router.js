import VueRouter from 'vue-router';
import viddleware, {group} from '@modules/viddleware';
import guest from '@middleware/guest';
import auth from '@middleware/auth';
import global from '@middleware/global';
import lazy from '@modules/lazy';

// TODO: Add 404 page

const router = new VueRouter({
    mode: 'history',
    routes: [
        ...group(guest, [
            {
                path: '/sign-in',
                component: () => lazy(import('./pages/sign-in/page'))
            },
            {
                path: '/control',
                redirect: {
                    path: '/sign-in',
                    query: {
                        moderator: 'yes'
                    }
                }
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
                        path: 'post-job',
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
                        component: () => lazy(import('@/pages/dashboard/pages/my-jobs/applications')),
                        children: [
                            {
                                path: '',
                                component: () => lazy(import('@/pages/dashboard/pages/my-jobs/empty-applications'))
                            },

                            {
                                name: 'resume',
                                path: 'resume/:userId',
                                component: () => lazy(import('@/pages/dashboard/pages/my-jobs/resume'))
                            }
                        ]
                    },
                    {
                        path: 'saved-jobs/:type',
                        component: () => lazy(import('@/pages/dashboard/pages/saved-jobs/page'))
                    }
                ],
            }
        ]),

        {
            path: '/articles/:id',
            component: () => lazy(import('./pages/article/page')),
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
            path: '*',
            component: () => lazy(import('@/components/four-zero-four'))
        }
    ]
});

export default viddleware(router, [global]);
