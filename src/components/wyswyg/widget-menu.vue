<template>
    <div class="flex justify-center">
        <el-popover :placement="position" trigger="click" popper-class="popover" v-model="popover">
            <el-button slot="reference" icon="fas fa-plus">
                <slot/>
            </el-button>

            <div class="menu">
                <div v-for="(widget, index) in widgets" class="el-dropdown-menu__item" :key="index"
                     @click="add(widget.name)">
                    <i :class="widget.icon"></i> {{widget.title}}
                </div>
            </div>
        </el-popover>
    </div>
</template>

<script>
    import {elButton, elPopover} from '@/el'

    export default {
        components: {elButton, elPopover},
        props: {
            widgets: {
                required: true,
                type: Array
            },
            position: {
                default: 'top',
                type: String
            }
        },
        data() {
            return {popover: false}
        },
        methods: {
            add(name) {
                // Hide popover
                this.popover = false

                // Emit event
                this.$emit('add', name)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menu {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .el-dropdown-menu__item {
        display: block;
        text-decoration: none;
    }
</style>
