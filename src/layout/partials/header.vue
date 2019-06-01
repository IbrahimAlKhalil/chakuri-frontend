<template>
    <el-header class="flex justify-between header">
        <nav-mobile/>
        <div class="logo">
            <router-link to="/">
                <img :src="logo" :alt="name">
            </router-link>
        </div>
        <nav-desktop/>
    </el-header>
</template>

<script>
    import {elHeader} from '@/el';

    export default {
        data() {
            return {
                logo: require('@assets/images/logo.png'),
                name: 'Sahara Software And Technology'
            }
        },
        components: {
            navDesktop: () => import('./nav-desktop'),
            navMobile: () => import('./nav-mobile'),
            elHeader
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/var";
    .header {
        background: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, .1);
        position: sticky;
        top: 0;
        z-index: 3;
        padding: 0 10px;
    }

    .logo {
        padding: 10px;

        @media screen and (min-width: $__md) {
            margin-right: auto;
        }

        img {
            height: 100%;
        }
    }
</style>
