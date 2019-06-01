const eventHandlers = {
    authStateChange: []
};

export default {
    state: {
        user: null /*{
            name: 'Ibrahim Al Khalil'
        }*/
    },

    mutations: {
        updateUser(state, payload) {
            state.user = payload;
        }
    },

    actions: {
        async initialize({state}) {
            return new Promise(resolve => {
                // Don't get user instance twice from server
                if (state.user !== null) {
                    // Auth is already checked
                    return resolve(state.user);
                }

                // TODO: Get user instance from server
                setTimeout(() => {
                    // this.user = {
                    //     name: 'Ibrahim Al Khalil'
                    // };

                    resolve(state.user);
                }, 200);
            });
        },

        onAuthStateChange(context, handler) {
            eventHandlers.authStateChange.push(handler);
        },

        removeAuthStateObserver(context, {event, handler}) {
            const handlers = eventHandlers[event];
            handlers.splice(handler, 1);
        },

        // Call this method form sign in
        // This function will return a promise which resolves user instance if fulfilled
        // TODO: Implement signIn method
        async signIn({state}, {id, password}) {
            return state.user;
        },

        // Call this method for  sign out
        // TODO: Implement signOut method
        signOut({commit}) {
            commit('updateUser', false);

            eventHandlers.authStateChange.forEach(handler => {
                handler();
            });
        }
    }
};
