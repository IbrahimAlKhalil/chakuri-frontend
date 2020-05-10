export default {
    methods: {
        link(item) {
            const link = {};

            if (item.type === 'page') {
                link.to = `${item.link.charAt(0) !== '/' ? '/' : ''}${item.link}`;
            } else {
                link.href = item.link;
            }

            return link;
        }
    }
};
