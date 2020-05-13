import Vue from 'vue';
import store from '@/store';
import socket from '@/modules/socket';
import {dispatch} from '@/modules/store-initializer';
import notification from '@/stores/notification.store';

export default async function (user) {

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

    // Add menu items based on roles
    const {permissions} = user;
    const items = [
        {
            label: 'প্রোফাইল',
            link: 'profile',
            icon: 'fa fa-user',
            type: 'page'
        },
        {
            label: 'নোটিফিকেশন',
            link: 'notifications',
            icon: 'fa fa-bell',
            badge: 0,
            type: 'page'
        },
        {
            permission: 'roles',
            label: 'ভূমিকা এবং অনুমতি',
            link: 'roles',
            icon: 'fa fa-shield-alt',
            type: 'page'
        },
        {
            permission: 'moderators',
            label: 'মডারেটর',
            link: 'moderators',
            icon: 'fas fa-user-shield',
            type: 'page'
        },
        {
            permission: 'users',
            label: 'ব্যবহারকারী',
            link: 'users',
            icon: 'fa fa-users',
            type: 'page'
        },
        {
            permission: 'post-job',
            label: 'বিজ্ঞাপন প্রকাশনা',
            link: 'post-job',
            icon: 'fa fa-file-signature',
            type: 'page'
        },
        {
            permission: 'post-job',
            label: 'বিজ্ঞাপন',
            link: 'jobs',
            icon: 'fa fa-list',
            type: 'page'
        },
        {
            permission: 'job-requests',
            label: 'বিজ্ঞাপনের আবেদন',
            link: 'job-requests',
            icon: 'fa fa-stream',
            type: 'page'
        },
        {
            permission: 'positions',
            label: 'পদ',
            link: 'positions',
            icon: 'fa fa-graduation-cap',
            type: 'page'
        },
        {
            permission: 'categories',
            label: 'শ্রেণী',
            link: 'categories',
            icon: 'fa fa-school',
            type: 'page'
        },
        {
            permission: 'institute-types',
            label: 'প্রতিষ্ঠানের ধরণ',
            link: 'institute-types',
            icon: 'fa fa-clipboard-list',
            type: 'page'
        },
        {
            permission: 'geolocation',
            label: 'এলাকা',
            link: 'divisions',
            icon: 'fa fa-globe-asia',
            type: 'page'
        },
        {
            permission: 'pages',
            label: 'পেজ',
            link: 'pages',
            icon: 'fa fa-scroll',
            type: 'page'
        },
        {
            permission: 'menu',
            label: 'মেনু',
            link: 'menu',
            icon: 'fa fa-bars',
            type: 'page'
        },
        {
            permission: 'settings',
            label: 'সেটিংস',
            link: 'settings',
            icon: 'fa fa-cog',
            type: 'page'
        },
    ];
    const filtered = items.filter(item => {
        if (permissions.includes('all')) {
            return true;
        }

        if (!item.permission) {
            return true;
        }

        return permissions.includes(item.permission);

    }).map(item => {
        item.link = `/dashboard/${item.link}`;
        return item;
    });

    // Push menu items
    store.commit('menu/dashboardMenu', filtered);

    // Register notification store module

    store.registerModule(path, notification);

    const modules = [store._modules.root._children[path]];

    await dispatch(modules, 'initialize');
    await dispatch(modules, 'initialized');
}
