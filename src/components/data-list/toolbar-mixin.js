import {elInput, elTooltip, elPopover, elButton} from '@/el';

export default {
    components: {elInput, elTooltip, elPopover, elButton},

    props: {
        search: {
            type: Boolean,
            default: true
        },

        menuIcon: {
            type: String,
            default: 'fas fa-ellipsis-v'
        },

        crud: {
            type: Boolean,
            default: true
        },

        actions: {
            type: Array,
            default: () => ['create', 'delete']
        }
    },

    data() {
        return {
            keyword: ''
        };
    }
};
