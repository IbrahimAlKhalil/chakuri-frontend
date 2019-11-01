<template>
    <div class="el-card">
        <el-form class="el-card__body" :model="flatFields" @submit.native.prevent="submit">
            <section v-for="(section, key) in fields" :key="key">
                <h3>{{section.label}}</h3>
                <template v-for="(field, index) in section.fields">
                    <div v-if="field.type === 'group'" :key="index">
                        <div class="el-form-item__content">{{field.label}}</div>

                        <div class="group">
                            <el-form-item :prop="`${field.fields[0].name}.model`"
                                          :rules="field.fields[0].rules">
                                <el-input :type="field.fields[0].type" v-model="field.fields[0].model">
                                    <template slot="append">{{field.fields[0].label}}</template>
                                </el-input>
                            </el-form-item>

                            <el-form-item :prop="`${field.fields[1].name}.model`"
                                          :rules="field.fields[1].rules">
                                <el-input :type="field.fields[1].type" v-model="field.fields[1].model">
                                    <template slot="append">{{field.fields[1].label}}</template>
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <lazy-select v-else-if="field.type === 'lazy'" :field="field" :key="index"/>
                    <div v-else-if="field.type === 'check'" class="mb-1">
                        <el-checkbox v-model="field.model">{{field.label}}</el-checkbox>
                        <br/><br/>
                    </div>
                    <el-form-item v-else :key="index" :prop="`${field.name}.model`"
                                  :rules="field.rules">
                        <label class="d-block" :for="index">{{field.label}}</label>

                        <el-select v-if="field.type === 'select'" v-model="field.model"
                                   class="d-block-important" placeholder="">
                            <div slot="empty"></div>
                            <el-option v-for="(opt, index) in field.opt" :value="opt.value" :label="opt.label"
                                       :key="index"/>
                        </el-select>

                        <el-input v-else :type="field.type" v-model="field.model"
                                  :placeholder="field.placeholder" :maxlength="field.max" rows="5" show-word-limit>
                            <template v-if="field.append" slot="append">{{field.append}}</template>
                        </el-input>
                    </el-form-item>
                </template>
            </section>


            <!--<section>-->
            <!--<h3>অতিরিক্ত তথ্য (ঐচ্ছিক)</h3>-->
            <!--<wyswyg v-model="wyswyg" :value="wyswyg"/>-->
            <!--</section>-->

            <div class="text-center mt-1">
                <el-button class="login-btn"
                           :icon="!formLoading? 'el-icon-s-promotion' : 'el-icon-loading'"
                           type="primary"
                           nativeType="submit" :disabled="formLoading">&nbsp;&nbsp;সাবমিট
                </el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {elButton, elForm, elFormItem, elInput, elOption, elSelect, elCheckbox} from '@/el';
    import lazySelect from '../resume/partials/lazy-select';
    // import wyswyg from '@components/wyswyg/wyswyg'
    import elCollapse from '@components/collapse';
    import elCollapseItem from '@components/collapse-item';

    export default {
        components: {
            elForm,
            elFormItem,
            elInput,
            elSelect,
            elOption,
            lazySelect,
            // wyswyg,
            elButton,
            elCollapse,
            elCollapseItem,
            elCheckbox
        },

        data() {
            const required = {
                required: true,
                message: 'অনুগ্রহ করে এই ঘরটি পূরণ করুন'
            };

            const {minDate} = this;

            return {
                formLoading: false,
                fields: [
                    {
                        label: 'কাজ',
                        fields: [
                            {
                                name: 'position_id',
                                label: 'পদ',
                                type: 'select',
                                opt: [],
                                rules: [required]
                            },
                            {
                                name: 'vacancy',
                                label: 'কর্মখালি',
                                type: 'number'
                            },
                            {
                                name: 'nature',
                                label: 'চাকরীর ধরন',
                                model: 1,
                                value: 1,
                                type: 'select',
                                opt:
                                    [
                                        {
                                            value: 1,
                                            label: 'ফুল টাইম'
                                        },
                                        {
                                            value: 2,
                                            label: 'পার্ট টাইম'
                                        }
                                    ],
                                rules: [required]
                            },
                            {
                                name: 'salary',
                                label: 'বেতন',
                                type: 'group',
                                fields: [
                                    {
                                        name: 'salary_from',
                                        label: 'থেকে',
                                        type: 'number'
                                    },
                                    {
                                        name: 'salary_to',
                                        label: 'টাকা (মাসিক)',
                                        type: 'number'
                                    }
                                ]
                            },
                            {
                                name: 'negotiable',
                                label: 'বেতন আলোচনা সাপেক্ষে',
                                type: 'check',
                                model: false
                            },
                            {
                                name: 'responsibilities',
                                label: 'দায়িত্ব',
                                type: 'textarea',
                                rules: [required],
                                max: 5000
                            },
                            {
                                name: 'deadline',
                                label: 'আবেদনের শেষ তারিখ',
                                type: 'date',
                                rules: [required, {validator: minDate}]
                            }
                        ]
                    },
                    {
                        label: 'ঠিকানা',
                        fields: [
                            {
                                name: 'district_id',
                                label: 'জেলা',
                                top: true,
                                type: 'lazy',
                                route: 'districts',
                                action: 'thanas/by-district',
                                loading: true,
                                rules: [required],
                                child: {
                                    name: 'thana_id',
                                    label: 'থানা',
                                    loading: false,
                                    rules: [required],
                                    type: 'lazy'
                                }
                            },
                            {
                                name: 'village',
                                type: 'text',
                                label: 'এলাকা/গ্রাম/রোড নম্বর',
                                model: '',
                                max: 120,
                                rules: [required]
                            }
                        ]
                    },
                    {
                        label: 'আবেদনকারী সম্পর্কে তথ্য',
                        fields: [
                            {
                                name: 'age',
                                label: 'বয়স',
                                type: 'group',
                                fields: [
                                    {
                                        name: 'age_from',
                                        label: 'থেকে',
                                        type: 'number'
                                    },
                                    {
                                        name: 'age_to',
                                        label: 'বছর',
                                        type: 'number'
                                    }
                                ]
                            },
                            {
                                name: 'experience',
                                label: 'অভিজ্ঞতা',
                                type: 'group',
                                fields: [
                                    {
                                        name: 'experience_from',
                                        label: 'থেকে',
                                        type: 'number'
                                    },
                                    {
                                        name: 'experience_to',
                                        label: 'বছর',
                                        type: 'number'
                                    }
                                ]
                            },
                            {
                                name: 'education',
                                label: 'শিক্ষাগত যোগ্যতা',
                                type: 'textarea',
                                max: 200
                            },
                            {
                                name: 'gender',
                                label: 'লিঙ্গ',
                                model: 1,
                                value: 1,
                                type: 'select',
                                opt: [
                                    {
                                        value: 1,
                                        label: 'পুরুষ অথবা মহিলা'
                                    },
                                    {
                                        value: 2,
                                        label: 'পুরুষ'
                                    },
                                    {
                                        value: 3,
                                        label: 'মহিলা'
                                    }
                                ],
                                rules: [required]
                            },
                            {
                                name: 'additional',
                                label: 'আবেদনকারীর জন্য আবশ্যকীয়',
                                type: 'textarea',
                                max: 5000
                            },
                        ]
                    },
                ],
                // wyswyg: []
            };
        },

        methods: {

            async minDate(rule, value, callback) {
                const d = new Date(value).getTime();
                const response = await this.$fetch('time').response();
                const min = Number(response.text) + 4.32e+7;

                if (d < min) {
                    const minDate = new Date(min);

                    callback(`দুঃখিত, আবেদনের শেষ তারিখ ${minDate.toDateString()} এর চেয়ে কম হতে পারবে না`);
                }

                callback();
            },

            async submit(evt) {
                try {
                    await evt.target.__vue__.validate();
                } catch (e) {
                }

                const body = new FormData;

                const {flatFields} = this;

                for (const key in flatFields) {
                    body.append(key, flatFields[key].model);
                }

                // this.wyswyg.forEach((widget, index) => {
                //     body.append(`widgets[${index}][title]`, widget.title)
                //     body.append(`widgets[${index}][contents]`, widget.contents)
                // })

                const response = await this.$fetch('jobs', {
                    method: 'POST',
                    body,
                }).response();

                if (response.status === 200) {
                    return this.$notify({
                        message: response.text,
                        type: 'success'
                    });
                }

                this.$notify({
                    message: 'দুঃখিত কিছু ভুল হয়েছে দয়া করে আবার চেষ্টা করুন',
                    type: 'error'
                });
            }
        },

        computed: {
            flatFields() {
                const models = {};

                for (const section of this.fields) {
                    for (const field of section.fields) {
                        if (field.type === 'group') {
                            field.fields.forEach(item => {
                                models[item.name] = item;
                            });

                            continue;
                        }

                        models[field.name] = field;

                        if (field.child) {
                            models[field.child.name] = field.child;
                        }
                    }
                }

                return models;
            }
        },

        async created() {
            const response = await this.$fetch('positions').response();
            const data = response.json();

            for (const item of data) {
                this.flatFields.position_id.opt.push({
                    value: item.id,
                    label: item.name
                });
            }
        }
    };
</script>

<style lang="scss" scoped>

    .group {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
</style>
