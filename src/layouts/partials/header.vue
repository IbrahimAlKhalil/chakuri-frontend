<template>
    <el-header class="flex justify-between">
        <nav-mobile/>
        <div class="logo">
            <router-link to="/">
                <img :src="logo" :alt="name">
            </router-link>
        </div>
        <nav-desktop/>
    </el-header>
</template>

<style lang="scss">
    .el-header {
        background: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, .1);
    }
</style>

<style lang="scss" scoped>
    @import "../../styles/var";

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

<script>
    export default {
        data() {
            return {
                logo: require('../../assets/images/logo.png'),
                name: 'Sahara Software And Technology'
            }
        },
        components: {
            navDesktop: () => import('./nav-desktop'),
            navMobile: () => import('./nav-mobile')
        }
    }
</script>
