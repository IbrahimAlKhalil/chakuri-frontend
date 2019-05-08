<template>
    <div class="flex flex-md-and-up justify-between nav-desktop">
        <nav>
            <el-menu default-active="0" mode="horizontal">
                <menu-item v-for="(item, index) in menu" :key="index" :index="index" :item="item"/>
            </el-menu>
        </nav>
        <avatar/>
    </div>
</template>

<script>
    import {elMenu} from '@/el';
    import menuItem from '@layouts/partials/menu-item';
    import avatar from '@layouts/partials/avatar';
    import {mapState} from 'vuex';

    export default {
        computed: mapState({
            menu: 'menu'
        }),
        components: {menuItem, avatar, elMenu}
    };
</script>

<style lang="scss" scoped>
    nav {
        margin-left: auto;
        margin-right: 30px;
    }
</style>
