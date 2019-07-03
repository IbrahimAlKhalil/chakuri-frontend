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
    import {elDialog, elBreadcrumb, elBreadcrumbItem, elMenu, elDivider} from '@/el'

    export default {
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
                current: this.$store.state.divisions,
                loading: false
            }
        },

        methods: {
            select(place) {
                // Current places
                const current = this.current

                // Selected items
                const selected = this.selected

                // Use hasOwnProperty to prevent unnecessary prototype lookup
                const finished = current.hasOwnProperty('finished') && current.finished


                if (finished && selected.some(item => item.type === current.type)) {
                    selected.pop()
                }

                // Add the item to selected
                selected.push({
                    type: this.current.type,
                    parent: this.current,
                    place
                })

                if (finished) {
                    const value = {}

                    // Iterate over all the selected items and get the id
                    selected.forEach(item => {
                        value[item.type] = item.place.id
                    })

                    // Hide dialog
                    this.$emit('update:show', false)
                    this.$emit('input', value)

                    return
                }

                // Fetch next places
                this.fetch(place)
            },

            fetch(place) {

                // Check if places is already loaded otherwise load from database
                if (place.hasOwnProperty('children') && place.type !== 'thana') {
                    this.current = place.children
                    return
                }

                // Load from database

                // Show spinner
                this.loading = true

                /******** Comment out these lines before going to production *********/
                const data = {
                    division: {
                        type: 'district',
                        title: 'জেলা সিলেক্ট করুন',
                        items: [
                            {
                                id: 1,
                                name: 'ঢাকা'
                            },

                            {
                                id: 2,
                                name: 'সিলেট'
                            },

                            {
                                id: 3,
                                name: 'চট্টগ্রাম'
                            },

                            {
                                id: 4,
                                name: 'বরগুনা'
                            },

                            {
                                id: 5,
                                name: 'ঝালকাঠি'
                            },

                            {
                                id: 6,
                                name: 'চাঁদপুর'
                            },

                            {
                                id: 7,
                                name: 'রংপুর'
                            },

                            {
                                id: 8,
                                name: 'কক্সবাজার'
                            },

                            {
                                id: 9,
                                name: 'ফেনী'
                            },

                            {
                                id: 10,
                                name: 'নোয়াখালী'
                            },

                            {
                                id: 11,
                                name: 'রাঙ্গামাটি'
                            },

                            {
                                id: 1,
                                name: 'ফরিদপুর'
                            }
                        ]
                    },

                    district: {
                        type: 'thana',
                        title: 'থানা সিলেক্ট করুন',
                        items: [
                            {
                                id: 1,
                                name: 'আদাবর'
                            },

                            {
                                id: 2,
                                name: 'যাত্রাবাড়ী'
                            },

                            {
                                id: 3,
                                name: 'চকবাজার'
                            },

                            {
                                id: 4,
                                name: 'কদমতলী'
                            },

                            {
                                id: 5,
                                name: 'মোহাম্মদপুর'
                            },

                            {
                                id: 6,
                                name: 'চাঁদপুর'
                            },

                            {
                                id: 7,
                                name: 'সূত্রাপুর'
                            }
                        ]
                    },

                    thana: {
                        type: 'village',
                        title: 'এলাকা সিলেক্ট করুন',
                        finished: true,
                        items: [
                            {
                                id: 1,
                                name: 'শেখদি'
                            },

                            {
                                id: 2,
                                name: 'ধলপুর'
                            },

                            {
                                id: 3,
                                name: 'কাজলা'
                            },

                            {
                                id: 4,
                                name: 'ভাঙ্গাপ্রেস'
                            },

                            {
                                id: 5,
                                name: 'ওয়ারী'
                            },

                            {
                                id: 6,
                                name: 'চাঁদপুর'
                            },

                            {
                                id: 7,
                                name: 'রংপুর'
                            },

                            {
                                id: 8,
                                name: 'কক্সবাজার'
                            },

                            {
                                id: 9,
                                name: 'ফেনী'
                            },

                            {
                                id: 10,
                                name: 'নোয়াখালী'
                            },

                            {
                                id: 11,
                                name: 'রাঙ্গামাটি'
                            },

                            {
                                id: 1,
                                name: 'ফরিদপুর'
                            }
                        ]
                    },
                }

                setTimeout(() => {
                    this.$store.commit('addChildrenToPlace', {
                        parent: place,
                        children: data[this.current.type]
                    })

                    this.current = data[this.current.type]
                    this.loading = false
                }, 1000)
            },

            back(item) {
                const selected = this.selected
                const index = selected.indexOf(item)

                selected.splice(index, selected.length - index)
                this.current = item.parent
            }
        },

        watch: {
            division(newValue) {
                if (this.selected[0] && this.selected[0].place.id !== newValue.id) {
                    this.back(this.selected[0])
                    this.select(newValue)
                }
            }
        },

        components: {elDialog, elBreadcrumb, elBreadcrumbItem, elMenu, elDivider}
    }
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
