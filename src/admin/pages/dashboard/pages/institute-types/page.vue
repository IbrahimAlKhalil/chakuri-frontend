<template>
    <data-list endpoint="dashboard/institute-types"
               title="প্রতিষ্ঠানের ধরণ"
               :decorator="decorate"
               :create-form="createForm"
               :edit-form="editForm"
               :per-page="25">

        <template #default="{data, methods}">

            <items-count :data="data"/>

            <data-table :cols="cols" :data="data" :methods="methods">
                <template #default="{item}">
                    <td v-highlight="data.highlight">{{item.name}}</td>
                </template>
            </data-table>
        </template>
    </data-list>
</template>

<script>
    import dataList from '@/components/data-list/lazy';
    import dataTable from '@/components/table';
    import itemsCount from '@/components/items-count';

    export default {
        components: {itemsCount, dataList, dataTable},

        data() {
            const form = [
                {
                    name: 'name',
                    label: 'নাম',
                    type: 'text',
                    rules: [this.$store.state.requiredRule]
                }
            ];

            return {
                createForm: form,

                editForm: form,

                cols: ['নাম']
            };
        },

        methods: {
            decorate(item) {
                item.checked = false;

                return item;
            },
        }
    };
</script>
