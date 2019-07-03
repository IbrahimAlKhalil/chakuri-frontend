<template>
    <section class="wrapper">
        <aside class="sidebar">
            <div class="el-card">
                <div class="el-card__body">
                    <div class="el-menu">
                        <router-link v-for="(item, index) in $store.state.dashboardMenu" :to="item.link"
                                     class="el-menu-item" :key="index">
                            <i :class="item.icon"></i> &nbsp;{{item.title}}
                        </router-link>
                    </div>
                </div>
            </div>
        </aside>
    </section>
</template>

<script>
    import {} from '@/el'

    export default {
        components: {}
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    .wrapper {
        padding: 25px 25px 15px 25px;
    }

    .sidebar {
        width: 350px;
    }

    .el-card__body {
        padding: 0;
    }

    .el-menu-item {
        border-bottom: 1px solid #EBEEF5;
        text-decoration: none;
        display: block;

        &:hover {
            color: $--link-color;
        }

        i {
            color: inherit;
        }
    }

    .router-link-exact-active {
        background: transparentize($--link-color, .9);
        color: $--link-color;
    }
</style>
