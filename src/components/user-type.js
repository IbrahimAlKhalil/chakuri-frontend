import {mapState} from 'vuex'

export default {
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    computed: mapState({
        auth: 'auth'
    }),
    render(createElement) {
        const {user} = this.auth
        const {$slots} = this

        if (user && user.type === this.id) {
            return createElement('fragment', $slots.default)
        }

        return null
    }
}
