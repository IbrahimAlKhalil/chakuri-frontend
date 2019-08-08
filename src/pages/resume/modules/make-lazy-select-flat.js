import Vue from 'vue'

export function makeLazySelectFlat(field, fields) {
    Vue.set(fields, field.name, field)

    if (field.child) {
        makeLazySelectFlat(field.child, fields)
    }
}
