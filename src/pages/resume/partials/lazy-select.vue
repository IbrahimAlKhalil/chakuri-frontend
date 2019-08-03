<template>
    <div class="group">
        <el-form-item :prop="index">
            <label :for="index">{{field.label}}</label>
            <el-select class="sl" v-model="input" :placeholder="field.label + ' নির্ধারণ করুন'"
                       @input="changed($event)">
                <div slot="empty" class="p-2 text-center" v-loading="field.loading"></div>
                <el-option v-for="(opt, index) in field.opt" :label="opt.name" :key="index" :value="opt.id"/>
            </el-select>
        </el-form-item>

        <el-form-item v-if="child" :prop="prop">
            <lazy-select :field="child" :index="prop" v-model="models[prop]" :models="models" :value="child.value"/>
        </el-form-item>
    </div>
</template>

<script>
    import {elFormItem, elOption, elSelect} from '@/el'

    export default {
        name: 'lazy-select',
        props: ['field', 'index', 'models', 'value'],
        components: {elFormItem, elOption, elSelect},
        data() {
            const {value} = this.$props

            return {
                input: value
            }
        },
        computed: {
            child() {
                const {child} = this.$props.field

                if (!child) {
                    return null
                }

                return child[this.prop]
            },

            prop() {
                return Object.keys(this.$props.field.child)[0]
            }
        },

        methods: {
            async changed(e) {
                this.$emit('input', e)

                const {child} = this

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
