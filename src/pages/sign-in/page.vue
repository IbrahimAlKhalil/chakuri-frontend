<template>
    <el-card class="wrapper">
        <div slot="header" class="text-center dark-text title">
            <i class="fas fa-sign-in-alt"></i>&nbsp;&nbsp;লগ-ইন
        </div>

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

        <el-form ref="form" :model="models" :rules="rules" @submit.native.prevent="submit" status-icon>
            <el-form-item prop="username">
                <label for="username" class="d-block">ইমেইল / ফোন নম্বর</label>
                <el-input id="username" v-model="models.username">
                    <i class="el-icon-user-solid el-input__icon" slot="prefix"></i>
                </el-input>
            </el-form-item>

            <el-form-item prop="password">
                <label for="password" class="d-block">পাসওয়ার্ড</label>
                <el-input id="password" type="password" v-model="models.password">
                    <i class="el-icon-key el-input__icon" slot="prefix"></i>
                </el-input>
            </el-form-item>

            <el-form-item prop="type">
                <label for="type" class="d-block">আপনি</label>
                <el-select id="type" v-model="models.type" class="w-100">
                    <i class="el-icon-key el-input__icon" slot="prefix"></i>
                    <el-option v-for="(type, index) in types" :label="type.label" :value="type.value"
                               :key="index"/>
                </el-select>
            </el-form-item>

            <el-form-item prop="rememberMe">
                <el-checkbox v-model="models.rememberMe" class="remember-me">এই কম্পিউটারে আমাকে মনে রাখুন</el-checkbox>
            </el-form-item>

            <div class="text-center">
                <el-button
                        class="login-btn"
                        icon="fas fa-sign-in-alt"
                        type="primary"
                        nativeType="submit"
                >&nbsp;&nbsp;লগ-ইন
                </el-button>
            </div>
        </el-form>
    </el-card>
</template>

<script>
    import {elCard, elInput, elButton, elCheckbox, elDivider, elForm, elFormItem, elSelect, elOption} from '@/el'

    export default {
        data() {
            return {
                models: {
                    username: '',
                    password: '',
                    type: 'employee',
                    rememberMe: false,
                },
                types: [
                    {
                        value: 'employee',
                        label: 'চাকুরী অন্বেষণকারী'
                    },

                    {
                        value: 'employer',
                        label: 'নিয়োগদাতা'
                    }
                ],
                rules: {
                    username: [
                        {
                            required: true,
                            message: 'অনুগ্রহ করে আপনার মোবাইল নম্বর বা ইমেইল লিখুন'
                        }
                    ],

                    password: [
                        {
                            required: true,
                            message: 'অনুগ্রহ করে আপনার পাসওয়ার্ড লিখুন'
                        }
                    ],

                    type: [
                        {
                            required: true,
                            message: 'অনুগ্রহ করে আপনার পাসওয়ার্ড লিখুন'
                        }
                    ]
                }
            }
        },

        methods: {
            async submit() {
                try {
                    const valid = await this.$refs.form.validate()
                    console.log(valid)
                } catch (e) {
                    console.log(e)
                }
            }
        },

        components: {elCard, elInput, elButton, elCheckbox, elDivider, elForm, elFormItem, elSelect, elOption}
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

    @media all and (min-width: $--md) {
        .wrapper {
            width: 500px;
            margin: 100px auto;
        }
    }
</style>
