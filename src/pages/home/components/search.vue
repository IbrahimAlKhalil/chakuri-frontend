<template>
    <div class="wrapper">
        <div class="background h-100 rellax"></div>
        <div class="search-wrapper w-100 h-100 flex justify-center content-center flex-wrap">
            <el-card class="search w-100">
                <span class="title" slot="header"><i class="fa fa-book-reader"></i>&nbsp;&nbsp; অনুসন্ধান করুন</span>

                <div class="input-wrapper">
                    <el-input prefix-icon="fa fa-search" placeholder="এখানে লিখুন" v-model="search"/>
                    <el-select placeholder="প্রতিষ্ঠান এর ধরন নির্ধারণ করুন" value="" v-model="selectedOrganizations"
                               multiple>
                        <el-option v-for="(organization, index) in organizations" :value="organization"
                                   :label="organization"
                                   :key="index"/>
                    </el-select>
                    <el-button type="primary" icon="el-icon-search">অনুসন্ধান</el-button>
                </div>

                <div class="stat">
                    এই মুহুর্তে মোট ৬৫৪ টি বিজ্ঞপ্তি আছে।
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                organizations: ['মসজিদ', 'মাদ্রাসা', 'টিউশনি'],
                selectedOrganizations: [],
                search: ''
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/var";

    .wrapper {
        height: 400px;
        position: relative;
    }

    .background {
        background: url("../../../assets/images/sky.jpg") no-repeat;
        background-size: cover;
        filter: blur(1px);
    }

    .search-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(225, 225, 225, .7);
    }

    .search {
        margin: 0 10px;

        @media all and (min-width: $--md) {
            width: 70%;
        }
    }

    .title {
        font-size: 1.3rem;
        color: $--color-text-regular;
    }

    .input-wrapper {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: none;

        @media all and (min-width: $--md) {
            grid-template-columns: 3fr 2fr 1fr;
        }
    }

    .stat {
        padding: 20px;
    }
</style>
