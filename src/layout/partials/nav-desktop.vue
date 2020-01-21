<template>
    <div class="flex flex-md-and-up nav-desktop">
        <avatar v-if="$auth.user"/>

        <template v-else>
            <nav>
                <div class="el-menu--horizontal el-menu">
                    <menu-item v-for="(item, index) in $store.state.menu.header.items" :key="index" :index="index"
                               :item="item"/>
                </div>
            </nav>

            <div class="flex align-center wrapper">
                <router-link to="/sign-in" class="el-button el-button--primary btn">
                    <i class="fas fa-sign-in-alt"></i>&nbsp; লগ-ইন
                </router-link>
                <router-link to="/sign-up" class="el-button btn">
                    <i class="fas fa-user-plus"></i>&nbsp; একাউন্ট তৈরি করুন
                </router-link>
            </div>
        </template>
    </div>
</template>

<script>
    import {elButton, elBadge} from '@/el';
    import menuItem from './menu-item';
    import avatar from './avatar';

    export default {
        components: {menuItem, avatar, elButton, elBadge},
    };
</script>

<style lang="scss" scoped>
    nav {
        margin-right: 30px;
    }

    .el-menu {
        border-bottom: 0;
        display: flex;
    }

    .btn {
        text-decoration: none;
        margin-right: 10px;

        i {
            margin-right: 10px;
        }
    }
</style>
