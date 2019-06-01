<template>
    <section>
        <el-tabs v-model="tabName" class="tabs" type="border-card">
            <el-tab-pane name="job-seeker">
                <span slot="label"><i class="fas fa-user"></i>&nbsp; চাকুরি গ্রহীতা</span>
                <login-form type="job-seeker" @submit="submit"></login-form>
            </el-tab-pane>
            <el-tab-pane name="employer">
                <span slot="label"><i class="fas fa-building"></i>&nbsp; প্রতিষ্ঠান</span>
                <login-form type="employer"></login-form>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
    import loginForm from './components/form';
    import {elTabs, elTabPane} from '@/el';

    export default {
        data() {
            return {
                tabName: 'job-seeker'
            };
        },

        methods: {
            submit() {
                console.log('Hello');
            }
        },

        components: {elTabs, elTabPane, loginForm}
    };
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    .tabs {
        height: auto;
        margin: 10px;
    }

    @media all and (min-width: $--md) {
        .tabs {
            width: 500px;
            margin: 100px auto;
        }
    }
</style>
