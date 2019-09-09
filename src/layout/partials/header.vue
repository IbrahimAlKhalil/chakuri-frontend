<template>
    <el-header class="flex justify-between header">
        <nav-mobile/>
        <div class="logo">
            <router-link to="/">
                <img :src="logo" :alt="name">
            </router-link>
        </div>
        <auth>
            <div class="auth-menu flex align-center">
                <el-badge :value="2" :max="100" type="primary">
                    <el-button icon="el-icon-message-solid" size="medium"></el-button>
                </el-badge>
            </div>
        </auth>
        <nav-desktop/>
    </el-header>
</template>

<script>
    import {elHeader, elBadge, elButton} from '../../el'

    export default {
        data() {
            return {
                logo: require('../../assets/images/logo.png'),
                name: 'Sahara Software And Technology'
            }
        },
        components: {
            navDesktop: () => import('./nav-desktop'),
            navMobile: () => import('./nav-mobile'),
            elHeader,
            elBadge,
            elButton
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
        z-index: 1004;
        padding: 0 10px;
    }

    .logo {
        padding: 10px;

        img {
            height: 100%;
        }
    }

    .auth-menu {
        margin-right: 20px;
        margin-left: auto;
    }
</style>
