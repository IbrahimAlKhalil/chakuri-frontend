<template>
    <el-card class="wrapper">
        <div slot="header" class="text-center dark-text title">
            <i class="fas fa-sign-in-alt"></i>&nbsp;&nbsp;লগ-ইন
        </div>

        <!--<template>
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
        </template>-->

        <el-form ref="form" :model="models" :rules="rules" @submit.native.prevent="submit">
            <el-form-item prop="username">
                <label for="username" class="d-block">ইমেইল / ফোন নম্বর</label>
                <el-input id="username" v-model="models.username">
                    <i class="el-icon-user-solid el-input__icon" slot="prefix"></i>
                </el-input>
            </el-form-item>

            <el-form-item prop="password">
                <label for="password" class="d-block">পাসওয়ার্ড</label>
                <el-input id="password" type="password" v-model="models.password" show-password>
                    <i class="el-icon-key el-input__icon" slot="prefix"></i>
                </el-input>
            </el-form-item>

            <el-form-item prop="type">
                <label for="type" class="d-block">আপনি</label>
                <el-select id="type" v-model="models.type" class="w-100">
                    <i class="fa fa-user el-input__icon" slot="prefix"></i>
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
                        :icon="!formLoading? 'el-icon-s-promotion' : 'el-icon-loading'"
                        type="primary"
                        nativeType="submit"
                        :disabled="formLoading"
                >&nbsp;&nbsp;লগ-ইন
                </el-button>
            </div>


            <div class="mt-2 text-center">
                <router-link class="link"
                             :to="{path: '/forgot-password', query: $route.query}">পাসওয়ার্ড
                    ভুলে গেছেন?
                </router-link>
            </div>
        </el-form>
    </el-card>
</template>

<script>
    import {elCard, elInput, elButton, elCheckbox, elDivider, elForm, elFormItem, elSelect, elOption} from '@/el';
    import {saveToken} from '@modules/tokenizer';

    export default {
        components: {elCard, elInput, elButton, elCheckbox, elDivider, elForm, elFormItem, elSelect, elOption},

        data() {
            return {
                formLoading: false,
                models: {
                    username: '',
                    password: '',
                    type: 1,
                    rememberMe: false,
                },
                types: [
                    {
                        value: 1,
                        label: 'চাকুরী অনুসন্ধানকারী',
                    },

                    {
                        value: 2,
                        label: 'নিয়োগদাতা',
                    },
                ],
                rules: {
                    username: [
                        {
                            required: true,
                            message: 'অনুগ্রহ করে আপনার মোবাইল নম্বর বা ইমেইল লিখুন।',
                        },
                    ],

                    password: [
                        {
                            required: true,
                            message: 'অনুগ্রহ করে আপনার পাসওয়ার্ড লিখুন।',
                        },
                    ],
                },
            };
        },

        methods: {
            async submit() {
                try {
                    await this.$refs.form.validate();

                    this.formLoading = true;


                    const response = await this.$fetch('authenticate', {
                        auth: false,
                        method: 'POST',
                        body: {
                            username: this.models.username,
                            password: this.models.password,
                            user_type_id: this.models.type,
                            grant_type: 'password',
                            client_id: 1,
                        },
                    }).response();

                    if (response.status === 200) {
                        // Redirect to homepage

                        const jwt = response.json();

                        saveToken(jwt.access_token, this.models.rememberMe);

                        await this.$store.dispatch('auth/signIn');

                        return this.$router.push('/');
                    }

                    this.$notify({
                        message: 'দুঃখিত আপনার দেয়া তথ্য সঠিক নয়',
                        type: 'warning',
                    });
                } catch (e) {
                }

                this.formLoading = false;
            },
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

    @media all and (min-width: $--md) {
        .wrapper {
            width: 500px;
            margin: 100px auto;
        }
    }
</style>
