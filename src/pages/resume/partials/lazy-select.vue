<template>
    <div class="group">
        <el-form-item :prop="`${field.name}.model`" :rules="field.rules">
            <label :for="field.name">{{field.label}}</label>
            <el-select :id="field.name" class="sl" v-model="field.model" :placeholder="field.label + ' নির্ধারণ করুন'"
                       @input="changed($event)">
                <div slot="empty" class="p-2 text-center" v-loading="field.loading"></div>
                <el-option v-for="(opt, index) in field.opt" :label="opt.name" :key="index" :value="opt.id"/>
            </el-select>
        </el-form-item>

        <el-form-item v-if="field.child" :prop="`${field.child.name}.model`" :rules="field.child.rules">
            <lazy-select :field="field.child" :value="field.child.value"/>
        </el-form-item>
    </div>
</template>

<script>
    import {elFormItem, elOption, elSelect} from '@/el'

    export default {
        name: 'lazy-select',
        props: ['field'],
        components: {elFormItem, elOption, elSelect},

        methods: {
            async changed(e) {
                this.$emit('input', e)

                const {child} = this.field

                if (!child) {
                    return
                }

                // Clear child value

                const response = await this.$fetch(`${this.$props.field.action}/${e}`).response()
                const data = response.json()

                this.$set(child, 'opt', data.map(item => ({id: item.id, name: item.name})))
            }
        },

        async created() {
            const {field} = this.$props

            if (this.$props.value) {
                return
            }

            if (!field.hasOwnProperty('top')) {
                return
            }

            const response = await this.$fetch(field.route).response()
            const data = response.json()

            this.$set(field, 'opt', data.map(item => ({id: item.id, name: item.name})))
        }
    }
</script>

<style lang="scss" scoped>
    .group {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-gap: 10px;
    }

    .sl {
        display: block !important;
    }
</style>
