<template>
    <div class="wrapper">
        <div class="background h-100"></div>
        <div class="search-wrapper w-100 h-100 flex justify-center content-center flex-wrap">
            <el-card class="search w-100">
                <span class="title" slot="header"><i class="fa fa-book-reader"></i>&nbsp;&nbsp; অনুসন্ধান করুন</span>

                <div class="input-wrapper">
                    <el-input prefix-icon="fa fa-search" placeholder="এখানে লিখুন" v-model="search"/>
                    <el-select placeholder="প্রতিষ্ঠান এর ধরন নির্ধারণ করুন" v-model="selectedOrganizations"
                               multiple>
                        <el-option v-for="(organization, index) in organizations" :value="organization"
                                   :label="organization"
                                   :key="index"/>
                    </el-select>
                    <el-button type="primary" icon="el-icon-search">অনুসন্ধান</el-button>
                </div>
            </el-card>

            <div class="stat w-100">
                <div class="item">
                    <i class="fas fa-building"></i>

                    <div class="count">
                        <div>প্রতিষ্ঠান</div>
                        <div>৪৫৬৮ টি</div>
                    </div>
                </div>
                <div class="item">
                    <i class="fas fa-graduation-cap"></i>

                    <div class="count">
                        <div>চাকুরি</div>
                        <div>৮৫৬৮ টি</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {elButton, elCard, elInput, elOption, elSelect} from '@/el';

    export default {
        data() {
            return {
                organizations: ['মসজিদ', 'মাদ্রাসা', 'টিউশনি'],
                selectedOrganizations: [],
                search: ''
            };
        },
        components: {elCard, elInput, elSelect, elOption, elButton}
    };
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
        background: rgba(225, 225, 225, .1);
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
        background: rgba(0, 0, 0, .4);
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
