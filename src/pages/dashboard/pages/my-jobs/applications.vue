<template>
    <div id="applications" class="el-card">
        <div class="el-card__header">
            <div class="flex justify-between align-center">
                <div>
                    <el-button icon="el-icon-arrow-left" @click="$router.push({name: 'my-jobs'})"></el-button>
                </div>

                <h3 v-if="job" class="w-100 text-center ml-1">
                    <router-link :to="`/jobs/${job.id}`" class="link">
                        {{job.name}}
                        &nbsp; <i class="text-dark el-icon-link"></i>
                    </router-link>
                </h3>
            </div>
        </div>

        <div class="el-card__body">
            <div class="wrapper">
                <el-tabs v-model="tab" type="card" @tab-click="loadTab" lazy>
                    <el-tab-pane v-for="(tab, key) in tabs" :label="tab.label" :name="key" :key="key">

                        <div class="el-card application-card">
                            <div class="el-card__header">
                                <div class="flex justify-between align-center">
                                    <el-input v-model="tab.keyword" class="mr-1" @keydown.prevent.enter="load(tab)"/>
                                    <el-button type="primary" icon="fas fa-filter" @click="load(tab)">&nbsp; ফিল্টার
                                    </el-button>
                                </div>
                                <div class="text-center mt-1"><b>{{tab.total | enToBn}} টি আবেদন</b></div>
                            </div>

                            <div class="el-card__body">
                                <div v-if="tab.data.length" class="items">
                                    <router-link :to="link(item)"
                                                 v-for="(item, index) in tab.data" :key="index"
                                                 class="item flex align-center">
                                        <div class="pic">
                                            <img :src="item.photo | fileUrl" :alt="item.name">
                                        </div>

                                        <div class="ml-1 text-dark">
                                            <div>{{item.name}}</div>
                                            <div class="text-small text-light">{{item.created_at | bnDate}}</div>
                                        </div>
                                    </router-link>
                                </div>

                                <template v-else>
                                    <div class="item text-center"><b>কোনো আবেদন নেই</b></div>
                                </template>
                            </div>
                        </div>

                    </el-tab-pane>
                </el-tabs>
                <div class="resume">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {elTabs, elTabPane, elButton, elInput} from '@/el'

    export default {
        components: {elTabs, elTabPane, elButton, elInput},

        data() {
            return {
                tab: 'inbox',
                job: null,
                tabs: {
                    inbox: {
                        label: 'ইনবক্স',
                        keyword: '',
                        prevKeyword: '',
                        loading: false,
                        data: [],
                        page: 1,
                        perPage: 6,
                        total: 0
                    },
                    shortlisted: {
                        label: 'বাছাইকৃত',
                        query: {shortlist: true},
                        keyword: '',
                        prevKeyword: '',
                        loading: false,
                        data: [],
                        page: 1,
                        perPage: 6,
                        total: 0
                    }
                }
            }
        },

        methods: {
            async load(target) {
                // Show spinner
                target.loading = true

                const {keyword, page, prevKeyword, perPage} = target

                let query = `page=${page}&perPage=${perPage}`

                const keywordChanged = keyword && (keyword !== prevKeyword)

                // Include keyword in the request body if only it is changed
                if (keywordChanged) {
                    query += '&keyword=' + keyword
                }

                if (target.query) {
                    for (let key in target.query) {
                        query += `&${key}=${target.query[key]}`
                    }
                }

                const response = await this.$fetch(
                    `jobs/${this.$route.params.id}/applications?${query}`
                ).response()
                // TODO: Convert response to json by default in request api

                const paginated = response.json()

                target.total = paginated.total
                target.prevKeyword = keyword
                target.loading = false

                if (keywordChanged) {
                    target.data = paginated.data
                    return
                }

                paginated.data.forEach(item => target.data.push(item))
            },

            loadTab(tab) {
                const target = this.tabs[tab.name]

                if (target.total === 0) {
                    this.load(target)
                }
            },

            link(item) {
                return {name: 'resume', params: {userId: item.user_id}}
            }
        },

        async created() {
            // Get job name and id
            this.$fetch(`jobs/${this.$route.params.id}`)
                .response()
                .then(response => {
                    this.job = response.json()
                })

            // Load applications
            this.load(this.tabs.inbox)
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../../styles/var";

    .wrapper {
        min-height: 250px;
        display: grid;
    }

    .resume {
        padding: 10px;
    }

    .pic {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 2px 3px rgba(0, 0, 0, .2);

        img {
            width: 100%;
            object-fit: cover;
        }
    }

    .items {
        max-height: 500px;
        overflow-y: auto;
    }

    .item {
        margin: 5px 0;
        border-bottom: 1px solid #ebeef5;
        padding: 12px 5px;
        text-decoration: none;

        &:hover {
            background: #eef5ff;
        }

        &:last-child {
            border-bottom: 0;
        }
    }

    .router-link-exact-active {
        background: #eef5ff;
    }

    @media all and (min-width: $--md) {
        .wrapper {
            grid-template-columns: 1.3fr 2fr;
        }
    }
</style>

<style lang="scss">
    #applications {
        .el-tabs__header {
            margin-bottom: 0;
        }

        .application-card {
            border-top: 0;
            border-top-right-radius: 0;
        }
    }
</style>
