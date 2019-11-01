import request from '@modules/request'
import Vue from 'vue'

export async function loadLazySelect(field, url) {
    // Request to server
    const response = await request(url).response()
    const data = response.json()

    // Set options
    Vue.set(field, 'opt', data.map(item => ({id: item.id, name: item.name})))

    // Load child's options
    if (field.child) {
        loadLazySelect(field.child, `${field.action}/${field.value}`)
    }
}
