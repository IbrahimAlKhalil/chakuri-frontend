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
                            <el-checkbox v-if="field.type === 'check'" v-model="field.model">
                                {{field.label}}
                            </el-checkbox>


                            <template v-else>
                                <label :for="`${key}-${index}`">{{field.label}}</label>
                                <el-input :id="`${key}-${index}`" v-model="field.model"
                                          :placeholder="field.placeholder"
                                          :type="field.type"
                                          :disabled="field.hasOwnProperty('disabled') && group.fields[field.disabled].model"
                                          :value="field.value"/>
                            </template>
                        </el-form-item>
                    </div>
                </el-form>
            </div>

            <div v-show="!edit" class="inputs" v-loading="!initialized">
                <div v-for="(group, index) in groups" :key="index">
                    <h2 class="text-center group-label">{{group.label}}</h2>
                    <template v-for="(field, index) in group.fields">
                        <preview v-if="field.type !=='check'" :field="field" :key="index"/>
                    </template>
                </div>
            </div>

            <div v-if="edit" class="mt-1 flex justify-center">
                <el-button type="warning" icon="el-icon-back" @click="edit = false" plain>পিছনে যান</el-button>
                <el-button type="primary" icon="el-icon-plus" @click="addExperience" plain>আরও যুক্ত করুন</el-button>
            </div>
        </template>

        <div v-else class="flex justify-center flex-wrap">
            <div class="no-academic w-100">আপনি কোনো অভিজ্ঞতা যুক্ত করেননি। নিচের বাটনে ক্লিক করে যুক্ত করুন।
                (ঐচ্ছিক)
            </div>

            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addExperience" plain>অভিজ্ঞতা যুক্ত
                করুন।
            </el-button>
        </div>
    </div>
</template>

<script>
    import preview from '../partials/preview'
    import {elButton, elButtonGroup, elForm, elFormItem, elInput, elOption, elSelect, elCheckbox} from '../../../../../el'
    import {enToBn} from '../../../../../modules/en-to-bn'

    export default {
        name: 'experience',
        components: {elFormItem, preview, elButton, elForm, elButtonGroup, elInput, elSelect, elOption, elCheckbox},
        data() {
            return {
                edit: false,
                initialized: false,
                required: [{
                    required: true,
                    message: 'অনুগ্রহ করে এই ঘরটি পূরণ করুন'
                }],
                groups: []
            }
        },

        methods: {
            makeGroup(fields = {
                id: 0,
                designation: '',
                responsibilities: '',
                institute: '',
                address: '',
                start: '',
                current: false,
                end: ''
            }) {
                const index = this.groups.length
                const rules = this.required

                const {institute, current, id, start, address, designation, end, responsibilities} = fields

                return {
                    id,
                    label: `অভিজ্ঞতা ${enToBn(index + 1)}`,
                    fields: {
                        designation: {
                            label: 'পদ',
                            type: 'text',
                            value: designation,
                            model: designation,
                            rules,
                        },

                        responsibilities: {
                            label: 'দায়িত্ব',
                            type: 'textarea',
                            placeholder: 'আপনি ওখানে কি কি করেছেন। আপনার দায়িত্ব কি ছিল, ইত্যাদি।',
                            rules,
                            value: responsibilities,
                            model: responsibilities,
                        },

                        institute: {
                            label: 'প্রতিষ্ঠান',
                            placeholder: 'প্রতিষ্ঠানের নাম লিখুন',
                            type: 'text',
                            rules,
                            model: institute,
                            value: institute
                        },

                        address: {
                            label: 'ঠিকানা',
                            type: 'text',
                            placeholder: 'প্রতিষ্ঠানের ঠিকানা লিখুন',
                            value: address,
                            rules,
                            model: address,
                        },

                        start: {
                            label: 'দায়িত্ব শুরুর তারিখ',
                            type: 'date',
                            value: start,
                            rules,
                            model: start,
                        },

                        end: {
                            label: 'দায়িত্ব শেষের তারিখ',
                            type: 'date',
                            value: end,
                            rules,
                            model: end,
                            disabled: 'current'
                        },

                        current: {
                            label: 'বর্তমানে আমি এখানেই আছি',
                            type: 'check',
                            value: !!current,
                            rules,
                            model: !!current
                        }
                    }
                }
            },

            addExperience() {
                const group = this.makeGroup()

                this.edit = true

                this.groups.push(group)
            },

            async deleteGroup(group) {
                return new Promise(resolve => {
                    if (!group.id) {
                        return resolve(true)
                    }

                    this.$messageBox.confirm('আপনি কি সত্যিই এটি মুছে ফেলতে চান?', 'Warning', {
                        confirmButtonText: 'হ্যা',
                        cancelButtonText: 'না',
                        type: 'warning'
                    }).then(async () => {
                        const response = await this.$fetch(`resume/experience/${group.id}`, {
                            method: 'DELETE'
                        }).response()

                        if (response.status === 200) {
                            resolve(true)
                            this.notify()
                        }

                        resolve(false)
                    }).catch(() => {
                        resolve(false)
                    })
                })
            },

            async removeGroup(group) {
                const deleted = await this.deleteGroup(group)
                if (!deleted) {
                    return
                }

                const {groups} = this

                // Remove group from groups array
                groups.splice(this.groups.indexOf(group), 1)

                // Hide editor if it is the last of the groups
                if (groups.length === 0) {
                    this.edit = false
                }
            },

            async update(group) {
                const {fields} = group
                const body = {}

                for (const key in fields) {
                    const field = fields[key]

                    if (field.model === field.value) {
                        continue
                    }

                    body[key] = field.model
                }

                const response = await this.$fetch(`resume/experience/${group.id}`, {
                    method: 'PUT',
                    body
                }).response()

                if (response.status !== 200) {
                    return
                }

                // Show success message
                this.notify()

                for (const key in body) {
                    if (fields.hasOwnProperty('key')) {
                        fields[key].value = body[key]
                    }
                }

                this.edit = false
            },

            async submit(group) {
                if (group.id) {
                    return await this.update(group)
                }

                const {fields} = group

                const body = {}

                for (let key in fields) {
                    body[key] = fields[key].model
                }

                const response = await this.$fetch('resume/experience', {
                    method: 'POST',
                    body
                }).response()

                if (response.status === 200) {
                    // Show success message
                    this.notify()

                    this.$set(group, 'id', response.text)

                    for (const key in body) {
                        group.fields[key].value = body[key]
                    }

                    this.edit = false
                }
            },

            notify() {
                this.$notify({
                    title: 'Success',
                    message: 'আপনার জীবনবৃত্তান্ত সফলভাবে আপডেট করা হয়েছে!',
                    type: 'success'
                })
            }
        },

        async created() {
            const response = await this.$fetch(`resume/experience`).response()

            const groups = response.json()

            groups.forEach(group => this.groups.push(
                this.makeGroup(group)
            ))

            this.initialized = true
        }
    }
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
