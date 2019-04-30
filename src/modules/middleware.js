export default function (router) {
  router.beforeEach((route, from, next) => {
    // Make sure that the middleware array does exist

    if (!route.meta.hasOwnProperty('middleware') || !Array.isArray(route.meta.middleware)) {
      // Middleware array doesn't exist call next
      return next()
    }

    // Middleware stack
    // Keep next function in the stack which should be called after all the middleware is called
    const stack = [...(route.meta.middleware), next]

    // This function will be used to make the chain
    const chain = (nextParam) => {
      // Break the chain when there is no middleware to be called
      if (!stack.length) {
        return
      }

      // Break the chain when next is called with any parameter
      if (nextParam !== undefined) {
        return next(nextParam)
      }

      // Keep a reference to the current middleware in the stack before removing it
      const middleware = stack[0]

      // Remove current middleware from the stack
      stack.shift()

      // Make sure current middleware in the stack is not next function
      // If so, then call it without any parameter
      if (middleware === next) {
        return next()
      }

      // Finally call the middleware

      middleware(route, from, chain)
    }

    // Make the chain
    chain()
  })

  return router
}
