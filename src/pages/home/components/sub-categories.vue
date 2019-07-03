<template>
    <el-card class="sub-categories">
        <div class="el-menu">
            <router-link v-for="(subCategory, index) in subCategories" :key="index" class="el-menu-item nav-arrow-right"
                         to="/">
                {{subCategory}}
            </router-link>
        </div>
    </el-card>
</template>

<script>
    import {elCard} from '../../../el';

    export default {
        data() {
            return {
                subCategories: [
                    'খতিব',
                    'ইমাম',
                    'মুয়াজ্জিন',
                    'খাদেম',
                    'হাফেজ সাহেব (তারাবি)',
                    'কারি সাহেব',
                    'শিক্ষক (হিফজ বিভাগ)',
                    'হিসাব রক্ষক',
                    'শিক্ষক (কিতাব বিভাগ)',
                    'জেনারেল শিক্ষক',
                    'শিক্ষক (ইফতা বিভাগ)',
                    'নাজিমে তালিমাত'
                ]
            };
        },
        components: {elCard}
    };
</script>

<style lang="scss" scoped>
    @import "../../../styles/var";

    .sub-categories {
        margin-top: 10px;
    }

    .el-menu {
        display: grid;
        grid-template-columns: none;
        grid-column-gap: 10px;
        border: 0;

        @media all and (min-width: $--md) {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    $line-height: 45px;
    .el-menu-item {
        display: block;
        text-decoration: none;
        height: $line-height;
        line-height: $line-height;
        font-size: .9rem;
        color: $--link-color;
        border-bottom: 1px solid $--border-color-lighter;
        order: -1;

        &:before {
            margin-right: 15px;
            line-height: $line-height;
            float: left;
        }
    }
</style>

<style lang="scss">
    @import "../../../styles/var";

    .sub-categories {
        .el-card__body {
            @media all and (max-width: $--md) {
                padding: 0;
            }
        }
    }
</style>
