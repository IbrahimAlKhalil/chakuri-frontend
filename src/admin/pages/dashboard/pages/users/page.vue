<template>
    <data-list endpoint="dashboard/users"
               title="ব্যবহারকারী"
               :decorator="decorate"
               :per-page="10"
               :query="query"
               :actions="query.show === 'enabled'?actions:[]">

        <template #tool-btns="{methods}">
            <el-tooltip v-if="query.show === 'disabled'" content="সক্ষম করা করে দিন">
                <el-button icon="fa fa-check" @click="methods.remove(true)" circle></el-button>
            </el-tooltip>
        </template>

        <template #after-toolbar="{methods}">
            <div class="p-1 filter-wrapper align-center">
                <div>
                    <el-button class="filter">
                        <i class="fa fa-filter"></i> ফিলটার
                    </el-button>
                </div>
                <div>
                    <el-radio-button v-model="query.show" label="enabled" size="medium" @change="methods.reset">
                        সক্ষম
                    </el-radio-button>
                    <el-radio-button v-model="query.show" label="disabled" size="medium" @change="methods.reset">
                        অক্ষম
                    </el-radio-button>
                </div>

                <div>
                    <el-select v-model="query.type" placeholder="User Type" @change="methods.reset">
                        <el-option v-for="(option, index) in userTypes" :value="option.id" :label="option.label"
                                   :key="index"/>
                    </el-select>
                </div>
            </div>
        </template>

        <template #default="{data, methods}">

            <items-count :data="data"/>

            <data-table :cols="cols" :data="data" :methods="methods" :actions="[]">
                <template #actions="{item}">
                    <div class="el-menu-item"
                         @click="methods.removeItem(item)"><i
                            class="fa fa-trash"></i>
                        {{query.show === 'disabled'?'সক্ষম করা করে দিন':'অক্ষম করা করে দিন'}}
                    </div>
                </template>

                <template #default="{item}">
                    <td v-highlight="data.highlight">{{item.name}}</td>
                    <td>
                        <img :src="photo(item)" :alt="item.name">
                    </td>
                    <td v-highlight="data.highlight">{{item.mobile}}</td>
                </template>
            </data-table>
        </template>
    </data-list>
</template>

<script>
    import {elButton, elRadioButton, elTooltip, elSelect, elOption} from '@/el';
    import dataList from '@/components/data-list/paginated';
    import dataTable from '@/components/table';
    import itemsCount from '@/components/items-count';

    import altPhoto from '@/assets/images/user.svg';
    import altInst from '@/assets/images/institute.svg';

    export default {

        components: {
            itemsCount,
            dataTable,
            dataList,
            elButton,
            elRadioButton,
            elTooltip,
            elSelect,
            elOption
        },

        data() {
            return {
                altPhoto,
                altInst,
                query: {
                    show: 'enabled',
                    type: 'all'
                },
                userTypes: [
                    {
                        id: 'all',
                        label: 'সব'
                    },
                    {
                        id: 1,
                        label: 'ব্যক্তি'
                    },
                    {
                        id: 2,
                        label: 'প্রতিষ্ঠান'
                    }
                ],
                actions: ['delete'],
                cols: ['নাম', 'ছবি / লোগো', 'মোবাইল নম্বর']
            };
        },

        methods: {
            decorate(item) {
                item.checked = false;

                return item;
            },

            photo(item) {
                if (item.photo) {
                    return this.$fileUrl(item.photo);
                }

                return item.type === 1 ? altPhoto : altInst;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import '../../../../styles/var';

    .filter-wrapper {
        display: grid;
        gap: 15px;
    }

    .filter {
        pointer-events: none;
    }

    img {
        width: 40px;
    }

    @media all and (min-width: $--md) {
        .filter-wrapper {
            grid-template-columns: repeat(3, minmax(200px, 1fr));
        }
    }
</style>
