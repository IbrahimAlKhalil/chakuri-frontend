<template>
    <div class="flex flex-md-and-up justify-between nav-desktop">
        <nav>
            <div class="el-menu--horizontal el-menu">
                <menu-item v-for="(item, index) in menu" :key="index" :index="index" :item="item"/>
            </div>
        </nav>
        <avatar/>
    </div>
</template>

<script>
    import menuItem from './menu-item'
    import avatar from './avatar'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {}
        },
        computed: mapState({
            menu: 'menu'
        }),
        components: {menuItem, avatar}
    }
</script>

<style lang="scss" scoped>
    nav {
        margin-left: auto;
        margin-right: 30px;
    }

    .el-menu {
        border-bottom: 0;
    }
</style>
