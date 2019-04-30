import { authenticator } from '../modules/authenticator'

/*
* This middleware will check whether user is authenticated
* If not then redirect url specified by redirectUrl parameter
* If yes then let the user get to the route
*/

// TODO: Change redirectUrl if it needs to be
const redirectUrl = '/'

export default async function (route, from, next) {
  // User should be authenticated
  const user = await authenticator.initialize()

  if (!user) {
    // User is not authenticated
    // Redirect to the specified page

    return next(redirectUrl)
  }

  // User is authenticated
  next()
}
