<template>
    <wrapper :disabled="!initialized" :edit.sync="edit" action="address"
             :fields="flatFields">

        <div v-if="edit && initialized" class="inputs">
            <div v-for="(group, index) in groups" :key="index">
                <h3>{{group.label}}</h3>

                <el-checkbox v-if="index === 1" v-model="sameAddr" label="স্থায়ী ঠিকানা আর বর্তমান ঠিকানা একই"
                             @change="mergeAddr"/>
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
    import {loadLazySelect} from '../modules/load-lazy-select-data'
    import {makeGroupsFlat} from '../modules/make-groups-flat'
    import {elCheckbox} from '@/el';

    export default {
        name: 'col-address',
        components: {wrapper, formItem, preview, lazySelect, elCheckbox},
        data() {
            return {
                edit: false,
                initialized: false,
                groups: [
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
                    },
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
                ],
                flatFields: {},
                sameAddr: false,
            }
        },

        methods: {
            mergeAddr() {
                const prefix = 'present_';
                const names = ['district', 'thana', 'village'];
                const value = this.sameAddr;

                const fields = this.flatFields;

                if (value) {
                    if (names.some(name => fields[name].model === null || fields[name].model === '')) {
                        this.sameAddr = false;

                        return this.$notify({
                            message: 'অনুগ্রহ করে আগে স্থায়ী ঠিকানা পূরণ করুন',
                            type: 'warning'
                        });
                    }

                    names.forEach(name => {
                        const present = fields[`${prefix}${name}`];

                        present.model = fields[name].model;

                        this.$set(present, 'disabled', true);
                    });

                    const {present_district} = fields;

                    loadLazySelect(fields.present_thana, `${present_district.action}/${present_district.model}`);
                } else {
                    names.forEach(name => {
                        this.$set(fields[`${prefix}${name}`], 'disabled', false);
                        this.sameAddrValue = false;
                    });
                }
            },
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

            const prefix = 'present_';
            const names = ['district', 'thana', 'village'];

            const areAllSame = !names.some(name => {
                return flatFields[name].model !== flatFields[`${prefix}${name}`].model;
            });

            const areAllNull = !names.some(name => {
                return flatFields[name].model || flatFields[`${prefix}${name}`].model;
            });

            const sameAddr = !areAllNull && areAllSame

            this.sameAddr = sameAddr;

            if (sameAddr) {
                names.forEach(name => {
                    this.$set(flatFields[`${prefix}${name}`], 'disabled', true);
                });
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
