import {makeFieldsFlat} from '@/pages/resume/modules/make-fields-flat'

export function makeGroupsFlat(groups, fields) {
    for (const group of groups) {
        makeFieldsFlat(fields, group.fields)
    }
}
