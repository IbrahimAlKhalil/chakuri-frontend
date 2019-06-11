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
                <li class="el-menu-item nav-arrow-right" @click="navigate('employer')">লোক নিয়োগ দেয়ার জন্য।</li>
            </el-menu>
        </div>
        <template v-else>
            <div class="flex social-login">
                <el-button size="medium" class="facebook">
                    <i class="fab fa-facebook-f"></i>&nbsp;&nbsp;&nbsp;ফেসবুক
                </el-button>

                <el-button size="medium" class="google">
                    <i class="fab fa-google"></i>&nbsp;&nbsp;&nbsp;গুগল
                </el-button>

                <el-button size="medium" class="twitter">
                    <i class="fab fa-twitter"></i>&nbsp;&nbsp;&nbsp;টুইটার
                </el-button>
            </div>

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
                    <label for="mobile" class="d-block">মোবাইল অথবা টেলিফোন নম্বর</label>
                    <el-input id="mobile" type="number" v-model="models.mobile">
                        <i class="fas fa-mobile-alt el-input__icon" slot="prefix"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="email">
                    <label for="email" class="d-block">ইমেইল (ঐচ্ছিক)</label>
                    <el-input id="email" type="email" v-model="models.email">
                        <i class="fas fa-at el-input__icon" slot="prefix"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <label for="password" class="d-block">পাসওয়ার্ড</label>
                    <el-input id="password" type="password" v-model="models.password" autocomplete="new-password">
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
                        <router-link to="/articles/terms-of-use" target="_blank" class="link">শর্তাবলী</router-link>&nbsp;এবং
                        <router-link to="/articles/privacy-policy" target="_blank" class="link">গোপনীয়তা নীতির
                        </router-link>&nbsp;সঙ্গে
                        একমত
                    </el-checkbox>
                </el-form-item>

                <div class="text-center">
                    <el-button class="login-btn" icon="fas fa-paper-plane" type="primary"
                               nativeType="submit">&nbsp;&nbsp;সাবমিট
                    </el-button>
                </div>
            </el-form>
        </template>
    </el-card>
</template>

<script>
    import {elCard, elInput, elButton, elCheckbox, elDivider, elForm, elFormItem, elMenu} from '@/el'

    export default {
        data() {
            return {
                form: null,
                models: {
                    name: '',
                    mobile: '',
                    email: '',
                    username: '',
                    password: '',
                    rePassword: '',
                    agreed: false
                }
            }
        },

        methods: {
            async submit() {
                try {
                    const valid = await this.$refs.form.validate()
                } catch (e) {
                    console.log(e)
                }
            },

            requiredRule(suffix) {
                const please = 'অনুগ্রহ করে আপনার '

                return {
                    required: true,
                    message: `${please}${suffix}।`
                }
            },

            validateRePassword(rule, value, callback) {
                if (this.models.password === this.models.rePassword) {
                    callback()
                }

                callback(new Error('দুঃখিত, এই পাসওয়ার্ড এবং উপরের পাসওয়ার্ডটি এক নয়।'))
            },

            validateAgreed(rule, value, callback) {
                if (this.models.agreed) {
                    callback()
                }

                callback(new Error('দুঃখিত, আপনাকে আমাদের ব্যবহারের শর্তাবলী এবং গোপনীয়তা নীতির সাথে একমত হতে হবে।'))
            },

            navigate(type) {
                this.$router.push({path: 'sign-up', query: {type}})
            }
        },

        computed: {
            type() {
                return this.$route.query.type
            },
            rules() {
                const please = 'অনুগ্রহ করে আপনার '
                const min = {
                    min: 8,
                    message: `দুঃখিত, পাসওয়ার্ডট কমপক্ষে আটটি অক্ষরের দৈর্ঘ্যের হতে হবে।`
                }
                const rePassWordValidator = this.validateRePassword
                const agreedValidator = this.validateAgreed

                return {
                    name: [this.requiredRule(`${please}${this.type === 'employer' ? 'প্রতিষ্ঠানের ' : ''}নাম লিখুন`)],

                    mobile: [this.requiredRule('মোবাইল অথবা টেলিফোন নম্বর লিখুন'), {
                        min: 7,
                        max: 11,
                        message: 'দুঃখিত, মোবাইল অথবা টেলিফোন নম্বর ৭ - ১১ ডিজিটের হতে হবে।'
                    }],

                    email: [this.requiredRule('ইমেইল ঠিকানাটি লিখুন'), {
                        type: 'email',
                        message: 'দুঃখিত, ইমেইল ঠিকানাটি সঠিক নয়।'
                    }],

                    password: [this.requiredRule('পাসওয়ার্ড লিখুন'), min],

                    rePassword: [this.requiredRule('পাসওয়ার্ডটি পুনরায় লিখুন'), {validator: rePassWordValidator}],

                    agreed: [{validator: agreedValidator}]
                }
            }
        },

        components: {elCard, elInput, elButton, elCheckbox, elDivider, elForm, elFormItem, elMenu}
    }
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
