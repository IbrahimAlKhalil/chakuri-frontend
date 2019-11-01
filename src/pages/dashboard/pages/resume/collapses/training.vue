<template>
    <div>
        <template v-if="groups.length > 0">
            <div class="flex mt-1 mb-1">
                <div class="ml-auto"></div>
                <el-button class="edit-btn" v-if="!edit && groups.length" icon="el-icon-edit" size="small"
                           @click="edit = true" :disabled="!initialized">এডিট করুন
                </el-button>
            </div>

            <div v-if="initialized" v-show="edit">
                <el-form v-for="(group, index) in groups" :model="group.fields" :key="index"
                         @submit.native.prevent="submit(group)">
                    <div class="flex justify-between align-center">
                        <h2>{{group.label}}</h2>
                        <div>
                            <el-button-group>
                                <el-button size="medium" type="danger" icon="el-icon-delete" @click="removeGroup(group)"
                                           round plain>মুছে ফেলুন
                                </el-button>

                                <el-button size="medium" type="success" icon="el-icon-check" @click="submit(group)"
                                           round plain>{{group.id?'আপডেট':'সংরক্ষণ'}} করুন
                                </el-button>
                            </el-button-group>
                        </div>
                    </div>
                    <div class="inputs">
                        <el-form-item v-for="(field, key) in group.fields" :prop="`${key}.model`" :rules="field.rules"
                                      :key="key">
                            <label :for="`${key}-${index}`">{{field.label}}</label>
                            <el-input v-if="field.type !== 'select'" :id="`${key}-${index}`" v-model="field.model"
                                      :type="field.type" :placeholder="field.placeholder"/>
                            <el-select v-else :id="`${key}-${index}`" class="sl" v-model="field.model"
                                       :placeholder="field.label + ' নির্ধারণ করুন'">
                                <el-option v-for="(opt, index) in field.opt"
                                           :label="typeof opt !== 'object'?opt:opt.label" :key="index"
                                           :value="typeof opt !== 'object'?opt:opt.value"/>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <div v-show="!edit" class="inputs" v-loading="!initialized">
                <div v-for="(group, index) in groups" :key="index">
                    <h2 class="text-center group-label">{{group.label}}</h2>
                    <preview v-for="(field, index) in group.fields" :field="field" :key="index"/>
                </div>
            </div>

            <div v-if="edit" class="mt-1 flex justify-center">
                <el-button type="warning" icon="el-icon-back" @click="edit = false" plain>পিছনে যান</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="addTraining" plain>আরও যুক্ত করুন</el-button>
            </div>
        </template>

        <div v-else class="flex justify-center flex-wrap">
            <div class="no-academic w-100">আপনি কোনো প্রশিক্ষণ যুক্ত করেননি। নিচের বাটনে ক্লিক করে যুক্ত করুন।
                (ঐচ্ছিক)
            </div>

            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addTraining" plain>প্রশিক্ষণ যুক্ত
                করুন।
            </el-button>
        </div>
    </div>
</template>

<script>
    import preview from '../partials/preview';
    import {elButton, elButtonGroup, elForm, elFormItem, elInput, elOption, elSelect} from '../../../../../el';

    export default {
        name: 'training',
        components: {elFormItem, preview, elButton, elForm, elButtonGroup, elInput, elSelect, elOption},
        data() {
            return {
                edit: false,
                initialized: false,
                required: [{
                    required: true,
                    message: 'অনুগ্রহ করে এই ঘরটি পূরণ করুন'
                }],
                groups: []
            };
        },

        methods: {
            makeGroup(fields = {
                id: 0,
                title: '',
                topics: '',
                year: '',
                duration: '',
                institute: ''
            }) {
                const enToBn = this.$enToBn;

                const index = this.groups.length;
                const rules = this.required;

                const {id, institute, topics, duration, year, title} = fields;

                const years = [];

                for (let i = 1950; i < (new Date).getFullYear() + 2; i++) {
                    years.unshift({
                        label: enToBn(i),
                        value: i
                    });
                }

                return {
                    id,
                    label: `প্রশিক্ষণ ${enToBn(index + 1)}`,
                    fields: {
                        title: {
                            label: 'নাম',
                            placeholder: 'প্রশিক্ষণের নাম',
                            type: 'text',
                            value: title,
                            model: title,
                            rules
                        },

                        topics: {
                            label: 'বিষয়',
                            placeholder: 'যে বিষয়ে প্রশিক্ষণ নিয়েছেন। যেমন: নাহু-সরফ, হুফ্ফাজ।',
                            type: 'text',
                            value: topics,
                            model: topics,
                            rules
                        },

                        institute: {
                            label: 'প্রতিষ্ঠান',
                            placeholder: 'প্রতিষ্ঠানের নাম লিখুন',
                            type: 'text',
                            rules,
                            model: institute,
                            value: institute
                        },

                        year: {
                            label: 'বছর',
                            placeholder: 'যে বছর প্রশিক্ষণ নেয়া শুরু করেছেন',
                            type: 'select',
                            rules,
                            value: year,
                            model: year,
                            opt: years
                        },
                        duration: {
                            label: 'সময়সীমা',
                            placeholder: 'কতদিন প্রশিক্ষণ নিয়েছেন তা লিখুন। যেমন: ২ বছর',
                            type: 'text',
                            rules,
                            model: duration,
                            value: duration
                        },
                    }
                };
            },

            addTraining() {
                const group = this.makeGroup();

                this.edit = true;

                this.groups.push(group);
            },

            async deleteGroup(group) {
                return new Promise(resolve => {
                    if (!group.id) {
                        return resolve(true);
                    }

                    this.$messageBox.confirm('আপনি কি সত্যিই এটি মুছে ফেলতে চান?', 'Warning', {
                        confirmButtonText: 'হ্যা',
                        cancelButtonText: 'না',
                        type: 'warning'
                    }).then(async () => {
                        const response = await this.$fetch(`resume/training/${group.id}`, {
                            method: 'DELETE'
                        }).response();

                        if (response.status === 200) {
                            resolve(true);
                            this.success();
                        }

                        resolve(false);
                    }).catch(() => {
                        resolve(false);
                    });
                });
            },

            async removeGroup(group) {
                const deleted = await this.deleteGroup(group);
                if (!deleted) {
                    return;
                }

                const {groups} = this;

                // Remove group from groups array
                groups.splice(this.groups.indexOf(group), 1);

                // Hide editor if it is the last of the groups
                if (groups.length === 0) {
                    this.edit = false;
                }
            },

            async update(group) {
                const {fields} = group;
                const body = {};

                for (const key in fields) {
                    const field = fields[key];

                    if (field.model === field.value) {
                        continue;
                    }

                    body[key] = field.model;
                }

                const response = await this.$fetch(`resume/training/${group.id}`, {
                    method: 'PUT',
                    body
                }).response();

                if (response.status !== 200) {
                    return;
                }

                // Show success message
                this.success();

                for (const key in body) {
                    if (fields.hasOwnProperty('key')) {
                        fields[key].value = body[key];
                    }
                }

                this.edit = false;
            },

            async submit(group) {
                if (group.id) {
                    return await this.update(group);
                }

                const {fields} = group;

                const body = {};

                for (let key in fields) {
                    body[key] = fields[key].model;
                }

                const response = await this.$fetch('resume/training', {
                    method: 'POST',
                    body
                }).response();

                if (response.status === 200) {
                    // Show success message
                    this.success();

                    this.$set(group, 'id', response.text);

                    for (const key in body) {
                        group.fields[key].value = body[key];
                    }

                    this.edit = false;
                }
            },

            success() {
                this.$notify({
                    title: 'Success',
                    message: 'আপনার জীবনবৃত্তান্ত সফলভাবে আপডেট করা হয়েছে!',
                    type: 'success'
                });
            }
        },

        async created() {
            const response = await this.$fetch(`resume/training`).response();

            const groups = response.json();

            groups.forEach(group => this.groups.push(
                this.makeGroup(group)
            ));

            this.initialized = true;
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../../styles/var";

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

    .no-academic {
        font-weight: bold;
        font-size: 1.1rem;
        padding: 30px;
        text-align: center;
    }

    .sl {
        display: block !important;
    }

    .group-label {
        color: $--color-primary;
    }
</style>
