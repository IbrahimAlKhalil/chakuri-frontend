<template>
    <article class="el-card is-always-shadow">
        <div class="el-card__body" v-loading="!page">
            <div v-if="!page" class="text-center">
                <br><br><br>
                <br><br><br><br>
            </div>

            <div v-else v-html="page.content"></div>
        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                page: null
            };
        },

        async created() {
            const response = await this.$fetch(`pages/${this.$route.params.id}`).response();

            if (response.status === 404) {
                return this.$router.replace({name: 'four-zero-four'});
            }

            this.page = response.json();
        }
    };
</script>

<style lang="scss" scoped>
    article {
        margin: 10px;
    }
</style>

