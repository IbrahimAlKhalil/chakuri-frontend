import Vue from 'vue'
import request from '@modules/request'

export default async function (fields, endpoint) {
    // Fetch data
    const response = await request(`resume/${endpoint}`).response()

    const data = response.json()

    for (const key in fields) {
        const field = fields[key]

        // Set preview data
        Vue.set(field, 'value', data[key])

        // Set model
        Vue.set(field, 'model', field.value)
    }
}
