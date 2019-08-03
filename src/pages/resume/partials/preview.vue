<template>
    <div>
        <div class="prop">
            <p>{{field.label}}</p>
            <p v-if="field.type !== 'lazy'">{{field.value || '--'}}</p>
            <p v-else>{{lazyValue}}</p>
        </div>

        <preview v-if="child" :field="child"/>
    </div>
</template>

<script>
    export default {
        name: 'preview',
        props: ['field'],
        computed: {
            child() {
                const {child} = this.$props.field

                if (!child) {
                    return null
                }

                return child[Object.keys(child)[0]]
            },

            lazyValue() {
                const {field} = this.$props

                if (Array.isArray(field.opt)) {
                    let value

                    field.opt.some(item => {
                        const ok = item.id === field.value

                        if (ok) value = item.name

                        return ok
                    })

                    return value
                }

                return '--'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .prop {
        font-size: 1rem;
        text-shadow: 0 0;
        text-align: center;
        margin-bottom: 10px;

        :first-child {
            color: #4e4e4e;
            margin-bottom: 5px;
        }

        :last-child {
            color: #000;
            margin-top: 5px;
        }
    }
</style>
