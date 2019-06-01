import store from '@/store';

/*
* This middleware will check whether user is authenticated
* If not then redirect url specified by redirectUrl parameter
* If yes then let the user get to the route
*/

// TODO: Change redirectUrl if it needs to be
const redirectUrl = '/';

export default async function (route, from, next) {
    // User should not be authenticated
    const user = await store.dispatch('initialize');

    if (!user) {
        // User is not authenticated
        return next();
    }

    // User is authenticated
    // Redirect to the specified page
    next(redirectUrl);
}
