<template>
    <el-card class="wrapper">
        <div slot="header" class="text-center dark-text title">
            <template v-if="type">
                <!--<el-button size="small" icon="el-icon-arrow-left" @click="type = null" circle></el-button>-->
                <i class="fas fa-user-plus"></i>&nbsp;&nbsp;একাউন্ট তৈরি করুন
            </template>

            <template v-else>
                আপনি কেন একাউন্ট তৈরী করতে চান&nbsp;&nbsp;<i class="far fa-question-circle"></i>
            </template>
        </div>
        <div v-if="!type">
            <el-menu class="types">
                <li class="el-menu-item nav-arrow-right" @click="navigate('employee')">চাকুরী অনুসন্ধানের জন্য।</li>
                <li class="el-menu-item nav-arrow-right" @click="navigate('institution')">লোক নিয়োগ দেয়ার জন্য।</li>
            </el-menu>
        </div>
        <template v-else>
            <!--<div class="flex social-login">
                <el-button size="medium" class="facebook">
                    <i class="fab fa-facebook-f"></i>&nbsp;&nbsp;&nbsp;ফেসবুক
                </el-button>

                <el-button size="medium" class="google">
                    <i class="fab fa-google"></i>&nbsp;&nbsp;&nbsp;গুগল
                </el-button>

                <el-button size="medium" class="twitter">
                    <i class="fab fa-twitter"></i>&nbsp;&nbsp;&nbsp;টুইটার
                </el-button>
            </div>-->

            <el-divider/>

            <el-form :model="models" :rules="rules" ref="form" action="#"
                     @submit.native.prevent="submit" status-icon>
                <el-form-item prop="name">
                    <label for="name" class="d-block">{{type==='employee'?'নাম':'প্রতিষ্ঠানের নাম'}}</label>
                    <el-input id="name" v-model="models.name">
                        <i
                                :class="`${type==='employee'?'el-icon-user-solid':'fas fa-building'} el-input__icon`"
                                slot="prefix"
                        ></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="mobile">
                    <label for="mobile" class="d-block">মোবাইল নম্বর (ইংরেজিতে)</label>
                    <el-input id="mobile" v-model="models.mobile">
                        <i class="fas fa-mobile-alt el-input__icon" slot="prefix"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <label for="password" class="d-block">পাসওয়ার্ড</label>
                    <el-input id="password" type="password" v-model="models.password" autocomplete="new-password"
                              show-password>
                        <i class="el-icon-key el-input__icon" slot="prefix"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="rePassword">
                    <label for="rePassword" class="d-block">পাসওয়ার্ডটি আবার লিখুন</label>
                    <el-input id="rePassword" type="password" v-model="models.rePassword">
                        <i class="el-icon-key el-input__icon" slot="prefix"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="agreed" class="agreed">
                    <el-checkbox v-model="models.agreed">
                        আমি ব্যবহারের
                        <ext-link :href="termsPage" target="_blank" class="link" router-link>শর্তাবলী</ext-link>&nbsp;এবং
                        <ext-link :href="privacyPage" target="_blank" class="link" router-link>গোপনীয়তা নীতির
                        </ext-link>&nbsp;সঙ্গে
                        একমত
                    </el-checkbox>
                </el-form-item>

                <div class="text-center">
                    <el-button class="login-btn" :icon="!formLoading? 'el-icon-s-promotion' : 'el-icon-loading'"
                               type="primary"
                               nativeType="submit" :disabled="formLoading">&nbsp;&nbsp;সাবমিট
                    </el-button>
                </div>
            </el-form>
        </template>
    </el-card>
</template>

<script>
    import {elCard, elInput, elButton, elCheckbox, elDivider, elForm, elFormItem, elMenu} from '@/el';
    import {saveToken} from '@/modules/tokenizer';

    export default {
        components: {elCard, elInput, elButton, elCheckbox, elDivider, elForm, elFormItem, elMenu},
        data() {
            return {
                form: null,
                formLoading: false,
                models: {
                    name: '',
                    mobile: '',
                    password: '',
                    rePassword: '',
                    agreed: false,
                },
                passwordLength: 8,
                termsPage: '',
                privacyPage: '',
            };
        },

        methods: {
            async submit() {
                try {
                    await this.$refs.form.validate();

                    this.formLoading = true;

                    const response = await this.$fetch('register', {
                        auth: false,
                        method: 'POST',
                        body: {
                            name: this.models.name,
                            mobile: this.models.mobile,
                            password: this.models.password,
                            user_type_id: this.type === 'employee' ? 1 : 2,
                        },
                    }).response();

                    this.formLoading = false;
                    if (response.status === 200) {
                        // Registration successful

                        // Notify
                        this.$notify({
                            message: 'আপনার অ্যাকাউন্ট সফলভাবে তৈরি করা হয়েছে',
                            type: 'success',
                        });

                        const jwt = response.json();

                        saveToken(jwt.access_token);

                        await this.$store.dispatch('auth/signIn');

                        // Redirect to profile page
                        this.$router.push({path: 'dashboard/profile', query: {hash: 'profile-mobile'}});
                    }
                } catch (e) {
                }
            },

            requiredRule(suffix) {
                const please = 'অনুগ্রহ করে আপনার ';

                return {
                    required: true,
                    message: `${please}${suffix}।`,
                };
            },

            rePassword(rule, value, callback) {
                if (this.models.password === this.models.rePassword) {
                    callback();
                }

                callback('দুঃখিত, এই পাসওয়ার্ড এবং উপরের পাসওয়ার্ডটি এক নয়।');
            },

            agreed(rule, value, callback) {
                if (this.models.agreed) {
                    callback();
                }

                callback('দুঃখিত, আপনাকে আমাদের ব্যবহারের শর্তাবলী এবং গোপনীয়তা নীতির সাথে একমত হতে হবে।');
            },

            async userExists(rule, value, callback) {
                const response = await this.$fetch(`${rule.field}-exists`, {
                    method: 'POST',
                    body: {
                        user_type_id: this.type === 'employee' ? 1 : 2,
                        [rule.field]: this.models[rule.field],
                    },
                }).response();

                if (!!response.json()) {
                    return callback(`এই ${rule.field === 'mobile' ? 'নাম্বারটি' : 'ইমেইল ঠিকানাটি'} অন্য একটি একাউন্টে ব্যবহৃত হয়েছে`);
                }

                callback();
            },

            mobileLength(rule, value, callback) {
                value = value.toString();

                const length = value.length;

                if (/^\+880/.test(value) && length === 14) {
                    return callback();
                } else if (length === 11) {
                    return callback();
                }


                callback('দুঃখিত, মোবাইল নম্বর ১১ ডিজিটের হতে হবে।');
            },

            navigate(type) {
                this.$router.push({path: 'sign-up', query: {type}});
            },
        },

        computed: {
            type() {
                return this.$route.query.type;
            },
            rules() {
                const please = 'অনুগ্রহ করে আপনার ';
                const {passwordLength, $enToBn} = this;

                const min = {
                    min: parseInt(passwordLength),
                    message: `দুঃখিত, পাসওয়ার্ডট কমপক্ষে ${$enToBn(passwordLength)} অক্ষরের দৈর্ঘ্যের হতে হবে।`,
                };
                const {rePassword, agreed, mobileLength, userExists} = this;

                return {
                    name: [this.requiredRule(`${please}${this.type === 'institution' ? 'প্রতিষ্ঠানের ' : ''}নাম লিখুন`), {
                        max: 190,
                        message: 'দুঃখিত নাম ১৯০ টির বেশি অক্ষর হতে পারে না',
                    }],

                    mobile: [this.requiredRule('মোবাইল নম্বর লিখুন'),
                        {validator: mobileLength},
                        {validator: userExists, trigger: 'blur'},
                    ],

                    password: [this.requiredRule('পাসওয়ার্ড লিখুন'), min],

                    rePassword: [this.requiredRule('পাসওয়ার্ডটি পুনরায় লিখুন'), {validator: rePassword}],

                    agreed: [{validator: agreed}],
                };
            },
        },

        async created() {
            this.passwordLength = await this.$setting('minPassword');
            this.termsPage = await this.$setting('terms-and-conditions-page');
            this.privacyPage = await this.$setting('privacy-policy-page');
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    .title {
        font-size: 1.3rem;
    }

    .social-login button {
        width: 100%;
        color: #fff;
    }

    .facebook {
        background: #39569c;
    }

    .google {
        background: #db4a39;
    }

    .twitter {
        background: #00acee;
    }

    .login-btn {
        width: 100%;
    }

    .agreed.is-error {
        margin-bottom: 45px;
    }

    .types {
        border-right: 0;
    }

    @media all and (min-width: $--md) {
        .wrapper {
            width: 500px;
            margin: 100px auto;
        }
    }
</style>
