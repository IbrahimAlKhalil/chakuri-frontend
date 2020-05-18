<template>
    <a v-if="$store.state.isAndroid" :href="href" @click="openLink">
        <slot></slot>
    </a>
    <a v-else-if="!routerLink" :href="href">
        <slot></slot>
    </a>
    <router-link v-else :to="href">
        <slot></slot>
    </router-link>
</template>

<script>
    export default {
        props: {
            href: String,
            'router-link': Boolean
        },
        methods: {
            openLink() {
                window.cordova.InAppBrowser.open(this.$props.href, '_system');
            }
        }
    }
</script>