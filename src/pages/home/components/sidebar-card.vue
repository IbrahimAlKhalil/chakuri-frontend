<template>
    <el-card :body-style="{padding: 0}" class="sidebar-card">
        <div slot="header" class="text-center">{{title}}</div>
        <slot></slot>
    </el-card>
</template>

<script>
    import {elCard} from '@/el';

    export default {
        props: {
            title: {
                default: '',
                type: String
            }
        },
        components: {elCard}
    }
</script>

<style lang="scss">
    @import "../../../styles/var";

    .sidebar-card {
        ul {
            border: 0;
        }

        li {
            border-top: 1px solid $--border-color-lighter;
            font-size: .9rem;

            &:hover {
                color: $--color-primary;
            }

            &:first-child {
                border: 0;
            }
        }
    }
</style>
