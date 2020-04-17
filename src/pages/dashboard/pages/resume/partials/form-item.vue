<template>
    <el-form-item :prop="`${field.name}.model`" :rules="field.rules">
        <label :for="field.name">{{field.label}}</label>
        <el-date-picker v-if="field.type === 'date'" class="date-field" format="MMM dd yyyy" value-format="yyyy-MM-dd"
                        :id="field.name"
                        v-model="field.model"></el-date-picker>
        <el-input v-else-if="field.type !== 'select'" :id="field.name" v-model="field.model" :type="field.type"
                  :disabled="field.disabled"/>
        <el-select :id="field.name" class="sl" v-else v-model="field.model"
                   :placeholder="field.label + ' নির্ধারণ করুন'" :disabled="field.disabled">
            <el-option v-for="(opt, index) in field.opt" :label="opt" :key="index" :value="opt"/>
        </el-select>
    </el-form-item>
</template>

<script>
    import {elFormItem, elInput, elOption, elSelect} from '../../../../../el'

    export default {
        props: ['field'],
        components: {elInput, elFormItem, elOption, elSelect}
    }
</script>

<style lang="scss" scoped>
    .sl {
        display: block !important;
    }

    .date-field {
        width: 100%;
        display: block;
    }
</style>
