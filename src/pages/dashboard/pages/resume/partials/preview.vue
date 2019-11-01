<template>
    <div>
        <div class="prop">
            <p>{{field.label}}</p>
            <p>{{value}}</p>
        </div>

        <preview v-if="field.child" :field="field.child"/>
    </div>
</template>

<script>

    export default {
        name: 'preview',
        props: ['field'],
        computed: {
            value() {
                const {field} = this.$props;

                if (!field.value) {
                    return '--';
                }

                if (field.type === 'lazy' && Array.isArray(field.opt)) {
                    let value;

                    field.opt.some(item => {
                        const ok = item.id === field.value;

                        if (ok) value = item.name;

                        return ok;
                    });

                    return value;
                }

                if (field.type === 'date') {
                    const d = new Date(field.value);

                    return this.$bnDate(d);
                }

                return field.value;
            }
        }
    };
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
