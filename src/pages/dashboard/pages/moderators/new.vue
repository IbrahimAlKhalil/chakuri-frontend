<template>
    <el-form :model="models" :rules="rules" ref="form" action="#"
             @submit.native.prevent="submit" status-icon>
        <el-form-item prop="name">
            <label for="name" class="d-block">Name</label>
            <el-input id="name" v-model="models.name">
                <i class="el-icon-user-solid el-input__icon"
                   slot="prefix"></i>
            </el-input>
        </el-form-item>

        <el-form-item prop="mobile">
            <label for="mobile" class="d-block">Mobile</label>
            <el-input id="mobile" v-model="models.mobile">
                <i class="fas fa-mobile-alt el-input__icon" slot="prefix"></i>
            </el-input>
        </el-form-item>

        <el-form-item prop="roles">
            <label for="roles" class="d-block">Roles</label>
            <el-select id="roles" v-model="models.roles" class="w-100" placeholder="Roles" multiple>
                <div slot="empty" class="p-1">
                </div>
                <el-option v-for="(role, index) in roles" :key="index" :value="role.id" :label="role.name"/>
            </el-select>
        </el-form-item>

        <el-form-item prop="password">
            <label for="password" class="d-block">Password</label>
            <el-input id="password" type="password" v-model="models.password" autocomplete="new-password">
                <i class="el-icon-key el-input__icon" slot="prefix"></i>
            </el-input>
        </el-form-item>

        <el-form-item prop="rePassword">
            <label for="rePassword" class="d-block">Confirm Password</label>
            <el-input id="rePassword" type="password" v-model="models.rePassword">
                <i class="el-icon-key el-input__icon" slot="prefix"></i>
            </el-input>
        </el-form-item>

        <div class="text-center">
            <el-button class="login-btn" :icon="!formLoading? 'el-icon-s-promotion' : 'el-icon-loading'"
                       type="primary"
                       nativeType="submit" :disabled="formLoading">&nbsp;&nbsp;Submit
            </el-button>
        </div>
    </el-form>
</template>

<script>
    import {elInput, elButton, elForm, elFormItem, elSelect, elOption} from '@/el';

    export default {
        props: ['roles'],

        components: {
            elButton,
            elInput,
            elForm,
            elFormItem,
            elSelect,
            elOption
        },

        data() {
            return {
                form: null,
                formLoading: false,
                models: {
                    name: '',
                    mobile: '',
                    password: '',
                    rePassword: '',
                    roles: []
                }
            };
        },

        methods: {
            async submit() {
                try {
                    await this.$refs.form.validate();

                    this.formLoading = true;

                    const response = await this.$fetch('dashboard/moderators', {
                        method: 'POST',
                        body: {
                            name: this.models.name,
                            mobile: this.models.mobile,
                            roles: this.models.roles,
                            password: this.models.password
                        }
                    }).response();

                    this.formLoading = false;
                    if (response.status === 200) {
                        // Registration successful

                        this.$emit('created', response.json());

                        // Notify
                        this.$notify({
                            message: 'Moderator is created successfully, and a verification code is sent to this number',
                            type: 'success'
                        });
                    }
                } catch (e) {
                }
            },

            requiredRule(suffix) {
                const please = 'Please ';

                return {
                    required: true,
                    message: `${please}${suffix}`
                };
            },

            rePassword(rule, value, callback) {
                if (this.models.password === this.models.rePassword) {
                    return callback();
                }

                callback('Sorry, passwords didn\'t match!');
            },

            async userExists(rule, value, callback) {
                const response = await this.$fetch('mobile-exists', {
                    method: 'POST',
                    body: {
                        user_type_id: 3,
                        mobile: this.models.mobile
                    }
                }).response();

                if (!!response.json()) {
                    return callback('Sorry, this number is already in use');
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


                callback('Sorry, number must be at least 11 characters');
            },

            rolesValidator(rule, value, callback) {
                if (!value.length) {
                    return callback('Please select at least one role');
                }

                callback();
            }
        },

        computed: {
            rules() {
                const min = {
                    min: 8,
                    message: `Sorry, password must be at least 8 characters long`
                };
                const {rePassword, mobileLength, userExists, rolesValidator} = this;

                return {
                    name: [this.requiredRule('enter user\'s name'), {
                        max: 190,
                        message: 'Sorry, name can\' be more than 190 characters'
                    }],

                    mobile: [this.requiredRule('enter mobile number'),
                        {validator: mobileLength},
                        {validator: userExists, trigger: 'blur'}
                    ],

                    roles: [
                        {validator: rolesValidator}
                    ],

                    password: [this.requiredRule('enter password'), min],

                    rePassword: [this.requiredRule('enter the password again'), {validator: rePassword}],
                };
            }
        },
    };
</script>
