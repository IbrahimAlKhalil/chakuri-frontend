<template>
    <div v-loading="loading">
        <jobs :jobs="jobs" :show-deadline="true"/>
        <el-card v-if="total > perPage" class="mt-1">
            <el-pagination class="flex justify-center" :page-size="perPage" :current-page="page" background
                           layout="prev, pager, next"
                           :total="total"
                           hide-on-single-page
                           @current-change="paginate"
                           @next-click="paginate"
                           @prev-click="paginate">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    import {elCard, elPagination} from '@/el';
    import Jobs from '@/pages/home/components/jobs';

    export default {
        components: {Jobs, elCard, elPagination},

        data() {
            return {
                loading: false,
                jobs: [],
                page: 1,
                perPage: 6,
                total: 0
            };
        },

        methods: {
            async paginate(page) {
                this.page = page;

                this.load();
            },

            async load() {
                this.loading = true;

                const response = await this.$fetch(`${this.$route.params.type}?page=${this.page}&perPage=${this.perPage}`).response();
                const json = response.json();

                this.total = json.total;
                this.jobs = json.data;
                this.loading = false;
            }
        },

        async created() {
            this.load();
        },

        async beforeRouteUpdate(to, from, next) {
            await next();
            this.load();
        }
    };
</script>
