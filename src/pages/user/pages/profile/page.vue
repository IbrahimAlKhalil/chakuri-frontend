<template>
    <div class="el-card is-always-shadow" v-loading="!initialized">
        <cropper :photo.sync="photo" @done="save($event)" @cancel="cancel"/>

        <div class="el-card__body wrapper">
            <template v-if="!user.photo">
                <form @submit.native.prevent="" class="flex justify-center" ref="photoForm" v-loading="loading">
                    <label class="flex justify-center align-center up-box">
                        <i class="el-icon-plus"></i>
                        <input class="d-none" type="file" accept="image/jpeg,image/png" @change="crop($event)">
                    </label>
                </form>
                <p class="text-center"><b>{{user.type === 1?'ছবি':'লোগো'}} আপলোড করা হয়নি, আপলোড করতে উপরের বক্সে
                    ক্লিক করুন</b></p>
            </template>

            <div v-else class="flex justify-center" v-loading="loading">
                <div>
                    <img class="d-block mb-1 photo" :src="user.photo">
                    <form @submit.native.prevent="" class="flex justify-center" ref="photoForm">
                        <label class="align-center el-button el-button--primary flex is-plain justify-center is-circle">
                            <i class="el-icon-edit"></i>
                            <input class="d-none" type="file" accept="image/jpeg,image/png" @change="crop($event)">
                        </label>
                    </form>
                </div>
            </div>
            <el-divider/>

            <el-form :model="models" :rules="rules" ref="form" @submit.native.prevent="">
                <template v-for="(row, index) in rows">
                    <div v-if="!row.id || row.id === user.type" :key="index" class="row">
                        <div class="el-card">
                            <div class="el-card__header row-header flex justify-between align-center">
                                <span>{{row.label}}</span>
                                <div v-if="row.verified !== false" :class="'actions' + (row.edit?' edit':'')">
                                    <el-tooltip :content="row.edit?'বাতিল করুন':'এডিট করুন'" placement="top">
                                        <el-button size="medium" :type="row.edit?'danger':''"
                                                   @click="toggleEdit(row)" circle>
                                            <i :class="row.edit?'el-icon-close':'el-icon-edit'"></i>
                                        </el-button>
                                    </el-tooltip>

                                    <el-tooltip v-if="row.edit" content="সংরক্ষণ করুন" placement="top">
                                        <el-button size="medium" type="success"
                                                   @click="submit(row, index)" circle>
                                            <i class="el-icon-check"></i>
                                        </el-button>
                                    </el-tooltip>
                                </div>
                            </div>
                            <div class="el-card__body" v-loading="row.loading" @keyup.enter="submit(row, index)">
                                <template v-if="!row.edit">
                                    <div v-if="!row.value">n/a</div>
                                    <div v-else-if="!row.verify">{{row.value}}</div>
                                    <template v-else>
                                        <div v-for="(item, index) in row.value" :key="index"
                                             :class="'mt-1'+(!item.verified?' not-verified':'')">
                                            {{item.value}}
                                            <span v-if="!item.verified">ভেরিফিকেশন করা হয়নি</span>
                                        </div>

                                        <span v-if="!row.value.length">n/a</span>
                                    </template>

                                </template>


                                <el-form-item v-else :prop="index">
                                    <el-select v-if="row.type === 'select'" v-model="models[index]"
                                               :value="models[index]"
                                               placeholder="" class="w-100">
                                        <div slot="empty" class="p-1" v-loading="true">
                                            <br><br>
                                        </div>
                                        <el-option v-for="(option, index) in row.options" :key="index"
                                                   :label="option.name" :value="option.id"/>
                                    </el-select>
                                    <el-input v-else :type="row.type" v-model="models[index]" :placeholder="row.label"
                                              :maxlength="row.maxLength" rows="5" show-word-limit/>
                                </el-form-item>

                                <template v-if="row.hasOwnProperty('code') && row.value && !row.verified">
                                    <br>
                                    <p><b>{{row.value[1].value}}</b> নাম্বারে
                                        এসএমএস
                                        এর মাধ্যমে ৬ ডিজিটের একটি ভেরিফিকেশন কোড পাঠানো হয়েছে,
                                        সেই কোডটি নিচের
                                        বক্সে লিখে
                                        ভেরিফাই করুন।</p>
                                    <el-input type="number" class="code" v-model="row.code" placeholder="কোড"/>
                                    <el-button type="primary" @click="verify">ভেরিফাই</el-button>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {
        elButton,
        elButtonGroup,
        elCard,
        elDivider,
        elForm,
        elFormItem,
        elInput,
        elTooltip,
        elSelect,
        elOption
    } from '../../../../el'
    import cropper from '../../../../components/cropper'
    import mixin from '../../mixins/photo'

    export default {
        mixins: [mixin],

        components: {
            elCard,
            elInput,
            elForm,
            elFormItem,
            elDivider,
            elButton,
            elTooltip,
            elButtonGroup,
            cropper,
            elSelect,
            elOption
        },

        data() {
            const {user} = this.$store.state.auth

            return {
                rules: {
                    name: [
                        {
                            max: 190,
                            message: 'দুঃখিত নাম ১৯০ টির বেশি অক্ষর হতে পারে না'
                        }
                    ],
                    email: [
                        {
                            type: 'email',
                            message: 'দুঃখিত, ইমেইল ঠিকানাটি সঠিক নয়।'
                        }
                    ]
                },
                models: {},
                rows: {
                    name: {
                        type: 'text',
                        label: (user.type === 1 ? '' : 'প্রতিষ্ঠানের নাম ') + 'নাম',
                        value: user.name
                    },
                    description: {
                        type: 'textarea',
                        label: 'প্রতিষ্ঠানের বিবরণ',
                        value: user.description,
                        maxLength: 3000,
                        id: 2
                    },
                    category: {
                        type: 'select',
                        label: 'প্রতিষ্ঠানের ধরণ',
                        value: null,
                        options: [],
                        id: 2
                    },
                    type: {
                        type: 'select',
                        label: 'সরকারি/বেসরকারি',
                        value: null,
                        options: [],
                        id: 2
                    },
                    address: {
                        type: 'textarea',
                        label: 'ঠিকানা',
                        value: user.address,
                        id: 2
                    },
                    email: {
                        type: 'email',
                        label: 'ই-মেইল',
                        value: null,
                        pass: true,
                        verify: true,
                        msg: 'আপনার নতুন ইমেইল ঠিকানায় ভেরিফিকেশন এর লিংক পাঠানো হয়েছে সেটাতে ক্লিক করে আপনার নতুন ইমেইলটি ভেরিফাই করুন। ১ ঘন্টা পর লিংকটির মেয়াদউত্তীর্ণ হয়ে যাবে।'
                    },
                    mobile: {
                        type: 'text',
                        label: 'মোবাইল নম্বর',
                        value: null,
                        verify: true,
                        code: '',
                        pass: true,
                        verified: true,
                    },
                    pass: {
                        type: 'password',
                        label: 'পাসওয়ার্ড',
                        value: '*********',
                        verified: true,
                        pass: true
                    },
                },
                initialized: false,
                reset: 'photoForm',
                user
            }
        },

        methods: {
            toggleEdit(row) {
                row.edit = !row.edit
            },

            getValue(row) {

                // Return the value if it isn't an array
                if (Array.isArray(row.value)) {
                    let value

                    row.value.some(item => {
                        if (item.verified) {
                            value = item.value
                        }

                        return item.verified
                    })

                    return value
                }

                return row.value
            },

            async submit(row, name) {
                const {form} = this.$refs
                const model = this.models[name]

                // Detect change
                if (model === this.getValue(row)) {
                    // Hide input
                    row.edit = false
                    return
                }

                // Validate
                let message

                await form.validateField(name, async msg => message = msg)

                if (message) {
                    return this.errorNotify(message)
                }

                // Show spinner
                row.loading = true

                // Request body
                const body = {
                    [name]: model
                }

                // Check whether password required to act
                if (row.pass) {
                    body.password = await this.$store.dispatch('confirmPassword', 'এখানে আপনার পুরাতন পাসওয়ার্ড লিখুন')


                    // User should give password
                    if (!body.password) {
                        // Hide spinner
                        row.loading = false
                        return
                    }
                }

                // Request to server
                const response = await this.$fetch(`update-${name}`, {
                    method: 'POST',
                    body
                }).response()

                // Request completed

                // Hide spinner
                row.loading = false


                // Check whether it was successful
                if (response.status !== 200) {
                    return this.errorNotify(response.text)
                }

                // Success

                // Change preview if it isn't password
                if (row.type !== 'password' && !row.verify && row.type !== 'select') {
                    row.value = model
                }


                if (row.type === 'select') {
                    let option

                    row.options.some(item => {
                        if (item.id === model) {
                            option = item
                            return true
                        }

                        return false
                    })

                    row.value = option.name
                }

                if (row.verify) {
                    row.verified = false

                    row.value.push({
                        value: model,
                        verified: false
                    })
                }

                // Show success message
                this.successNotify(row.msg ? row.msg : 'আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে', row.msg ? 20000 : 12000)

                // Hide input
                row.edit = false
            },

            successNotify(message, duration) {
                this.$notify({
                    message,
                    type: 'success',
                    duration
                })
            },

            errorNotify(message) {
                this.$notify({
                    message,
                    type: 'error'
                })
            },

            async verify() {
                const response = await this.$fetch(`mobile-verification/${this.rows.mobile.code}`).response()

                if (response.status === 200) {
                    const {mobile} = this.rows
                    const {value} = mobile

                    mobile.verified = true
                    mobile.code = ''
                    value.shift()

                    value[0].verified = true

                    this.$store.commit('updateUser', {
                        prop: 'mobile',
                        value: value[0].value
                    })

                    return this.$notify({
                        message: 'আপনার মোবাইল নাম্বার সফল ভাবে পরিবর্তন করা হয়েছে',
                        type: 'success'
                    })
                }

                const data = response.json()

                this.$notify({
                    message: data.message,
                    type: data.status === 'expired' || data.status === 'maximum-reached' ? 'error' : 'warning',
                    duration: 15000
                })
            }
        },

        async created() {
            const {rows} = this

            // Load email and mobile
            var response = await this.$fetch('email-and-mobile').response()
            var data = response.json()

            const {email} = rows
            const {mobile} = rows

            // Set email and mobiles
            email.value = data.email
            mobile.value = data.mobile

            // Disable editing if email or mobile is not verified
            if (data.email.some(item => !item.verified)) {
                this.$set(email, 'verified', false)
            }

            if (data.mobile.some(item => !item.verified)) {
                this.$set(mobile, 'verified', false)
            }

            // Show default email
            const {user} = this
            if (user.email) {
                email.value.unshift({
                    value: user.email,
                    verified: true
                })
            }

            mobile.value.unshift({
                value: user.mobile,
                verified: true
            })

            // Hide spinner from the section
            this.initialized = true

            const required = {
                required: true,
                message: 'অনুগ্রহ করে এই ঘরটি পূরণ করুন'
            }

            for (let key in rows) {
                const row = rows[key]

                this.$set(row, 'edit', false)
                this.$set(row, 'loading', false)
                this.$set(this.models, key, this.getValue(row))

                if (this.rules.hasOwnProperty(key)) {
                    this.rules[key].push(required)
                }

            }


            var response = await this.$fetch('category-and-type').response()
            var data = response.json()

            const {category, type} = this.rows

            category.options = data.category.options
            type.options = data.type.options

            if (data.category.selected) {
                this.models.category = data.category.selected.id
                category.value = data.category.selected.name
            }

            if (data.type.selected) {
                this.models.type = data.type.selected.id
                type.value = data.type.selected.name
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../../../styles/var";

    .row {
        padding: 12px 10px;

        &:hover {
            .actions {
                opacity: 1;
            }
        }
    }

    .label {
        margin-right: 50px;
        white-space: nowrap;
    }


    .row-header {
        border-bottom: 1px solid #dcdfe6;
        background: #f4f4f4;
        padding: 8px 20px;
    }

    .actions {
        opacity: 0;
        transition: 150ms ease-in-out;
        will-change: opacity;

        &.edit {
            opacity: 1;
        }
    }

    .not-verified {
        color: #777777;

        span {
            padding: 3px;
            border-radius: 3px;
            border: 1px solid #f28dcb;
            font-size: .8rem;
            margin-left: 10px;
            color: #ff75a6;
        }
    }

    .code {
        width: 120px;
    }

    .up-box {
        width: 200px;
        max-width: 200px;
        height: 200px;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        font-size: 2rem;
        color: #8c939d;
        background: #fbfdff;
        cursor: pointer;

        &:hover {
            border: 1px dashed $--color-primary;
        }
    }

    .photo {
        width: 200px;
        border-radius: 5px;
        box-shadow: 0 0 15px 7px rgba(0, 0, 0, .1);
    }

    @media all and (max-width: $--md) {
        .wrapper {
            padding: 20px 0;
        }

        .actions {
            opacity: 1;
        }

        .dialog {
            width: 80%;
        }
    }
</style>
