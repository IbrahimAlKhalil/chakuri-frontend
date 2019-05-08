<template>
    <el-container v-loading="loading"/>
</template>

<script>
    import {elContainer} from '@/el';

    export default {
        props: {
            loading: {
                type: Boolean,
                required: true
            }
        },

        components: {elContainer}
    };
</script>
