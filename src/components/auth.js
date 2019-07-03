import {mapState} from 'vuex'

const mixin = {
    methods: {
        render(createElement, guest) {
            const {$slots} = this

            console.log('Hello')

            if (guest) {
                return createElement('fragment', !this.auth.user ? $slots.default : $slots.else)
            }

            return createElement('fragment', this.auth.user ? $slots.default : $slots.else)
        }
    },
    computed: mapState({
        auth: 'auth'
    })
}

export const auth = {
    mixins: [mixin],
    render(createElement) {
        return this.render(createElement)
    }
}

export const guest = {
    mixins: [mixin],
    render(createElement) {
        return this.render(createElement, true)
    }
}
