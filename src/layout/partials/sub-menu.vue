<template>
    <el-submenu :index="index.toString()">
        <template slot="title">
            {{item.title}}
        </template>
        <menu-item v-for="(subItem, key) in item.children" :key="key" :item="subItem" :index="`${index}-${key}`"/>
    </el-submenu>
</template>

<script>
    import menuItem from './menu-item';
    import {elSubmenu} from '@/el';

    export default {
        props: {
            item: {
                type: Object,
                required: true
            },
            index: {
                type: [Number, String],
                required: true
            }
        },
        components: {menuItem, elSubmenu}
    }
</script>

<style lang="scss">
    @import "../../styles/var";

    .el-submenu__title {
        padding: 0 20px !important;
    }

    .el-menu-item, .el-submenu__title {
        color: $--color-text-regular !important;

        a {
            text-decoration: none;
            color: inherit;
        }

        &:not(.is-disabled):hover, &:not(.is-disabled):focus {
            background-color: $--dropdown-menuItem-hover-fill !important;
            color: $--dropdown-menuItem-hover-color !important;

            .icon {
                filter: grayscale(0);
            }
        }
    }
</style>

<style lang="scss" scoped>
    @import "../../styles/var";

    .el-menu {
        border-radius: 5px;
    }

    .el-menu--popup {
        padding: 10px 0;

        & .el-menu-item, & .el-submenu__title {
            height: auto !important;
            padding: 3px 0 3px 15px !important;
        }
    }

    .el-popover {
        padding: 0;

        ul {
            margin: 0;
            padding: 8px 0;
        }
    }

    .icon {
        height: 20px;
        margin-right: 10px;
        filter: grayscale(1);
    }
</style>
