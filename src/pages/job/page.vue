<template>
    <section>
        <template v-if="!job">
            <div v-loading="true">
                <br><br><br>
                <br><br><br>
            </div>

            <div v-loading="true">
                <br><br><br>
                <br><br><br>
            </div>
        </template>

        <template v-else>
            <el-card>
                <div class="title flex justify-between align-center">
                    <h2>{{job.institute}}</h2>
                    <div v-if="!authenticated || normalUser" :class="`favorite-btn${favorite?' favorite':''}`"
                         @click="makeFavorite"><i
                            class="fas fa-heart"></i></div>
                </div>
                <p class="pos"><b>{{job.position}}</b></p>
                <el-divider/>
                <template v-if="job.vacancy">
                    <h4>লোক লাগবে</h4>
                    <p class="data">{{job.vacancy | enToBn}} জন</p>
                </template>

                <h4>চাকরীর ধরন</h4>
                <p class="data">{{job.nature}}</p>
                <h4>দায়িত্ব</h4>
                <div>
                    <ul>
                        <template v-for="(item, index) in responsibilities">
                            <li v-if="item && (item !== ' ' || item !== '')" :key="index">{{item}}</li>
                        </template>
                    </ul>
                </div>

                <h4>আবেদনকারীর জন্য আবশ্যকীয়</h4>
                <div>
                    <ul>
                        <template v-for="(item, index) in additinal">
                            <li v-if="item && (item !== ' ' || item !== '')" :key="index">{{item}}</li>
                        </template>
                    </ul>
                </div>
                <h4>বেতন</h4>
                <p class="data">{{rangeValue('salary','টাকা (মাসিক)', 'আলোচনা সাপেক্ষে')}} {{job.negotiable &&
                    (job.salary_to ||
                    job.salary_from)?'(আলোচনা সাপেক্ষে)':''}}</p>
                <h4>ঠিকানা</h4>
                <p class="data">{{job.location}}</p>
            </el-card>

            <div>
                <el-card>
                    <div class="sidebar-job-info">
                        <p>
                            <span>বয়সঃ</span>
                            <span>&nbsp;&nbsp; {{rangeValue('age', 'বছর', 'উল্লেখ করা হয়নি')}}</span>
                        </p>

                        <p>
                            <span>লিঙ্গঃ</span>
                            <span>&nbsp;&nbsp; {{job.gender}}</span>
                        </p>

                        <p>
                            <span>শিক্ষাগত যোগ্যতাঃ</span>
                            <span>&nbsp;&nbsp; {{job.education}}</span>
                        </p>

                        <p>
                            <span>অভিজ্ঞতাঃ</span>
                            <span>&nbsp;&nbsp; {{rangeValue('experience', 'বছর', 'অভিজ্ঞতা না থাকলেও চলবে')}}</span>
                        </p>

                        <p>
                            <span>আবেদনের শেষ তারিখঃ</span>
                            <span>&nbsp;&nbsp; {{job.deadline | bnDate}}</span>
                        </p>
                    </div>
                </el-card>

                <el-card v-if="!authenticated || normalUser" class="mt-1 text-center">
                    <el-button v-if="!applied" type="primary" size="big"
                               :icon="applying?'el-icon-loading':'fab fa-telegram-plane'"
                               @click="apply" :disabled="applying">&nbsp;&nbsp;
                        আবেদন করুন
                    </el-button>

                    <el-button v-else type="info" size="big" icon="fas fa-check">&nbsp;&nbsp;
                        আবেদন করা হয়েছে
                    </el-button>
                </el-card>
            </div>

        </template>
    </section>
</template>

<script>
    import {elCard, elDivider, elButton} from '@/el';
    import fourZeroFour from '@/components/four-zero-four';

    export default {
        components: {elCard, elDivider, elButton, fourZeroFour},

        data() {
            return {
                job: null,
                applied: false,
                favorite: false,
                applying: false,
            };
        },

        methods: {
            async apply() {
                if (!this.$auth.user) {
                    this.$router.push('/sign-in');
                }


                const {job} = this;

                this.applying = true;

                const response = await this.$fetch('applications', {
                    method: 'POST',
                    body: {
                        id: job.id,
                    },
                }).response();

                this.applying = false;

                if (response.status !== 200) {
                    return this.$notify({
                        type: 'error',
                        message: response.text,
                    });
                }

                this.applied = true;

                return this.$notify({
                    type: 'success',
                    message: response.text,
                });
            },

            async makeFavorite() {
                if (!this.$auth.user) {
                    this.$router.push('/sign-in');
                }

                const {job} = this;

                const response = await this.$fetch('favorites', {
                    method: 'POST',
                    body: {
                        id: job.id,
                    },
                }).response();

                if (response.status === 200) {
                    this.favorite = !this.favorite;
                }
            },

            rangeValue(name, append, unmentioned) {
                const fromValue = this.job[`${name}_from`];
                const toValue = this.job[`${name}_to`];

                const enToBn = this.$enToBn;

                if (!toValue && !fromValue) {
                    return unmentioned;
                }

                if (fromValue === toValue) {
                    return `${enToBn(fromValue)} ${append}`;
                }

                if (!toValue) {
                    return `সর্বনিম্ন ${enToBn(fromValue)} ${append}`;
                }

                if (!fromValue) {
                    return `সর্বোচ্চ ${enToBn(toValue)} ${append}`;
                }

                return enToBn(`${fromValue} - ${toValue} ${append}`);
            },
        },

        computed: {

            responsibilities() {
                return this.job.responsibilities.split('\n');
            },

            additinal() {
                return this.job.additional.split('\n');
            },

            authenticated() {
                return !!this.$auth.user;
            },

            normalUser() {
                return this.authenticated && this.$auth.user.type === 1;
            },
        },

        async created() {
            const {id} = this.$route.params;
            const urls = [`job-filter/${id}`];

            if (this.normalUser) {
                urls.push(`favorite-and-applied/${id}`);
            }

            const responses = await Promise.all(urls.map(url => this.$fetch(url).response()));

            if (responses[0].status === 404) {
                return this.$router.push({
                    name: 'four-zero-four',
                });
            }

            this.job = responses[0].json();

            if (this.normalUser) {
                const favoriteAndApplied = responses[1].json();

                this.favorite = favoriteAndApplied.favorite;
                this.applied = favoriteAndApplied.applied;
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    section {
        padding: 15px;
        display: grid;
        grid-gap: 15px;
        align-items: start;

        @media all and (min-width: $--md) {
            grid-template-columns: 10fr 5fr;
        }
    }

    .title {
        color: $--color-primary;
    }

    .sidebar-job-info {
        p span:first-child {
            font-weight: bold;
        }
    }

    .pos {
        color: #000;
    }

    .data {
        text-indent: 1rem;
    }

    .favorite {
        color: #ff004c !important;
    }

    .favorite-btn {
        font-size: 2em;
        color: #989898;
        margin: 0 10px;
        cursor: pointer;
    }
</style>
