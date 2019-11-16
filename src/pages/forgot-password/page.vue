<template>
    <div class="el-card wrapper">
        <div class="el-card__header text-center dark-text title">
            <i class="fas fa-cog"></i>&nbsp;&nbsp;পাসওয়ার্ড পরিবর্তন
        </div>

        <div class="el-card__body">
            <el-form ref="form" :model="models" :rules="rules" @submit.native.prevent="submit" status-icon>
                <el-form-item prop="mobile">
                    <label for="mobile" class="d-block">মোবাইল নম্বর</label>
                    <el-input id="mobile" v-model="models.mobile">
                        <i class="el-icon-user-solid el-input__icon" slot="prefix"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="type">
                    <label for="type" class="d-block">আপনি</label>
                    <el-select id="type" v-model="models.type" class="w-100" placeholder="">
                        <i class="el-icon-key el-input__icon" slot="prefix"></i>
                        <el-option v-for="(type, index) in types" :label="type.label" :value="type.value" :key="index"/>
                    </el-select>
                </el-form-item>

                <div class="text-center mt-2">
                    <el-button
                            class="login-btn"
                            :icon="!loading? 'el-icon-s-promotion' : 'el-icon-loading'"
                            type="primary"
                            nativeType="submit"
                            :disabled="loading"
                    >&nbsp;&nbsp;সাবমিট
                    </el-button>
                </div>
            </el-form>
        </div>
    </div>

</template>

<script>
    import {elSelect, elOption} from '@/el';
    import config from '@/config';
    import mixin from './mixin';

    export default {
        mixins: [mixin],

        components: {elSelect, elOption},

        data() {
            const {requiredRule} = this;


            return {
                types: [
                    {
                        value: 1,
                        label: 'চাকুরী অনুসন্ধানকারী'
                    },

                    {
                        value: 2,
                        label: 'নিয়োগদাতা'
                    }
                ],
                models: {
                    mobile: '',
                    type: 1
                },

                rules: {
                    mobile: [requiredRule('মোবাইল নম্বর বা ইমেইল লিখুন।')]
                }
            };
        },

        methods: {
            async submit() {
                try {
                    await this.$refs.form.validate();
                } catch (e) {
                    return;
                }

                // Show spinner
                this.loading = true;

                const {mobile, type} = this.models;

                const response = await this.$fetch('forgot-password', {
                    method: 'POST',
                    body: {mobile, type}
                }).response();


                // Hide spinner
                this.loading = false;

                if (response.status === 422) {
                    return this.$notify({
                        message: 'দুঃখিত কোনো একাউন্ট পাওয়া যায়নি',
                        type: 'error'
                    });
                }

                sessionStorage.setItem(config.prpk, JSON.stringify({
                    mobile: this.models.mobile,
                    type: this.models.type,
                    key: response.json().key
                }));

                this.$router.push({
                    path: '/password-reset'
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    .title {
        font-size: 1.3rem;
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
