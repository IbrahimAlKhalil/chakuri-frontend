<template>
    <wrapper :disabled="!initialized" :edit.sync="edit" action="address"
             :fields="flatFields">

        <div v-if="edit && initialized" class="inputs">
            <div v-for="(group, index) in groups" :key="index">
                <h3>{{group.label}}</h3>

                <template v-for="(field, index) in group.fields">
                    <lazy-select v-if="field.type === 'lazy'" :field="field" :key="index"/>
                    <form-item v-else :key="index" :field="field"/>
                </template>
            </div>
        </div>

        <div v-else class="inputs" v-loading="!initialized">
            <div v-for="(group, index) in groups" :key="index">
                <h3 class="text-center">{{group.label}}</h3>
                <preview v-for="(field, index) in group.fields" :field="field" :key="index"/>
            </div>
        </div>

    </wrapper>
</template>

<script>
    import wrapper from '../partials/input-wrapper'
    import formItem from '../partials/form-item'
    import preview from '../partials/preview'
    import lazySelect from '../partials/lazy-select'
    import fillData from '../modules/fill-data'
    import {loadLazySelect} from '@/pages/resume/modules/load-lazy-select-data'
    import {makeGroupsFlat} from '@/pages/resume/modules/make-groups-flat'

    export default {
        name: 'col-address',
        components: {wrapper, formItem, preview, lazySelect},
        data() {
            return {
                edit: false,
                initialized: false,
                groups: [
                    {
                        label: 'বর্তমান ঠিকানা',
                        fields: [
                            {
                                name: 'present_district',
                                label: 'জেলা',
                                top: true,
                                type: 'lazy',
                                route: 'districts',
                                action: 'thanas/by-district',
                                loading: true,
                                child: {
                                    name: 'present_thana',
                                    label: 'থানা',
                                    loading: false,
                                    type: 'lazy'
                                }
                            },
                            {
                                name: 'present_village',
                                type: 'text',
                                label: 'এলাকা/গ্রাম/রোড নম্বর'
                            }
                        ]
                    },
                    {
                        label: 'স্থায়ী ঠিকানা',
                        fields: [
                            {
                                name: 'district',
                                label: 'জেলা ',
                                type: 'lazy',
                                top: true,
                                route: 'districts',
                                action: 'thanas/by-district',
                                loading: true,
                                child: {
                                    name: 'thana',
                                    label: 'থানা ',
                                    loading: false,
                                    type: 'lazy'
                                }
                            },
                            {
                                name: 'village',
                                type: 'text',
                                label: 'এলাকা/গ্রাম/রোড নম্বর'
                            }
                        ]
                    }
                ],
                flatFields: {}
            }
        },

        async created() {
            const {flatFields} = this

            // Flatten fields inside groups
            makeGroupsFlat(this.groups, flatFields)

            await fillData(flatFields, 'address')

            const required = [{
                required: true,
                message: 'অনুগ্রহ করে এই ঘরটি পূরণ করুন'
            }]

            // Add required rule for all the fields
            for (const key in flatFields) {
                this.$set(flatFields[key], 'rules', required)
            }


            // Load lazy-select data
            // TODO:: Optimization needed
            const {district} = flatFields
            const {present_district} = flatFields

            // Permanent address
            loadLazySelect(district, district.route)

            // Present address
            loadLazySelect(present_district, present_district.route)

            this.initialized = true
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/var";

    .inputs {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }

    @media screen and (min-width: $--md) {
        .inputs {
            grid-column-gap: 20px;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }
    }
</style>
