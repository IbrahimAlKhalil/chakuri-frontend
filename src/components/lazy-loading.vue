<template>
    <component :is="tag">
        <slot v-bind:items="items"/>

        <intersection @reveal="load"/>

        <empty :empty="!total" :loading="loading"/>
    </component>
</template>

<script>
    import intersection from '@/components/intersection';
    import empty from '@/components/empty';

    export default {
        components: {intersection, empty},

        props: {
            endpoint: {
                type: String,
                required: true
            },
            tag: {
                type: String,
                default: 'div'
            },

            perPage: {
                type: Number,
                default: 26
            },

            total: {
                required: true,
                type: Number
            },

            decorator: {
                type: Function
            }
        },

        data() {
            return {
                first: true,
                loading: false,
                items: []
            };
        },

        methods: {
            shouldLoad() {
                const {first, $props, items} = this;

                if (first) {
                    return true;
                }

                if ($props.total === 0) {
                    return false;
                }

                return $props.total !== items.length;
            },

            async load() {
                const {nextPage, first, $props, take} = this;

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
                if (total !== this.$props.total) {
                    this.$emit('totalChanged', total);
                }

                // Store loaded items
                if ($props.decorator) {
                    data.forEach(item => this.items.push($props.decorator(item)));
                } else {
                    data.forEach(item => this.items.push(item));
                }

                // Send data to parent component
                this.$emit('input', this.items);

                if (first) {
                    this.$emit('init');
                    this.first = false;
                }
            }
        },

        computed: {
            nextPage() {
                const {first, items, $props} = this;

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
                const {items} = this;
                const {total, perPage} = this.$props;

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

        created() {
            this.$emit('input', this.items);
        }
    };
</script>
