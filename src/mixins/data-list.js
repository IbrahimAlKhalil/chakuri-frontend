export default {
    data() {
        return {
            total: 0,
            loaded: false
        };
    },

    async created() {
        const response = await this.$fetch(this.endpoint).response();

        this.total = response.json().count;

        this.loaded = true;
    }
};
