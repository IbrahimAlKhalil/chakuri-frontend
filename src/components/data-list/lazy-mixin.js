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

        socketEvent: String,

        decorator: Function
    },

    data() {
        return {
            first: true,
            loading: false,
            resetting: false,

            exposed: {
                items: [],
                total: 0,
                keywords: []
            }
        };
    },

    methods: {
        shouldLoad() {
            const {first, exposed, loadedCount} = this;

            const {total} = exposed;

            if (first) {
                return true;
            }

            if (total === 0) {
                return false;
            }

            return total !== loadedCount;
        },

        async load(overwrite) {
            const {nextPage, first, $props, take, exposed} = this;

            if (!this.shouldLoad()) {
                return;
            }

            // Show spinner
            this.loading = true;

            // Load data
            const response = await this.$fetch(`${this.$props.endpoint}${this.builtQuery}page=${nextPage}&perPage=${$props.perPage}&take=${take}`).response();

            // Hide spinner
            this.loading = false;

            const {data, total} = response.json();

            // Update total
            if (total !== exposed.total) {
                exposed.total = total;
                this.$emit('totalChanged', total);
            }

            // Store loaded items
            let decorated;

            if ($props.decorator) {
                decorated = data.map(item => $props.decorator(item));
            } else {
                decorated = data;
            }

            if (overwrite === true) {
                exposed.items = decorated;
            } else {
                decorated.forEach(item => exposed.items.push(item));
            }


            // Send data to parent component
            this.$emit('input', exposed);

            if (first) {
                this.$emit('init');
                this.first = false;
            }
        },

        async reset() {
            this.first = true;
            this.resetting = true;
            this.exposed.keywords = this.keyword.trim().split(' ');
            this.exposed.total = 0;

            await this.load(true);

            this.resetting = false;
        }
    },

    computed: {
        nextPage() {
            const {first, $props, loadedCount} = this;

            if (first) {
                return 1;
            }

            const page = Math.ceil(loadedCount / $props.perPage);

            if (loadedCount / page === $props.perPage) {
                return page + 1;
            }

            return page;
        },

        loadedCount() {
            if (this.resetting) {
                return 0;
            }

            return this.exposed.items.length;
        },

        take() {
            const {total} = this.exposed;
            const {perPage, loadedCount} = this.$props;

            if (!loadedCount) {
                // Take all of the items at first load
                return perPage;
            }

            const remaining = total - loadedCount;

            if (remaining < perPage) {

                return remaining;
            }

            const page = Math.ceil(loadedCount / perPage);

            if (loadedCount / page === perPage) {
                return perPage;
            }

            return perPage * Math.ceil(loadedCount / perPage) - loadedCount;
        }
    },

    async created() {
        // Update count
        this.$emit('input', this.exposed);

        const {socketEvent} = this.$props;

        if (socketEvent) {
            this.$socket().on(socketEvent, item => {
                this.addItem(item);
            });
        }
    },

    beforeDestroy() {
        this.$socket().removeAllListeners(this.$props.socketEvent);
    }
};
