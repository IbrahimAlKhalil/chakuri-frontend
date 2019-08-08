<template>
    <wrapper :disabled="!initialized" :edit.sync="edit" action="personal"
             :fields="flatFields">
        <div v-if="edit && initialized" class="inputs">
            <form-item v-for="(field, index) in fields" :key="index"
                       :field="field"/>
        </div>
        <div v-else class="inputs" v-loading="!initialized">
            <preview v-for="(field, index) in fields" :field="field" :key="index"/>
        </div>
    </wrapper>
</template>

<script>
    import wrapper from '../partials/input-wrapper'
    import formItem from '../partials/form-item'
    import preview from '../partials/preview'
    import fillData from '../modules/fill-data'
    import {makeFieldsFlat} from '@/pages/resume/modules/make-fields-flat'

    export default {
        name: 'personal',
        components: {wrapper, formItem, preview},
        data() {
            return {
                edit: false,
                initialized: false,
                fields: [
                    {
                        name: 'name',
                        type: 'text',
                        label: 'নাম',
                    },
                    {
                        name: 'father',
                        type: 'text',
                        label: 'পিতার নাম',
                    },
                    {
                        name: 'mother',
                        type: 'text',
                        label: 'মাতার নাম',
                    },
                    {
                        name: 'dob',
                        type: 'date',
                        label: 'জন্ম তারিখ',
                    },
                    {
                        name: 'mobile',
                        type: 'text',
                        label: 'মোবাইল নম্বর',
                    },
                    {
                        name: 'email',
                        type: 'email',
                        label: 'ইমেইল',
                        rules: [
                            {
                                type: 'email',
                                message: 'দুঃখিত, ইমেইল ঠিকানাটি সঠিক নয়।'
                            }
                        ]
                    },
                    {
                        name: 'gender',
                        type: 'select',
                        label: 'লিঙ্গ',
                        opt: ['পুরুষ', 'মহিলা']
                    },
                    {
                        name: 'marital_status',
                        type: 'select',
                        label: 'বৈবাহিক অবস্থা',
                        opt: ['বিবাহিত', 'অবিবাহিত']
                    },
                    {
                        name: 'nationality',
                        type: 'text',
                        label: 'জাতীয়তা',
                    }
                ],
                flatFields: {}
            }
        },

        async created() {
            // Flatten the fields
            makeFieldsFlat(this.flatFields, this.fields)

            await fillData(this.flatFields, 'personal')

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
