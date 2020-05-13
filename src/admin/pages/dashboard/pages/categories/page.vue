<template>
    <data-list endpoint="dashboard/categories"
               title="শ্রেণী"
               :decorator="decorate"
               :create-form="createForm"
               :edit-form="editForm"
               :per-page="25">

        <template #default="{data, methods}">

            <items-count :data="data"/>

            <data-table :cols="cols" :data="data" :methods="methods">
                <template #default="{item}">
                    <td v-highlight="data.highlight">{{item.name}}</td>
                    <td><i :class="item.icon"></i></td>
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
                },
                {
                    name: 'icon',
                    label: 'আইকন',
                    type: 'text',
                    placeholder: 'https://fontawesome.com/icons এ ভিজিট করুন'
                }
            ];

            return {
                createForm: form,

                editForm: form,

                cols: ['নাম', 'আইকন']
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
