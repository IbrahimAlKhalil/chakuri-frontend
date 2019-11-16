import Vue from 'vue';
import store from '@/store';
import socket from '@/modules/socket';
import {dispatch} from '@/modules/store-initializer';
import notification from '@/stores/notification.store';
import {common, employee, institution} from '@/modules/menu-items';

export default async function (user) {


    const path = 'notification';

    // Undo
    if (!user) {
        store.unregister(path);
        store.commit('menu/dashboardMenu', []);

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
        default:
            items = [...commonItems, ...institution];
    }

    // Push menu items
    store.commit(
        'menu/dashboardMenu', items.map(item => {
            return {
                ...item,
                link: `/dashboard/${item.link}`
            };
        })
    );

    // Register notification store module

    store.registerModule(path, notification);

    const modules = [store._modules.root._children[path]];

    await dispatch(modules, 'initialize');
    await dispatch(modules, 'initialized');
}
