import Vue from 'vue';
import store from '@/store';
import socket from '@/modules/socket';
import {dispatch} from '@/modules/store-initializer';
import notification from '@/stores/notification.store';
import {common, employee, institution, moderator} from '@/modules/menu-items';
import router from '@/router';
import {group} from '@/modules/viddleware';
import auth from '@/middleware/auth';
import lazy from '@/modules/lazy';

let routesAdded = false;

export default async function (user) {

    if (!routesAdded) {
        router.addRoutes(group(auth, [
            {
                path: '/dashboard',
                component: () => lazy(import('@/pages/dashboard/layout')),
                children: [
                    {
                        path: 'job-requests',
                        component: () => lazy(import('@/pages/dashboard/pages/job-requests/page'))
                    },
                    {
                        path: 'moderator-profile',
                        component: () => lazy(import('@/pages/dashboard/pages/moderator-profile/page'))
                    },
                    {
                        path: 'moderators',
                        component: () => lazy(import('@/pages/dashboard/pages/moderators/page'))
                    }
                ],
            }
        ]));

        router.onReady(() => {
            if (router.currentRoute.path !== '/') {
                router.push(router.currentRoute.path);
            }
        });
    }

    routesAdded = true;


    const path = 'notification';

    // Undo
    if (!user) {
        store.unregister(path);

        return;
    }

    // Don't modify prototype twice
    if (!Vue.prototype.$socket) {
        Vue.prototype.$socket = socket;
    }


    const commonItems = [common.profile, common.notification];

    // Add menu items based on roles
    let items;

    switch (user.type) {
        case 1:
            items = [...commonItems, ...employee];
            break;
        case 2:
            items = [...commonItems, ...institution];
            break;
        default:
            store.commit('menu/dashboardUrl', '/dashboard/moderator-profile');

            const {permissions} = user;

            items = moderator.filter(item => {
                if (permissions.includes('all')) {
                    return true;
                }

                if (!item.permission) {
                    return true;
                }

                return permissions.includes(item.permission);
            });


    }

    // Push menu items
    store.commit(
        'menu/dashboardMenu', items.map(item => {
            item.link = `/dashboard/${item.link}`;

            return item;
        })
    );

    // Register notification store module

    store.registerModule(path, notification);

    const modules = [store._modules.root._children[path]];

    await dispatch(modules, 'initialize');
    await dispatch(modules, 'initialized');
}
