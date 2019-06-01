<template>
    <form action="#" @submit.prevent="$emit('submit')">
        <label :for="`username-${type}`" class="d-block">ইমেইল / ফোন নম্বর</label>
        <el-input :id="`username-${type}`" placeholder="অনুগ্রহ করে আপনার ইমেইল বা ফোন নম্বর লিখুন"
                  v-model="username">
            <i class="el-icon-user-solid el-input__icon" slot="prefix"></i>
        </el-input>

        <label :for="`password-${type}`" class="d-block">পাসওয়ার্ড</label>
        <el-input :id="`password-${type}`" placeholder="অনুগ্রহ করে আপনার পাসওয়ার্ড লিখুন" type="password"
                  v-model="password">
            <i class="el-icon-key el-input__icon" slot="prefix"></i>
        </el-input>

        <div class="text-center mt-1">
            <el-button class="login-btn" icon="fas fa-sign-in-alt" type="primary" nativeType="submit">
                &nbsp;&nbsp;লগ-ইন
            </el-button>
        </div>

        <div class="text-center mt-1">

        </div>

        <div>

        </div>
    </form>
</template>

<script>
    import {elCard, elInput, elButton} from '@/el';

    export default {
        props: {
            type: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                username: '',
                password: ''
            };
        },

        components: {elButton, elInput, elCard}
    };
</script>

<style lang="scss" scoped>
    @import "../../../styles/var";

    label {
        margin: 15px 0;
    }

    .login-btn {
        width: 130px;
    }
</style>
