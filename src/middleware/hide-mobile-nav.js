import store from '@/store'

/*
* This middleware will hide the nav menu on mobile before loading every page
*/

export default async function (route, from, next) {
    store.commit('toggleNavMenu', false)
    next()
}
