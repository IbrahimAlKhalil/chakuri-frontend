const eventHandlers = {
    authStateChange: []
};

export const authenticator = {
    user: null,

    // You can check whether user is authenticated with this method
    async initialize() {
        return new Promise(resolve => {
            // Don't get user instance twice from server
            if (this.user !== null) {
                // Auth is already checked
                return resolve(this.user)
            }

            // TODO: Get user instance from server
            setTimeout(() => {
                // this.user = {
                //     name: 'Ibrahim Al Khalil'
                // };

                resolve(this.user)
            }, 200)
        })
    },

    onAuthStateChange(handler) {
        eventHandlers.authStateChange.push(handler)
    },

    removeAuthStateObserver(event, handler) {
        const handlers = eventHandlers[event];
        handlers.splice(handler, 1)
    },

    // Call this method form sign in
    // This function will return a promise which resolves user instance if fulfilled
    // TODO: Implement signIn method
    async signIn(id, password) {
        return this.user
    },

    // Call this method for  sign out
    // TODO: Implement signOut method
    signOut() {
        this.user = false;

        eventHandlers.authStateChange.forEach(handler => {
            handler(false)
        })
    }
};

export default {
    install(Vue) {
        Vue.prototype.$auth = authenticator
    }
}
