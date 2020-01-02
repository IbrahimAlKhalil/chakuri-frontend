<template>
    <div class="wrapper">
        <div class="background h-100" :style="background"></div>
        <div class="search-wrapper w-100 h-100 flex justify-center content-center flex-wrap">
            <el-card class="search w-100">
        <span class="title" slot="header">
          <i class="fas fa-search"></i>&nbsp;&nbsp; অনুসন্ধান করুন
        </span>

                <div class="input-wrapper">
                    <el-input prefix-icon="fa fa-search" placeholder="এখানে লিখুন" v-model="keyword"/>
                    <el-select placeholder="প্রতিষ্ঠান এর ধরন" v-model="category">
                        <el-option
                                v-for="(category, index) in categories"
                                :value="category.value"
                                :label="category.label"
                                :key="index"
                        />
                    </el-select>
                    <el-button type="primary" icon="el-icon-search" @click="search">অনুসন্ধান</el-button>
                </div>
            </el-card>

            <div class="stat w-100">
                <div class="item">
                    <i class="fas fa-building"></i>

                    <div class="count">
                        <div>প্রতিষ্ঠান</div>
                        <div>{{counts.institute | enToBn}} টি</div>
                    </div>
                </div>
                <div class="item">
                    <i class="fas fa-graduation-cap"></i>

                    <div class="count">
                        <div>চাকুরি</div>
                        <div>{{counts.job | enToBn}} টি</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {elButton, elCard, elInput, elOption, elSelect} from '@/el';

    export default {
        components: {elCard, elInput, elSelect, elOption, elButton},
        props: ['counts'],
        data() {
            return {
                categories: [
                    {
                        label: 'মসজিদ',
                        value: 1,
                    }, {
                        label: 'মাদ্রাসা',
                        value: 2,
                    },
                ],
                category: '',
                keyword: '',
                banner: '',
            };
        },

        methods: {
            search() {
                const {keyword, category} = this;

                this.$router.push({path: 'search', query: {keyword, category}});
            },
        },

        computed: {
            background() {
                return {
                    background: `url("${this.$fileUrl(this.banner)}") no-repeat`,
                };
            },
        },

        async created() {
            this.banner = await this.$setting('banner');
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../../styles/var";

    .wrapper {
        height: 400px;
        position: relative;
    }

    .background {
        filter: blur(1px);
        background-size: cover !important;
    }

    .search-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(225, 225, 225, 0.1);
    }

    .search {
        margin: 0 10px;

        @media all and (min-width: $--md) {
            width: 75%;
        }
    }

    .title {
        font-size: 1.3rem;
        color: $--color-text-regular;
    }

    .input-wrapper {
        display: grid;
        gap: 10px;
        grid-template-columns: none;

        @media all and (min-width: $--md) {
            grid-template-columns: 3fr 2fr 1fr;
        }
    }

    .stat {
        display: grid;
        grid-template-columns: repeat(2, minmax(100px, 150px));
        gap: 1rem;
        justify-content: center;
        margin-top: 25px;
    }

    .item {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        color: #fff;
        background: rgba(0, 0, 0, 0.4);
        padding: 10px;
        box-shadow: $--box-shadow-base;
        border-radius: $--border-radius-base;

        i {
            font-size: 2.5rem;
            text-align: center;
        }
    }

    .count {
        font-size: 1rem;
        text-shadow: 0 0;
        font-weight: bold;
        @media all and (min-width: $--md) {
            text-shadow: none;
        }
    }
</style>
