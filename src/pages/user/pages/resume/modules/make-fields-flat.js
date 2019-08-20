import {makeLazySelectFlat} from './make-lazy-select-flat'

export function makeFieldsFlat(fields, rawFields) {
    // Iterate over all the fields
    for (const field of rawFields) {
        // Make lazy select flat
        if (field.type === 'lazy') {
            makeLazySelectFlat(field, fields)
            continue
        }

        fields[field.name] = field
    }
}
