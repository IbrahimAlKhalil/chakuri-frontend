<template>
    <component :is="item.type === 'page'?'router-link':'a'" v-bind="href" :index="index.toString()"
               class="el-menu-item">
        {{item.title}}
    </component>
</template>

<script>
    import menuItem from '@/mixins/menu-item';

    export default {
        mixins: [menuItem],
        props: ['item', 'index'],

        computed: {
            href() {
                return this.link(this.$props.item);
            }
        }
    };
</script>


<style lang="scss" scoped>
    @import "../../styles/var";

    .el-menu-item {
        text-decoration: none;
        color: $--color-secondary;

        &:hover {
            background-color: $--dropdown-menuItem-hover-fill !important;
        }
    }

    .router-link-exact-active {
        border-left: 2px solid $--color-primary;

        @media all and (min-width: $--md) {
            border-bottom: 2px solid $--color-primary;
            border-left: 0;
        }
    }
</style>
