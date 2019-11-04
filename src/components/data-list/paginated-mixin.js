import {elPagination} from '@/el';
import empty from '@/components/empty';

export default {
    components: {elPagination, empty},

    props: {
        tag: {
            type: String,
            default: 'div'
        },

        perPage: {
            type: Number,
            default: 26
        },

        decorator: Function
    },

    data() {
        return {
            loading: false,
            resetting: false,

            exposed: {
                items: [],
                total: 0,
                keywords: []
            },

            lastPage: 0
        };
    },

    methods: {
        shouldLoad() {
            if (this.resetting) {
                return true;
            }

            return this.lastPage !== this.page;
        },


        async load() {
            const {page, $props, exposed} = this;

            if (!this.shouldLoad()) {
                return;
            }

            this.lastPage = page;

            // Show spinner
            this.loading = true;

            // Load data
            const response = await this.$fetch(`${this.$props.endpoint}${this.builtQuery}page=${page}&perPage=${$props.perPage}`).response(100);

            // Hide spinner
            this.loading = false;

            const {data, total} = response.json();

            // Update total
            if (total !== exposed.total) {
                this.$emit('totalChanged', total);
            }

            // Store loaded items
            if ($props.decorator) {
                exposed.items = data.map(item => $props.decorator(item));
            } else {
                exposed.items = data;
            }

            // Send data to parent component
            this.$emit('input', exposed);
        },


        async goTo(page) {
            try {
                await this.$router.replace({query: {page}});
            } catch (e) {
            }

            await this.load();
        },

        async reset() {
            this.resetting = true;
            this.exposed.keywords = this.keyword.trim().split(' ');

            await this.goTo(1);

            this.resetting = false;
        }
    },

    watch: {
        '$route.query': function (query) {
            this.goTo(query.page);
        }
    },

    computed: {
        page() {
            return parseInt(this.$route.query.page) || 1;
        }
    },

    async created() {
        // Update count
        this.$fetch(`${this.$props.endpoint}/count`).response().then(response => {
            this.exposed.total = parseInt(response.json().count);
        });

        await this.load();

        this.$emit('input', this.exposed);
    }
};
