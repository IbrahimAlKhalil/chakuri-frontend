<template>
    <div class="el-card is-always-shadow mb-1">
        <div class="el-card__body toolbar flex justify-between">
            <div class="flex align-center">
                <el-input v-model="keyword" placeholder="Search"></el-input>
                <el-button icon="fa fa-search" type="primary" @click="$emit('search', keyword)"></el-button>

                <slot name="inputs"></slot>
            </div>

            <div class="tools">
                <el-tooltip content="Create">
                    <el-button icon="fa fa-plus" @click="$emit('create')" circle></el-button>
                </el-tooltip>

                <el-tooltip content="Delete">
                    <el-button icon="fa fa-trash" @click="$emit('delete')" circle></el-button>
                </el-tooltip>

                <slot name="tools"></slot>
            </div>

            <div class="menu">
                <el-popover popper-class="popover">
                    <el-button slot="reference" icon="fas fa-ellipsis-v"></el-button>

                    <div class="el-menu">
                        <div class="el-menu-item" @click="$emit('create')"><i class="fa fa-plus"></i> Create</div>
                        <div class="el-menu-item" @click="$emit('delete')"><i class="fa fa-trash"></i> Delete
                        </div>

                        <slot name="menu"></slot>
                    </div>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script>
    import {elButton, elInput, elTooltip, elPopover} from '@/el';

    export default {
        components: {elButton, elInput, elTooltip, elPopover},

        props: {
            actions: {
                type: Array,
                required: true,
            }
        },

        data() {
            return {
                keyword: ''
            };
        }
    };
</script>

<style lang="scss" scoped>
    @import "../styles/var";

    .toolbar {
        padding: 10px;
    }

    .tools {
        display: none;
    }

    @media all and (min-width: $--md) {
        .toolbar {
            padding: 15px;
        }

        .tools {
            display: block;
        }

        .menu {
            display: none;
        }
    }
</style>
