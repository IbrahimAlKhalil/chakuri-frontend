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
                    <div class="flex justify-between align-center flex-wrap">
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
                                      :type="field.type"/>
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
                <el-button type="primary" icon="el-icon-plus" @click="addEducation" plain>আরও যুক্ত করুন</el-button>
            </div>
        </template>

        <div v-else class="flex justify-center flex-wrap">
            <div class="no-academic w-100">আপনি কোনো একাডেমিক তথ্য যুক্ত করেননি। নিচের বাটনে ক্লিক করে যুক্ত করুন।
                (ঐচ্ছিক)
            </div>

            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addEducation" plain>একাডেমিক তথ্য যুক্ত
                করুন।
            </el-button>
        </div>
    </div>
</template>

<script>
    import preview from '../partials/preview';
    import {elButton, elButtonGroup, elForm, elFormItem, elInput, elOption, elSelect} from '@/el';

    export default {
        name: 'education',
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
                marhala: '',
                madrasa: '',
                year: '',
                result: ''
            }) {
                const index = this.groups.length;
                const rules = this.required;
                const enToBn = this.$enToBn;

                const {year, id, madrasa, result, marhala} = fields;

                const years = [];

                for (let i = 1950; i < (new Date).getFullYear() + 2; i++) {
                    years.unshift({
                        label: enToBn(i),
                        value: i
                    });
                }

                return {
                    id,
                    label: `একাডেমিক ${enToBn(index + 1)}`,
                    fields: {
                        marhala: {
                            label: 'মারহালা',
                            type: 'select',
                            value: marhala,
                            model: marhala,
                            rules,
                            opt: ['তাকমিল', 'ফযীলত', 'সানাবিয়া উলইয়া', 'মুতাওয়াসসিতাহ', 'ইবতিদাইয়্যাহ', 'হিফযুল কুরআন', 'ইলমুত তাজবীদ ওয়াল কিরাআত']
                        },

                        result: {
                            label: 'ফলাফল',
                            type: 'select',
                            value: result,
                            model: result,
                            opt: ['মুমতাজ', 'জায়্যিদ জিদ্দান', 'জায়্যিদ', 'মকবুল', 'রাসিব']
                        },

                        madrasa: {
                            label: 'মাদ্রাসা',
                            type: 'text',
                            rules,
                            model: madrasa,
                            value: madrasa
                        },

                        year: {
                            label: 'শিক্ষাবর্ষ',
                            type: 'select',
                            value: year,
                            rules,
                            model: year,
                            opt: years
                        }
                    }
                };
            },

            addEducation() {
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
                        const response = await this.$fetch(`resume/education/${group.id}`, {
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

                const response = await this.$fetch(`resume/education/${group.id}`, {
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

                const response = await this.$fetch('resume/education', {
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
            const response = await this.$fetch(`resume/education`).response();

            const groups = response.json();

            groups.forEach(group => this.groups.push(
                this.makeGroup(group)
            ));

            this.initialized = true;
        }
    };
</script>
