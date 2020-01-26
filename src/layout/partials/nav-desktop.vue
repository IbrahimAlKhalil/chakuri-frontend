<template>
    <div class="flex flex-md-and-up nav-desktop">
        <avatar v-if="$auth.user"/>

        <template v-else>
            <nav>
                <menu-item v-for="(item, index) in $store.state.menu.header.items" :key="index" :index="index"
                           :item="item" class="flex align-center item"/>
            </nav>

            <div class="flex align-center wrapper">
                <div>
                    <router-link to="/sign-in" class="el-button first el-button--primary btn">
                        <i class="fas fa-sign-in-alt"></i>&nbsp; লগ-ইন
                    </router-link>
                </div>
                <div>
                    <router-link to="/sign-up" class="el-button btn">
                        <i class="fas fa-user-plus"></i>&nbsp; একাউন্ট তৈরি করুন
                    </router-link>
                </div>
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
        margin-right: 10px;
        display: flex;
        align-items: center;
    }

    .el-menu {
        border-bottom: 0;
    }

    .first {
        margin-right: 8px;
    }

    .btn {
        text-decoration: none;

        i {
            margin-right: 10px;
        }
    }

    .item {
        height: 100%;
        line-height: unset;
    }
</style>
