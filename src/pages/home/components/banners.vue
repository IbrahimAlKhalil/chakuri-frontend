<template>
    <div :class="className" v-if="banners.hasOwnProperty(place)">
        <div v-for="banner in banners[place]" class="banner">
            <ext-link v-if="!!banner.link" :href="banner.link" target="_blank">
                <img :src="banner.image | fileUrl" :alt="banner.name">
            </ext-link>
            <img v-else :src="banner.image | fileUrl" :alt="banner.name">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            banners: Object,
            place: String,
            'margin-top': Boolean
        },

        computed: {
            className() {
                return {
                    wrapper: true,
                    'margin-top': !!this.$props.marginTop
                };
            }
        }
    };
</script>

<style lang="scss" scoped>
    .banner {
        margin-bottom: 5px;
    }

    img {
        width: 100%;
        border-radius: 3px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .margin-top {
        margin-top: 10px;
    }
</style>