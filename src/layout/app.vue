<template>
    <main v-loading.lock.fullscreen="signedIn === null || $store.state.loading" id="app"
          class="flex direction-column w-100">
        <template v-if="signedIn !== null">
            <small-header/>
            <partial-header/>
            <transition name="fade">
                <router-view/>
            </transition>
            <partial-footer/>
        </template>
    </main>
</template>

<script>
    import partialHeader from './partials/header';
    import partialFooter from './partials/footer';
    import smallHeader from './partials/small-header';

    export default {
        data() {
            return {
                signedIn: null
            };
        },

        created() {
            this.$store.dispatch('initialize').then(user => {
                this.signedIn = !!user;
            });
        },

        components: {partialHeader, partialFooter, smallHeader}
    };
</script>
