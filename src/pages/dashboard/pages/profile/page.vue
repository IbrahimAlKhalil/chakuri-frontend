<template>
    <div class="el-card" v-loading="!initialized">
        <cropper :photo.sync="photo" @done="save($event)" @cancel="cancel"/>

        <div class="el-card__body">
            <template v-if="!user.photo">
                <form @submit.prevent="" class="flex justify-center" ref="photoForm" v-loading="loading">
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
                    <img class="d-block mb-1 photo" :src="user.photo | fileUrl">
                    <form @submit.prevent="" class="flex justify-center" ref="photoForm">
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
                    <div v-if="!row.id || row.id === user.type" :key="index" class="row" :id="'profile-'+index">
                        <div class="el-card">
                            <div class="el-card__header row-header flex justify-between align-center">
                                <span>{{row.label}}</span>
                                <div :class="'actions' + (row.edit?' edit':'') + (row.verified === false?' opacify':'')">
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

                                        <template v-if="!row.hasOwnProperty('code') && row.value && !row.verified">
                                            <transition name="fade">
                                                <resend v-if="row.value.some(a=>!a.verified) && vEmail.timeout"
                                                        :data="vEmail" type="email" title="মেইল" name="ই-মেইল"
                                                        @sent="setTimer('email')" @error="errorNotify"
                                                        :rules="rules.email" @update="payloadUpdate"/>
                                            </transition>
                                        </template>


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
                                    <br/>

                                    <template v-if="!row.value[row.value.length-1].maximumReached">
                                        <p><b>{{row.value[row.value.length-1].value}}</b> নাম্বারে
                                            এসএমএস
                                            এর মাধ্যমে ৬ ডিজিটের একটি ভেরিফিকেশন কোড পাঠানো হয়েছে, নিচের
                                            বক্সে কোডটি লিখে
                                            ভেরিফাই করুন। এসএমএস যেতে <b>দুই মিনিট</b> সময় লাগতে পারে। এর পরও যদি না
                                            গিয়ে
                                            থাকে
                                            তাহলে আপনার নাম্বারটা ঠিক আছে কিনা তা পুনরায় যাচাই করুন</p>
                                        <div class="mb-1">
                                            <el-input class="code mb-1" v-model="row.code" placeholder="কোড">
                                                <el-button slot="append" type="primary" @click="verify">ভেরিফাই
                                                </el-button>
                                            </el-input>

                                            <template v-if="!vMobile.timeout">
                                                &nbsp;&nbsp;<span
                                                    class="link">{{vMobile.timer | enToBn}}</span>
                                            </template>
                                        </div>

                                        <transition name="fade">
                                            <resend v-if="vMobile.timeout" :data="vMobile" type="mobile" title="এসএমএস"
                                                    name="নম্বর"
                                                    @sent="setTimer('mobile')" @error="errorNotify"
                                                    @update="payloadUpdate"/>
                                        </transition>
                                    </template>


                                    <p v-else class="text-danger"><b>আপনি ১০ বারের বেশি ভুল কোড দিয়েছেন তাই আপনার
                                        অনুরোধটি
                                        বাতিল বলে গণ্য হয়েছে, অনুগ্রহ করে ১ ঘন্টা পর আবার চেষ্টা করুন</b></p>
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
    } from '@/el';
    import cropper from '@components/cropper';
    import mixin from '../../mixins/photo';
    import hash from '@/mixins/hash';
    import Resend from '@/pages/dashboard/pages/profile/resend';

    export default {
        mixins: [mixin, hash],

        components: {
            Resend,
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
            const {user} = this.$store.state.auth;

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
                            trigger: 'blur',
                            message: 'দুঃখিত, ইমেইল ঠিকানাটি সঠিক নয়।'
                        }
                    ]
                },
                models: {},
                rows: {
                    name: {
                        type: 'text',
                        label: user.type === 2 ? 'প্রতিষ্ঠানের নাম' : 'নাম',
                        value: user.name
                    },
                    description: {
                        type: 'textarea',
                        label: 'প্রতিষ্ঠানের বিবরণ',
                        maxLength: 3000,
                        id: 2
                    },
                    category: {
                        type: 'select',
                        label: 'প্রতিষ্ঠানের ধরণ',
                        id: 2
                    },
                    type: {
                        type: 'select',
                        label: 'সরকারি/বেসরকারি',
                        id: 2
                    },
                    address: {
                        type: 'textarea',
                        label: 'ঠিকানা',
                        id: 2
                    },
                    email: {
                        type: 'email',
                        label: 'ই-মেইল',
                        pass: true,
                        verify: true,
                        msg: 'আপনার নতুন ইমেইল ঠিকানায় ভেরিফিকেশন এর লিংক পাঠানো হয়েছে সেটাতে ক্লিক করে আপনার নতুন ইমেইলটি ভেরিফাই করুন। ১ ঘন্টা পর লিংকটির মেয়াদউত্তীর্ণ হয়ে যাবে।'
                    },
                    mobile: {
                        type: 'text',
                        label: 'মোবাইল নম্বর',
                        verify: true,
                        code: '',
                        pass: true
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
                user,
                verification: {
                    email: {
                        timer: '00:00',
                        timeout: false,
                        loading: false,
                        time: 180,
                    },

                    mobile: {
                        timer: '00:00',
                        timeout: false,
                        loading: false,
                        time: 180
                    }
                }
            };
        },

        computed: {
            vMobile() {
                return this.verification.mobile;
            },

            vEmail() {
                return this.verification.email;
            }
        },

        methods: {
            toggleEdit(row) {
                row.edit = !row.edit;
            },

            getValue(row) {

                // Return the value if it isn't an array
                if (Array.isArray(row.value)) {
                    let value;

                    row.value.some(item => {
                        if (item.verified) {
                            value = item.value;
                        }

                        return item.verified;
                    });

                    return value;
                }

                return row.value;
            },

            async submit(row, name) {
                const {form} = this.$refs;
                const model = this.models[name];

                // Detect change
                if (model === this.getValue(row)) {
                    // Hide input
                    row.edit = false;
                    return;
                }

                // Validate
                let message;

                await form.validateField(name, async msg => message = msg);

                if (message) {
                    return this.errorNotify(message);
                }

                // Show spinner
                row.loading = true;

                // Request body
                const body = {
                    [name]: model
                };

                // Check whether password required to act
                if (row.pass) {
                    body.password = await this.$store.dispatch('additional/confirmPassword', 'এখানে আপনার পুরাতন পাসওয়ার্ড লিখুন');


                    // User should give password
                    if (!body.password) {
                        // Hide spinner
                        row.loading = false;
                        return;
                    }
                }

                // Request to server
                const response = await this.$fetch(`update-${name}`, {
                    method: 'POST',
                    body
                }).response();

                // Request completed

                // Hide spinner
                row.loading = false;


                // Check whether it was successful
                if (response.status !== 200) {
                    return this.errorNotify(response.text);
                }

                // Success

                // Change preview if it isn't password
                if (row.type !== 'password' && !row.verify && row.type !== 'select') {
                    row.value = model;
                }


                if (row.type === 'select') {
                    let option;

                    row.options.some(item => {
                        if (item.id === model) {
                            option = item;
                            return true;
                        }

                        return false;
                    });

                    row.value = option.name;
                }

                if (row.verify) {
                    row.verified = false;

                    this.verification[name].timeout = false;
                    this.verification[name].time = 180;
                    this.setTimer(name);

                    row.value.push({
                        value: model,
                        verified: false
                    });
                }

                // Show success message
                this.successNotify(row.msg ? row.msg : 'আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে', row.msg ? 20000 : 10000);

                // Hide input
                row.edit = false;
            },

            payloadUpdate(data) {
                const row = this.rows[data.type];

                row.value[row.value.length - 1].value = data.payload;
                this.models[data.type] = data.payload;

                this.setTimer(data.type);
            },

            successNotify(message, duration) {
                this.$notify({
                    message,
                    type: 'success',
                    duration
                });
            },

            errorNotify(message) {
                this.$notify({
                    message,
                    type: 'error'
                });
            },

            async verify() {
                const response = await this.$fetch(`mobile-verification/${this.rows.mobile.code}`).response();

                if (response.status === 200) {
                    const {mobile} = this.rows;
                    const {value} = mobile;

                    mobile.verified = true;
                    mobile.code = '';

                    value[value.length - 1].verified = true;

                    if (value.length > 1) {
                        value.shift();
                    }

                    return this.$notify({
                        message: 'আপনার মোবাইল নাম্বার ভেরিফিকেশন সম্পন্ন হয়েছে',
                        type: 'success'
                    });
                }

                const data = response.json();

                this.$notify({
                    message: data.message,
                    type: data.status === 'expired' ? 'error' : 'warning',
                    duration: 5000
                });
            },

            setTimer(type) {
                // TODO: Clean timer after verification completed

                const data = this.verification[type];

                let interval;
                let seconds = data.time;

                interval = setInterval(() => {
                    if (seconds <= 0) {
                        clearInterval(interval);

                        data.timer = '00:00';
                        data.timeout = true;

                        return;
                    }

                    seconds--;

                    const minute = seconds / 60;
                    const minuteRounded = Math.floor(minute);

                    data.timer = `${this.$zeroPrefix(minuteRounded)}:${this.$zeroPrefix(Math.round((minute - minuteRounded) * 60))}`;
                }, 1000);
            }
        },

        async created() {
            const {rows} = this;
            const component = this;

            // Load email and mobile
            let response = await this.$fetch('profile').response();
            let data = response.json();

            // Pending email and mobile
            // Info: Current email and mobile
            let {pending, info} = data;

            (['email', 'mobile']).forEach(function (name) {
                const row = rows[name];

                // Pending mobile and email
                const pendingItem = pending[name];

                // Set email and mobiles
                component.$set(row, 'value', []);

                // Disable editing if email or mobile is not verified
                component.$set(row, 'verified', !pendingItem);

                // Set mobile, email
                if (info[name]) {
                    row.value.push({
                        value: info[name],
                        verified: true
                    });
                }

                if (!!pendingItem) {
                    row.value.push({
                        value: pendingItem.value,
                        verified: false,
                        maximumReached: pendingItem.maximumReached
                    });

                    const lastSend = new Date(pendingItem.lastSend);

                    component.verification[name].time = 180 - ((Date.now() - lastSend.getTime()) / 1000);


                    // Set timer for resending verification token
                    component.setTimer(name);
                }
            });

            // Hide spinner from the section
            this.initialized = true;

            // Required rule
            const required = {
                required: true,
                message: 'অনুগ্রহ করে এই ঘরটি পূরণ করুন'
            };

            // Set necessary attributes to rows
            for (let key in rows) {
                const row = rows[key];

                this.$set(row, 'edit', false);
                this.$set(row, 'loading', false);
                this.$set(this.models, key, this.getValue(row));

                if (this.rules.hasOwnProperty(key)) {
                    this.rules[key].push(required);
                }
            }

            // If user is institute then load category and type
            if (this.$store.state.auth.user.type === 2) {
                // Set description and address
                (['description', 'address']).forEach(name => {
                    component.$set(rows[name], 'value', info[name]);
                    component.models[name] = info[name];
                });


                let response = await this.$fetch('category-and-type').response();
                let data = response.json();

                (['category', 'type']).forEach(name => {
                    const row = rows[name];
                    const {selected} = data[name];

                    // Set options
                    component.$set(row, 'options', data[name].options);

                    // Set value if a value is selected
                    if (selected) {
                        component.models[name] = selected.id;
                        component.$set(row, 'value', selected.name);
                    }
                });
            }
        },
    };
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
        width: 200px;
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

    .opacify {
        opacity: 0 !important;
        pointer-events: none;
    }

    .not-received {
        width: 340px;
    }

    @media all and (max-width: $--md) {

        .actions {
            opacity: 1;
        }

        .dialog {
            width: 80%;
        }
    }
</style>
