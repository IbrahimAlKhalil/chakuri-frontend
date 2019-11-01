// These data/functionality shouldn't be in the global state
// I did it when I started the project with little experience with vue
// I separated these data/functionality from main store as soon as I realized that this approach was not appropriate
// so whoever works on this project can/should move these data/functionality to component level local-state

import request from '@/modules/request';
import Vue from 'vue';

let confirmPassResolver;

export default {
    namespaced: true,

    state: {
        divisions: {
            type: 'division',
            title: 'বিভাগ সিলেক্ট করুন',
            items: []
        },
        confirmPass: {
            label: '',
            model: {
                pass: ''
            },
            rules: {
                pass: [{required: true, message: ' '}]
            },
            show: false
        }
    },

    mutations: {
        addChildrenToPlace(state, payload) {
            Vue.set(payload.parent, 'children', payload.children);
        },

        resolveConfirmPass({confirmPass}, canceled) {

            // Hide the form
            confirmPass.show = false;

            // Capture the value
            const value = canceled ? false : confirmPass.model.pass;

            // Clear value
            confirmPass.model.pass = '';

            // Resolve
            confirmPassResolver(value);
        },
    },

    actions: {
        async confirmPassword({state}, label = 'এখানে আপনার পাসওয়ার্ড লিখুন') {
            return new Promise(resolve => {
                const {confirmPass} = state;

                // Set custom label
                confirmPass.label = label;

                // Store the resolve function
                confirmPassResolver = resolve;

                // Show the form
                confirmPass.show = true;
            });
        },

        async loadDivisions({state}) {
            const response = await request('divisions').response();

            state.divisions.items = response.json();
        },

        async initialize({dispatch}) {
            dispatch('loadDivisions');
        }
    }
};


