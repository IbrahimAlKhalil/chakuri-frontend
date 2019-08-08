import loading from '../partials/loading'

export default function (fn) {
    return function () {
        return {
            component: fn(),
            loading
        }
    }
}
