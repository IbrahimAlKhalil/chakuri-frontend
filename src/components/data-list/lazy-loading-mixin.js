import intersection from '@/components/intersection';
import empty from '@/components/empty';

export default {
    components: {intersection, empty},

    props: {
        tag: {
            type: String,
            default: 'div'
        },

        perPage: {
            type: Number,
            default: 26
        },

        decorator: {
            type: Function
        }
    },

    data() {
        return {
            first: true,
            loading: false,

            exposed: {
                items: [],
                total: 0
            }
        };
    },

    methods: {
        shouldLoad() {
            const {first, exposed} = this;

            const {items, total} = exposed;

            if (first) {
                return true;
            }

            if (total === 0) {
                return false;
            }

            return total !== items.length;
        },

        async load() {
            const {nextPage, first, $props, take, exposed} = this;

            if (!this.shouldLoad()) {
                return;
            }

            // Show spinner
            this.loading = true;

            // Load data
            const response = await this.$fetch(`${this.$props.endpoint}?page=${nextPage}&perPage=${$props.perPage}&take=${take}`).response();

            // Hide spinner
            this.loading = false;

            const {data, total} = response.json();

            // Update total
            if (total !== exposed.total) {
                this.$emit('totalChanged', total);
            }

            // Store loaded items
            if ($props.decorator) {
                data.forEach(item => exposed.items.push($props.decorator(item)));
            } else {
                data.forEach(item => exposed.items.push(item));
            }

            // Send data to parent component
            this.$emit('input', exposed);

            if (first) {
                this.$emit('init');
                this.first = false;
            }
        },

        reset() {

        }
    },

    computed: {
        nextPage() {
            const {first, exposed, $props} = this;
            const {items} = exposed;

            if (first) {
                return 1;
            }

            const page = Math.ceil(items.length / $props.perPage);

            if (items.length / page === $props.perPage) {
                return page + 1;
            }

            return page;
        },

        take() {
            const {items, total} = this.exposed;
            const {perPage} = this.$props;

            if (!items.length) {
                // Take all of the items at first load
                return perPage;
            }

            const remaining = total - items.length;

            if (remaining < perPage) {

                return remaining;
            }

            const page = Math.ceil(items.length / perPage);

            if (items.length / page === perPage) {
                return perPage;
            }

            return perPage * Math.ceil(items.length / perPage) - items.length;
        }
    },

    async created() {
        // Update count
        this.$fetch(`${this.$props.endpoint}/count`).response().then(response => {
            this.exposed.total = response.json().count;

        });

        this.$emit('input', this.exposed);
    }
};
