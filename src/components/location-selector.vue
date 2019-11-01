<template>
    <el-dialog :title="current.title" :visible="show" @close="$emit('update:show', false)"
               class="location-dialog"
               top="10px"
               center append-to-body>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item, index) in selected" :key="index" @click="back(item)">
                <span>
                    <span class="breadcrumb-item" @click="back(item)">{{item.place.name}}</span>
                </span>
            </el-breadcrumb-item>
        </el-breadcrumb>

        <el-divider></el-divider>

        <el-menu v-loading="loading">
            <li v-for="(place, index) in current.items" class="el-menu-item nav-arrow-right"
                :index="index.toString()"
                @click="select(place)">{{place.name}}
            </li>
        </el-menu>
    </el-dialog>
</template>

<script>
    import {elDialog, elBreadcrumb, elBreadcrumbItem, elMenu, elDivider} from '@/el';

    export default {
        components: {elDialog, elBreadcrumb, elBreadcrumbItem, elMenu, elDivider},

        props: {
            show: {
                type: Boolean,
                required: true
            },

            division: {
                type: Object,
                default: null
            }
        },

        data() {
            return {
                selected: [],
                current: this.$store.state.additional.divisions,
                loading: false,
                value: null
            };
        },

        methods: {
            select(place) {
                // Current places
                const current = this.current;

                // Selected items
                const selected = this.selected;

                // Use hasOwnProperty to prevent unnecessary prototype lookup
                const finished = current.hasOwnProperty('finished') && current.finished;


                if (finished && selected.some(item => item.type === current.type)) {
                    selected.pop();
                }

                // Add the item to selected
                selected.push({
                    type: this.current.type,
                    parent: this.current,
                    place
                });

                const value = this.value = {};

                // Iterate over all the selected items and get the id
                selected.forEach(item => {
                    value[item.type] = item.place.id;
                });

                if (finished) {

                    // Hide dialog
                    this.$emit('update:show', false);
                    this.$emit('input', value);

                    return;
                }

                // Fetch next places
                this.fetch(place);
            },

            async fetch(place) {

                // Check if places is already loaded otherwise load from database
                if (place.hasOwnProperty('children') && place.type !== 'thana') {
                    this.current = place.children;
                    return;
                }

                // Load from database

                // Show spinner
                this.loading = true;

                let data;

                if (this.current.type === 'division') {
                    data = {
                        type: 'district',
                        title: 'জেলা সিলেক্ট করুন',
                        items: []
                    };
                } else {
                    data = {
                        type: 'thana',
                        title: 'থানা সিলেক্ট করুন',
                        finished: true,
                        items: []
                    };
                }

                // TODO: Remove delay
                const response = await this.$fetch(
                    `${data.type}s/by-${this.current.type}/${this.value[this.current.type]}`
                ).response();

                data.items = response.json();

                this.$store.commit('additional/addChildrenToPlace', {
                    parent: place,
                    children: data
                });

                this.current = data;
                this.loading = false;
            },

            back(item) {
                const selected = this.selected;
                const index = selected.indexOf(item);

                selected.splice(index, selected.length - index);
                this.current = item.parent;
            }
        },

        watch: {
            division(newValue) {
                if (!this.selected[0]) {
                    this.select(newValue);
                }

                if (this.selected[0] && this.selected[0].place.id !== newValue.id) {
                    this.back(this.selected[0]);
                    this.select(newValue);
                }
            }
        }
    };
</script>

<style lang="scss">
    @import "../styles/var";

    .location-dialog {
        .el-dialog {
            width: calc(100% - 20px);

            @media all and (min-width: $--md) {
                width: 50%;
            }
        }

        .breadcrumb-item {
            font-weight: bold;
            cursor: pointer;
            color: $--color-primary;

            &:hover {
                text-shadow: 0 0;
            }
        }

        .el-menu {
            border-right: 0;
        }
    }
</style>
