import store from '@/store'

/*
* This middleware will change the layout of the page
*/

export default async function (route, from, next) {
    store.commit('changeLayout', /\/user\/?.*/.test(route.path) ? 'dashboard' : 'master')
    next()
}
