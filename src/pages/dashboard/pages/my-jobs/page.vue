<template>
    <div class="el-card">
        <div class="el-card__header">
            <h3 class="ml-1">আপনার বিজ্ঞাপন সমূহ</h3>
        </div>

        <div class="el-card__body">
            <div class="jobs-wrapper" v-loading="loading">
                <!--TODO: Use fade transition on all dynamic list-->
                <transition-group name="fade">
                    <router-link v-for="(item, index) in paginated" v-if="item" :to="jobLink(item.id)"
                                 class="job" :key="index+'k'">
                        <div v-if="item.approved" class="approved" title="Approved">
                        </div>

                        <div class="w-100">
                            <h4 class="title">{{item.position}}</h4>
                            <div class="mt-1">
                                <b>ঠিকানাঃ</b> {{item.village}}, {{item.thana}}, {{item.district}}
                            </div>
                            <div class="mt-1">
                                <b>তৈরির তারিখঃ</b> {{item.created_at | bnDate}}
                            </div>
                            <div class="mt-1">
                                <b>মেয়াদ শেষ হওয়ার তারিখঃ</b> {{item.deadline | bnDate}}
                            </div>
                        </div>
                        <div v-if="item.approved" class="applicant-count">
                            <span style="color: green">{{(item.applicants || 0) | enToBn}}</span> জন আবেদন করেছেন
                        </div>
                    </router-link>
                </transition-group>

                <el-pagination class="flex mt-1 justify-center" :page-size="perPage" :current-page="page"
                               background
                               layout="prev, pager, next"
                               :total="total"
                               hide-on-single-page
                               @current-change="paginate"
                               @next-click="paginate"
                               @prev-click="paginate">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {elButton, elTabs, elTabPane, elPagination} from '@/el';

    export default {
        components: {elButton, elTabPane, elTabs, elPagination},
        data() {
            return {
                jobs: [],
                loading: false,
                page: 1,
                perPage: 4,
                total: 0,
                pages: []
            };
        },

        methods: {

            async paginate(page) {
                this.page = page;

                if (!this.pages.includes(page)) {
                    this.pages.push(page);
                    this.load();
                }
            },

            async load() {
                const {page, perPage} = this;

                // Show spinner
                this.loading = true;

                // Get items
                const response = await this.$fetch(`jobs?page=${page}&perPage=${perPage}`).response();

                // Convert to json
                const paginated = response.json();

                // Show and store the items
                let index = page * perPage - perPage;
                const end = page * perPage;

                for (let c = 0; index < end; index++, c++) {
                    this.$set(this.jobs, index, paginated.data[c]);
                }

                // Hide spinner
                this.loading = false;

                // Update total items count
                this.total = paginated.total;
            },

            jobLink(id) {
                return `jobs/${id}`;
            }
        },

        computed: {
            paginated() {
                return this.$paginate(this.jobs, this.page, this.perPage);
            }
        },

        async created() {
            // TODO: Optimize performance by loading the info which is enough for showing list
            await this.load();
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../../styles/var";

    .job {
        padding: 25px 15px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ebeef5;
        border-radius: 8px;
        margin: 15px 0;
        background: #f4f4f4;
        text-decoration: none;
        color: #303133;
        cursor: pointer;
        position: relative;
        overflow: hidden;

        &:last-child {
            border-bottom: 0;
        }

        &:hover {
            background: #eef5ff;

            .title {
                color: $--color-primary;
            }
        }
    }

    .applicant-count {
        text-align: center;
        font-weight: bold;
    }

    .special {
        background: #fffad2;
    }

    .approved {
        background: #6bd577;
        position: absolute;
        left: -5px;
        top: -17px;
        padding: 28px 15px;
        transform: rotate(45deg);
        border-radius: 5px;
    }

    @media all and (max-width: $--md) {
        .job {
            flex-wrap: wrap;
        }

        .applicant-count {
            width: 100%;
            margin-top: 30px;
        }
    }
</style>
