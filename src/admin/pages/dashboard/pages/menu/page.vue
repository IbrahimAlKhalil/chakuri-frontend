<template>
    <data-list endpoint="dashboard/menus"
               title="মেনু"
               :decorator="decorate"
               :create-form="createForm"
               :edit-form="editForm"
               :per-page="10">

        <template #default="{data, methods}">

            <items-count :data="data"/>

            <data-table :cols="cols" :data="data" :methods="methods">
                <template #default="{item}">
                    <td>
                        <router-link class="link" :to="`/dashboard/menu/${item.id}`"><span
                                v-highlight="data.highlight">{{item.name}}</span></router-link>
                    </td>
                    <td v-highlight="data.highlight">{{item.location}}</td>
                    <td>
                        <el-switch v-model="item.enabled" @change="updateState(item)"></el-switch>
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

    export default {
        components: {itemsCount, dataList, dataTable, elSwitch},

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
                    name: 'menu_location_id',
                    label: 'অবস্থান',
                    type: 'select',
                    rules: [required],
                    source: 'dashboard/menu-locations',
                }
            ];

            return {
                createForm: form,

                editForm: form,

                cols: ['নাম', 'অবস্থান', 'অবস্থা']
            };
        },

        methods: {
            decorate(item) {
                item.checked = false;
                item.enabled = !!item.enabled;

                return item;
            },

            async updateState(item) {
                this.$fetch(`dashboard/menus/${item.id}`, {
                    method: 'PATCH',
                    body: {
                        enabled: Number(item.enabled)
                    }
                }).response()
                    .then(response => {
                        if (response.status === 200 || response.status === 204) {
                            return this.$updated();
                        }

                        item.enabled = false;

                        this.$someWentWrong();
                    });
            }
        }
    };
</script>
