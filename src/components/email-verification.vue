<template>
    <div class="el-card is-always-shadow">
        <div class="el-card__body text-center">
            <div class="msg flex align-center justify-center">
                <template v-if="loading">
                    <div>ভেরিফাই করা হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন</div>
                    <div class="ml-1" v-loading="loading"></div>
                </template>

                <div v-else-if="succeed">
                    <div>
                        <i class="fa fa-check-circle green"/>
                    </div>
                    <div class="mt-1">
                        আপনার ইমেইলটি সফলভাবে ভেরিফিকেশন করা হয়েছে
                    </div>
                </div>
                <div v-else>
                    <div>
                        <i class="fa fa-times-circle red"/>
                    </div>
                    <div class="mt-1">
                        দুঃখিত, লিঙ্কটির মেয়াদোত্তীর্ণ হয়ে গেছে, অনুগ্রহ করে
                        আবার
                        চেষ্টা করুন
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: true,
                succeed: true,
            };
        },

        async created() {
            const response = await this.$fetch(`email-verification/${this.$route.params.token}`).response();
            this.succeed = response.status === 200;
            this.loading = false;
        },
    };
</script>

<style lang="scss" scoped>
    @import '../styles/var.scss';

    .msg {
        font-size: 1.3em;
    }

    .el-card {
        margin: 1em;
        padding-bottom: 3em;
        padding-top: 3em;
    }

    .red {
        color: $--color-danger;
    }

    .green {
        color: $--color-success;
    }

    .fa {
        font-size: 3em;
    }
</style>

