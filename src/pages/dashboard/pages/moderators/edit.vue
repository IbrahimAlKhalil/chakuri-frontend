<template>
    <el-form :model="models" :rules="rules" ref="form" action="#"
             @submit.native.prevent="submit" status-icon>
        <el-form-item prop="roles">
            <label for="roles" class="d-block">Roles</label>
            <el-select id="roles" v-model="models.roles" class="w-100" placeholder="Roles" multiple>
                <div slot="empty" class="p-1">
                </div>
                <el-option v-for="(role, index) in roles" :key="index" :value="role.id" :label="role.name"/>
            </el-select>
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
    import {elButton, elForm, elFormItem, elSelect, elOption} from '@/el';

    export default {
        props: ['roles', 'user'],

        components: {
            elButton,
            elForm,
            elFormItem,
            elSelect,
            elOption
        },

        data() {
            return {
                form: null,
                formLoading: false,
            };
        },

        methods: {
            async submit() {
                const {user} = this.$props;
                const {roles} = this.models;

                try {
                    await this.$refs.form.validate();

                    this.formLoading = true;

                    const response = await this.$fetch(`dashboard/moderators/${user.id}`, {
                        method: 'POST',
                        body: {roles}
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

            rolesValidator(rule, value, callback) {
                if (!value.length) {
                    return callback('Please select at least one role');
                }

                callback();
            }
        },

        computed: {
            rules() {
                const {rolesValidator} = this;

                return {
                    roles: [
                        {validator: rolesValidator}
                    ],
                };
            },

            models() {
                return {
                    roles: []
                };
            }
        },
    };
</script>
