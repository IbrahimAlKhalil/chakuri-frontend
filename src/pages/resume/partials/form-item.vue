<template>
    <el-form-item :prop="index">
        <label :for="index">{{field.label}}</label>
        <el-input v-if="field.type !== 'select'" :id="index" v-model="input" :type="field.type"
                  @input="$emit('input', $event)"/>
        <el-select class="sl" v-else v-model="input" @input="$emit('input', $event)" :placeholder="field.label + ' নির্ধারণ করুন'">
            <el-option v-for="(opt, index) in field.opt" :label="opt" :key="index" :value="opt"/>
        </el-select>
    </el-form-item>
</template>

<script>
    import {elFormItem, elInput, elOption, elSelect} from '@/el'

    export default {
        props: ['field', 'index', 'value'],
        data() {
            const {value} = this.$props

            return {
                input: value
            }
        },
        components: {elInput, elFormItem, elOption, elSelect}
    }
</script>

<style lang="scss" scoped>
    .sl {
        display: block !important;
    }
</style>
