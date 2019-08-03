<template>
    <sidebar-card title="স্পেশাল চাকুরী">
        <el-menu class="special-jobs">
            <template v-for="(job, index) in jobs">
                <el-tooltip class="item" effect="dark" :content="job.name" placement="left" :key="index"
                            :open-delay="500">
                    <li :index="index.toString()" class="flex el-menu-item">
                        <div>
                            <img :src="job.logo" :alt="job.name">
                        </div>
                        <div class="wrapper">
                            <div class="title">{{job.title}}</div>
                            <div class="name">{{job.name}}</div>
                        </div>
                    </li>
                </el-tooltip>
            </template>
        </el-menu>
    </sidebar-card>
</template>

<script>
    import sidebarCard from './sidebar-card'
    import {elTooltip, elMenu} from '@/el'

    export default {
        data() {
            return {
                jobs: [
                    {
                        name: 'জামিয়া আরাবিয়া ইমদাদুল উলূম ফরিদাবাদ মাদ্রাসা',
                        title: 'হাফেজ সাহেব',
                        logo: require('../../../assets/images/faridabad.jpg')
                    },

                    {
                        name: 'আল্‌-জামিয়াতুল আহ্‌লিয়া দারুল উলূম মুঈনুল ইসলাম (হাটহাজারী মাদ্রাসা)',
                        title: 'কারি সাহেব',
                        logo: require('../../../assets/images/hathazari.png')
                    },

                    {
                        name: 'জামিয়া রাহমানিয়া আরাবিয়া ঢাকা বাংলাদেশ',
                        title: 'কিতাব খানার শিক্ষক',
                        logo: require('../../../assets/images/rahmania.png')
                    },

                    {
                        name: 'সাত গম্বুজ মসজিদ',
                        title: 'ইমাম সাহেব',
                        logo: require('../../../assets/images/masjid.png')
                    },

                    {
                        name: 'আল্‌-জামিয়াতুল আহ্‌লিয়া দারুল উলূম মুঈনুল ইসলাম (হাটহাজারী মাদ্রাসা)',
                        title: 'হাফেজ সাহেব (শিক্ষক)',
                        logo: require('../../../assets/images/hathazari.png')
                    },

                    {
                        name: 'বায়তুল মোকাররম জাতীয় মসজিদ',
                        title: 'হাফেজ সাহেব (তারাবির জন্য)',
                        logo: require('../../../assets/images/masjid.png')
                    }
                ]
            }
        },

        components: {sidebarCard, elTooltip, elMenu}
    }
</script>

<style lang="scss">
    @import "../../../styles/var";

    .special-jobs {
        background: #fffad2;

        li {
            overflow: hidden;
            height: auto;
            line-height: inherit;
            padding: 8px !important;
        }

        img {
            width: 50px;
            border-radius: $--border-radius-circle;
            box-shadow: $--box-shadow-base;
            background: #fff;
        }

        .name {
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: .8rem;
        }

        .wrapper {
            overflow: hidden;
            margin-left: 10px;
            display: grid;
        }
    }
</style>
