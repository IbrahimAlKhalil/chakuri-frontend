<template>
    <div class="el-card">
        <div class="el-card__header">
            <div v-if="current" class="flex justify-between align-center">
                <div>
                    <el-button icon="el-icon-arrow-left" @click="current = null"></el-button>
                </div>

                <h3 class="w-100 text-center">
                    <router-link :to="`/jobs/${current.id}`" class="link">
                        {{current.name}} &nbsp; <i class="text-dark el-icon-link"></i>
                    </router-link>
                </h3>
            </div>
            <h3 v-else>আপনার বিজ্ঞাপন সমূহ</h3>
        </div>

        <div class="el-card__body">
            <div v-if="current" class="current-job" v-loading="loading">
                <el-tabs v-model="tab" type="card">
                    <el-tab-pane label="ইনবক্স" name="inbox">
                        Hola
                    </el-tab-pane>
                    <el-tab-pane label="বাছাইকৃত" name="shortlisted">
                        Hola
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div v-else class="jobs-wrapper">
                <div class="job" v-for="(job, index) in jobs" :key="index" @click="current = job">
                    <div class="w-100">
                        <h4 class="title">{{job.name}}</h4>
                        <div>
                            <b>পদঃ</b> {{job.position}}
                        </div>
                        <div class="mt-1">
                            <b>ঠিকানাঃ</b> {{job.village}}, {{job.thana}}, {{job.district}}
                        </div>
                        <div class="mt-1">
                            <b>তৈরির তারিখঃ</b> {{formatDate(job.created_at)}}
                        </div>
                        <div class="mt-1">
                            <b>মেয়াদ শেষ হওয়ার তারিখঃ</b> {{formatDate(job.deadline)}}
                        </div>
                    </div>
                    <div class="applicant-count">
                        <span style="color: green">{{job.applicants}}</span> জন আবেদন করেছেন
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {enToBn} from '@/modules/en-to-bn'
    import {elButton, elTabs, elTabPane} from '@/el'

    export default {
        components: {elButton, elTabPane, elTabs},
        data() {
            return {
                jobs: [],
                current: null,
                loading: false,
                tab: 'inbox'
            }
        },

        methods: {
            formatDate(date) {
                const d = new Date(date)

                return enToBn(`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`)
            }
        },

        async created() {
            const response = await this.$fetch('jobs').response()

            this.jobs = response.json()
        }
    }
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
