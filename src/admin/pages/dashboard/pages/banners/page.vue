<template>
    <data-list endpoint="dashboard/banners"
               title="ব্যানার"
               :decorator="decorate"
               :create-form="createForm"
               :edit-form="editForm"
               :per-page="10">

        <template #tool-btns="{data}">
            <el-tooltip v-if="reordered" content="বর্তমান অর্ডার সংরক্ষণ করুন">
                <el-button icon="fa fa-save" @click="updateOrder(data.items)" circle></el-button>
            </el-tooltip>
        </template>

        <template #tool-menu="{data}">
            <div v-if="reordered" class="el-menu-item" @click="updateOrder(data.items)"><i
                    class="fa fa-save"></i> বর্তমান অর্ডার সংরক্ষণ করুন
            </div>
        </template>

        <template #default="{data, methods}">

            <items-count :data="data"/>

            <data-table :cols="cols" :data="data" :methods="methods" @dragged="reordered=true" draggable>
                <template #default="{item}">
                    <td v-highlight="data.highlight">{{item.name}}</td>
                    <td><img :src="image(item, 'picture')" :alt="item.name"></td>
                    <td v-highlight="data.highlight">{{typeof item.place === 'object'?item.place.name:item.placeName}}
                    </td>
                    <td>
                        <el-switch v-model="item.active" @change="updateState(item)"></el-switch>
                    </td>
                </template>
            </data-table>
        </template>
    </data-list>
</template>

<script>
    import dataList from '@/components/data-list/lazy';
    import dataTable from '@/components/table';
    import itemsCount from '@/components/items-count';
    import {elSwitch} from '@/admin/el';
    import {elTooltip, elButton} from '@/el';

    export default {
        components: {itemsCount, dataList, dataTable, elSwitch, elTooltip, elButton},

        data() {
            const required = this.$store.state.requiredRule;

            const form = [
                {
                    name: 'name',
                    label: 'নাম',
                    type: 'text',
                    rules: [required]
                },
                {
                    name: 'picture',
                    label: 'ছবি',
                    type: 'image',
                    rules: [required]
                },
                {
                    name: 'link',
                    label: 'লিংক',
                    type: 'text',
                },
                {
                    name: 'place',
                    label: 'অবস্থান',
                    type: 'select',
                    rules: [required],
                    source: 'dashboard/banner-places',
                }
            ];

            return {
                createForm: form,

                editForm: form,

                cols: ['নাম', 'ছবি', 'অবস্থান', 'অবস্থা'],
                reordered: false,
            };
        },

        methods: {
            decorate(item) {
                item.checked = false;
                item.active = !!item.active;

                return item;
            },

            image(item, prop) {
                const base64Prop = `${prop}-base64`;

                if (item.hasOwnProperty(base64Prop)) {
                    return item[base64Prop];
                }

                return this.$fileUrl(item[prop]);
            },

            async updateState(item) {
                this.$fetch(`dashboard/banners/${item.id}`, {
                    method: 'PATCH',
                    body: {
                        active: Number(item.active)
                    }
                }).response()
                    .then(response => {
                        if (response.status === 200 || response.status === 204) {
                            return this.$updated();
                        }

                        item.enabled = false;

                        this.$someWentWrong();
                    });
            },

            async updateOrder(items) {
                const orders = items.map((item, order) => {
                    return {
                        id: item.id,
                        order: order + 1
                    };
                });

                this.$fetch('dashboard/banners/reorder', {
                    method: 'POST',
                    body: {
                        orders
                    }
                }).response();

                this.$updated();

                this.reordered = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    img {
        width: 100px;
    }
</style>
