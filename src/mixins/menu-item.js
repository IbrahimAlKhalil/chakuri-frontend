export default {
    methods: {
        link(item) {
            const link = {};

            if (item.type === 'page') {
                link.to = item.link;
            } else {
                link.href = item.link;
            }

            return link;
        }
    }
};
