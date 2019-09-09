import request from '@modules/request'
import {clearTokens, retrieveToken} from '@/modules/tokenizer'
import photo from '@assets/images/user.svg'

export default {
    state: {
        user: null,
        authInitialized: false
    },

    actions: {
        async initialize({state}) {
            return new Promise(async resolve => {
                if (state.authInitialized) {
                    return resolve(state.user)
                }

                state.authInitialized = true
                // Don't get user instance twice from server
                if (state.user !== null) {
                    // Auth is already checked
                    return resolve(state.user)
                }

                // TODO: Get user instance from server
                const token = retrieveToken()
                if (token) {
                    await this.dispatch('signIn')
                }

                resolve(state.user)
            })
        },

        // Call this method form sign in
        // This function will return a promise which resolves user instance if fulfilled
        // TODO: Implement signIn method
        async signIn({state}) {
            const response = await request('user').response()

            if (response.status === 401) {
                clearTokens()
                return
            }

            state.user = response.json()

            if (!state.user.photo) {
                state.user.altPhoto = photo
            }
        },

        // Call this method for  sign out
        // TODO: Implement signOut method
        signOut({state}) {
            state.user = null
            clearTokens()
        }
    },

    mutations: {
        updateUser(state, payload) {
            state.user[payload.prop] = payload.value
        }
    }
}
