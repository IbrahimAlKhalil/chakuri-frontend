<template>
    <div>

        <!-- Toolbar -->
        <div class="el-card is-always-shadow mb-1">
            <div class="el-card__body toolbar flex justify-between">
                <div class="flex align-center">
                    <template v-if="search">
                        <el-input v-model="keyword" placeholder="Search"></el-input>
                        <el-button icon="fa fa-search" type="primary" @click="$emit('search', keyword)"></el-button>
                    </template>

                    <slot name="inputs"></slot>
                </div>

                <div class="tools">
                    <template v-if="crud">
                        <el-tooltip v-if="actions.includes('create')" content="Create">
                            <el-button icon="fa fa-plus" @click="create" circle></el-button>
                        </el-tooltip>

                        <el-tooltip v-if="actions.includes('delete')" content="Delete">
                            <el-button icon="fa fa-trash" @click="remove(true)" circle></el-button>
                        </el-tooltip>
                    </template>

                    <slot name="tool-btns"></slot>
                </div>

                <div class="menu">
                    <el-popover popper-class="popover">
                        <el-button slot="reference" :icon="menuIcon"></el-button>

                        <div class="el-menu">
                            <template v-if="crud">
                                <div class="el-menu-item" @click="create"><i class="fa fa-plus"></i> Create</div>
                                <div class="el-menu-item" @click="remove(true)"><i class="fa fa-trash"></i> Delete
                                </div>
                            </template>

                            <slot name="tool-menu"></slot>
                        </div>
                    </el-popover>
                </div>
            </div>
        </div>


        <!-- Show items -->
        <component v-if="paginationType === 'lazy'" :is="tag">
            <slot v-bind:items="exposed.items" v-bind:methods="{check, removeItem, edit}"/>

            <intersection @reveal="load"/>

            <empty :empty="!exposed.total" :loading="loading"/>
        </component>


        <el-dialog :visible.sync="createDialog" :fullscreen="$store.state.isMobile" :title="`Create ${title}`" center
                   append-to-body>
        </el-dialog>

        <el-dialog :visible.sync="editDialog" :fullscreen="$store.state.isMobile" :title="`Edit ${title}`"
                   append-to-body>
        </el-dialog>
    </div>
</template>

<script>
    import {elPopover, elDialog, elPagination} from '@/el';
    import lazyLoading from '@/components/lazy-loading';

    import crudMixin from './crud-mixin';
    import toolbarMixin from './toolbar-mixin';
    import lazyLoadingMixin from './lazy-loading-mixin';


    export default {
        mixins: [crudMixin, toolbarMixin, lazyLoadingMixin],
        components: {
            elPopover,
            lazyLoading,
            elDialog,
            elPagination
        },

        props: {
            title: {
                type: String,
                required: true
            },

            endpoint: {
                type: String,
                required: true
            },

            paginationType: {
                type: String,
                default: 'lazy'
            }
        },

        data() {
            return {};
        },

        methods: {
            async callLifeCycle(name, param) {
                const fn = this.$props[name];

                let returnValue = true;

                // Call
                if (typeof fn === 'function') {
                    returnValue = await fn(param);
                }

                return !!returnValue;
            },

            async check(item) {
                let check = await this.callLifeCycle('beforeCheck', item);

                if (!check) {
                    return;
                }

                item.checked = !item.checked;
            },

            /*created(user) {
                const {items, total} = this.exposed;

                this.createDialog = false;

                user.checked = false;

                items.push(user);

                this.exposed.total = total.total + 1;
            }*/
        },

        async created() {
            // const response = await this.$fetch('dashboard/roles?all=true').response();
            //
            // this.roles = response.json().filter(item => item.name !== 'Admin');
        }
    };
</script>


<!-- Toolbar styles -->

<style lang="scss" scoped>
    @import "../../styles/var";

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
