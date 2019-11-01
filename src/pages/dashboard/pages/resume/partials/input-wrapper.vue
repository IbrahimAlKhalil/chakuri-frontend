<template>
    <el-form ref="form" @submit.native.prevent="submit" :model="fields">
        <el-button class="edit-btn" v-if="!edit && editBtn !== false" icon="el-icon-edit" size="small"
                   @click="$emit('update:edit', true)" :disabled="disabled">এডিট করুন
        </el-button>

        <slot/>

        <div v-if="edit" class="flex justify-center mt-1">
            <el-button-group>
                <slot name="btn"/>
                <el-button type="danger" icon="el-icon-close" @click="$emit('update:edit', false)" plain>
                    বাতিল
                </el-button>
                <el-button type="success" icon="el-icon-check" native-type="submit" plain>
                    সংরক্ষণ
                </el-button>
            </el-button-group>
        </div>

    </el-form>
</template>

<script>
    import {elForm, elButton, elButtonGroup} from '../../../../../el'

    export default {
        props: ['edit', 'disabled', 'action', 'fields', 'edit-btn'],
        components: {elForm, elButton, elButtonGroup},
        methods: {
            async submit() {
                try {
                    await this.$refs.form.validate()
                } catch (e) {
                    return
                }


                const {action} = this.$props
                const {fields} = this.$props

                const body = {}

                for (let key in fields) {
                    const field = fields[key]
                    const {model, value, cName} = field

                    // Don't include the field in the request if it is not changed
                    if (model === value && field.type !== 'hidden') {
                        continue
                    }

                    // Include the field in the request
                    const name = cName || key

                    body[name] = model
                }

                // Request to the server
                const response = await this.$fetch(`resume/${action}`, {
                    body,
                    method: 'POST',
                }).response()

                // Show error message if status is not 200
                if (response.status !== 200) {
                    return this.$notify({
                        title: 'Error',
                        message: 'দুঃখিত কিছু ভুল হয়েছে!',
                        type: 'error'
                    })
                }


                // Request successful

                // Show success message
                this.$notify({
                    title: 'Success',
                    message: 'আপনার জীবনবৃত্তান্ত সফলভাবে আপডেট করা হয়েছে!',
                    type: 'success'
                })

                // Emit submit event
                this.$emit('submit', response)

                // Update preview data
                for (let key in fields) {
                    const field = fields[key]
                    const {model, value} = field


                    // Don't change value if model not changed
                    if (model === value) {
                        continue
                    }

                    field.value = model
                }

                this.$emit('update:edit', false)
            }
        }
    }
</script>

<style lang="scss">
    .edit-btn {
        display: block !important;
        margin-left: auto;
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>
