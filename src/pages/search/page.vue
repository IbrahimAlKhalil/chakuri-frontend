<template>
    <section id="search-page">
        <transition name="jump">
            <form v-show="showFilter" class="filters" @submit.prevent="filter">
                <el-card v-loading="filterLoading">
                    <div slot="header" class="text-center">
                        <i class="fas fa-filter"></i>
                        &nbsp;
                        <b>ফিল্টার</b>
                    </div>

                    <label class="input">
                        <span class="label">কীওয়ার্ড</span>
                        <el-input prefix-icon="el-icon-search" v-model="keyword"></el-input>
                    </label>

                    <div class="input">
                        <div class="label">প্রতিষ্ঠানের ধরন</div>
                        <div class="flex justify-around">
                            <el-checkbox v-for="(item, index) in filters.categories.fields" :key="index"
                                         v-model="item.model"
                                         :label="item.label"></el-checkbox>
                        </div>

                        <div class="flex justify-around mt-1">
                            <el-checkbox v-for="(item, index) in filters.types.fields" :key="index"
                                         v-model="item.model"
                                         :label="item.label"></el-checkbox>
                        </div>
                    </div>

                    <div class="input">
                        <div class="label">পদ</div>

                        <el-select v-model="filters.position.value" placeholder="" class="w-100"
                                   :value="filters.position.value">
                            <template slot="empty"></template>
                            <el-option v-for="(option, index) in filters.position.options" :value="option.id"
                                       :label="option.name" :key="index"/>
                        </el-select>
                    </div>

                    <div class="input">
                        <div class="label">ঠিকানা</div>

                        <el-select v-model="filters.district.value" placeholder="জেলা" class="w-100"
                                   @change="loadThanas">
                            <template slot="empty"></template>
                            <el-option v-for="(option, index) in filters.district.options" :value="option.id"
                                       :label="option.name" :key="index"/>
                        </el-select>

                        <el-select v-model="filters.thana.value" placeholder="থানা" class="w-100 mt-1"
                                   :disabled="!filters.district.value">
                            <div slot="empty" v-loading="true">
                                <br><br><br>
                            </div>
                            <el-option v-for="(option, index) in filters.thana.options" :value="option.id"
                                       :label="option.name" :key="index"/>
                        </el-select>
                    </div>

                    <div class="input">
                        <label class="label" for="salary_from">বেতন</label>
                        <div class="flex">
                            <el-input id="salary_from" v-model="filters.salary_from.value" type="number"/>
                            <el-input v-model="filters.salary_to.value" type="number"/>
                        </div>
                    </div>

                    <div class="text-center">
                        <el-button icon="fas fa-arrow-right" type="primary" native-type="submit">&nbsp;&nbsp;সাবমিট
                        </el-button>
                    </div>
                </el-card>
            </form>
        </transition>

        <transition name="jump">
            <div v-show="!filterAppearance" class="jobs" v-loading="jobLoading">

                <jobs :jobs="jobs" :keyword="highlight"/>

                <empty :empty="!jobs.length" :card="true"></empty>

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
        </transition>

        <el-button class="filter-btn" :icon="showFilter?'fas fa-times':'fas fa-filter'"
                   :type="showFilter?'danger':'primary'"
                   @click="filterAppearance = !filterAppearance"
                   circle>
        </el-button>
    </section>
</template>

<script>
    import {
        elButton,
        elCard,
        elCheckbox,
        elDivider,
        elInput,
        elOption,
        elSelect,
        elPagination
    } from '@/el';
    import jobs from '@/components/jobs';
    import Empty from '@/components/empty';

    export default {
        components: {
            Empty,
            elCard,
            elInput,
            elCheckbox,
            elDivider,
            elSelect,
            elOption,
            elButton,
            jobs,
            elPagination
        },
        data() {
            return {
                filters: {
                    categories: {
                        type: 'check',
                        fields: [
                            {
                                label: 'মসজিদ',
                                value: 1,
                                model: false
                            },

                            {
                                label: 'মাদ্রাসা',
                                value: 2,
                                model: false
                            }
                        ]
                    },
                    types: {
                        type: 'check',
                        fields: [
                            {
                                label: 'সরকারি',
                                value: 1,
                                model: false
                            },

                            {
                                label: 'বেসরকারি',
                                value: 2,
                                model: false
                            }
                        ]
                    },
                    district: {
                        type: 'select',
                        value: null,
                        options: []
                    },
                    thana: {
                        type: 'select',
                        value: null,
                        options: []
                    },
                    salary_from: {
                        type: 'text',
                        value: 0
                    },
                    salary_to: {
                        type: 'text',
                        value: null
                    },
                    position: {
                        type: 'select',
                        value: null,
                        options: []
                    }
                },
                page: 1,
                perPage: 10,
                total: 0,
                keyword: '',
                jobs: [],
                highlight: [],
                filterLoading: true,
                jobLoading: true,
                filterAppearance: false
            };
        },

        computed: {
            showFilter() {
                if (!this.$store.state.isMobile) {
                    return true;
                }

                return this.filterAppearance;
            }
        },

        methods: {
            async filter() {
                this.jobLoading = true;

                if (this.$store.state.isMobile) {
                    this.filterAppearance = false;
                }

                const body = new FormData;

                body.append('page', this.page);
                body.append('perPage', this.perPage);
                body.append('keyword', this.keyword);

                const {filters} = this;

                for (const key in filters) {
                    const filter = filters[key];

                    switch (filter.type) {
                        case 'check':
                            let count = 0;
                            filter.fields.forEach(field => {
                                if (!!field.model) {
                                    body.append(`${key}[${count++}]`, field.value);
                                }
                            });
                            break;
                        default:
                            filter.value && body.append(key, filter.value);
                    }
                }

                const response = await this.$fetch('job-filter/filter', {
                    method: 'POST',
                    body
                }).response();

                const json = response.json();

                this.jobs = json.data;
                this.total = json.total;

                if (this.keyword) {
                    this.highlight = this.keyword.trim().split(' ');
                }

                this.jobLoading = false;
            },

            async loadThanas() {
                this.filters.thana.value = null;

                const response = await this.$fetch(`thanas/by-district/${this.filters.district.value}`).response();

                this.filters.thana.options = response.json();
            },

            async paginate(page) {
                this.page = page;

                this.filter();
            },

            setIfExists(filters, formatter) {
                const {query} = this.$route;

                filters.forEach(filter => {
                    if (query.hasOwnProperty(filter)) {
                        this.filters[filter].value = formatter(query[filter]);
                    }
                });
            }
        },

        async created() {
            const {keyword, category, district, thana} = this.$route.query;

            let selected;

            this.filters.categories.fields.some(item => {
                if (item.value === parseInt(category)) {
                    selected = item;
                }
            });

            if (selected) {
                selected.model = true;
            }

            if (keyword) {
                this.keyword = keyword;
            }

            const toBeLoaded = ['districts', 'positions'];

            if (thana) {
                toBeLoaded.push(`thanas/by-district/${district}`);
            }

            const responses = await Promise.all(toBeLoaded.map(item => this.$fetch(item).response()));

            this.filters.district.options = responses[0].json();
            this.filters.position.options = responses[1].json();

            if (thana) {
                this.filters.thana.options = responses[2].json();
            }

            this.setIfExists(['position', 'district', 'thana'], parseInt);

            this.filterLoading = false;

            this.filter();
        }
    };
</script>

<style lang="scss">
    @import "../../styles/var";

    #search-page {
        margin: 15px;
        display: grid;

        grid-gap: 0 20px;

        .input {
            display: block;
            margin-bottom: 30px;
        }

        .label {
            text-shadow: 0 0;
            margin-bottom: 12px;
            display: block;
        }

        .filter-btn {
            position: fixed;
            bottom: 20px;
            left: 20px;
            height: 55px;
            width: 55px;
            padding: 18px;
            font-size: 1.2em;
        }

        .filters {
            position: sticky;
            bottom: 15px;
            align-self: end;
        }

        @media all and (min-width: $--md) {
            margin: 20px 30px;
            grid-template-columns: 2fr 7fr;

            .filter-btn {
                display: none;
            }
        }
    }
</style>

