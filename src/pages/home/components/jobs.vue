<template>
    <div class="wrapper">
        <router-link v-for="(job, index) in jobs" :key="index" to="/jobs/5" class="job">
            <div class="flex">
                <div>
                    <img :src="job.logo" :alt="job.name">
                </div>

                <div class="title-wrapper">
                    <div class="name">{{job.name}}</div>
                    <div class="title">{{job.title}}</div>
                </div>
            </div>

            <div class="info">
                <div>অভিজ্ঞতা: <span class="requirement">২ বছর</span></div>
                <div>শিক্ষাগত যোগ্যতা: <span class="requirement">দাওরা (মাস্টার্স), ইফতা</span></div>
            </div>
        </router-link>
    </div>
</template>

<script>
    import {elCard} from '../../../el';

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
                    },
                    {
                        name: 'আল্‌-জামিয়াতুল আহ্‌লিয়া দারুল উলূম মুঈনুল ইসলাম (হাটহাজারী মাদ্রাসা)',
                        title: 'হাফেজ সাহেব (শিক্ষক)',
                        logo: require('../../../assets/images/hathazari.png')
                    },
                ]
            };
        },

        components: {elCard}
    };
</script>

<style lang="scss" scoped>
    @import "../../../styles/var";

    .wrapper {
        display: grid;
        grid-template-columns: repeat(1, minmax(300px, 1fr));
        gap: 15px;
        grid-area: jobs;
        margin-top: 15px;
    }

    img {
        width: 60px;
        border-radius: $--border-radius-circle;
        box-shadow: $--box-shadow-base;
        background: #fff;
    }

    .job {
        min-height: 140px;
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        border-radius: $--card-border-radius;
        box-shadow: $--box-shadow-base;
        background: #fff;
        text-decoration: none;
        color: $--color-secondary;
        transition: all 150ms ease-in-out;

        &:hover {
            transform: scale(1.02);
            background: $--color-secondary;
            color: #fff;
        }
    }

    .requirement {
        font-weight: bold;
    }

    .name {
        text-shadow: 0 0;
    }

    .title {
        font-size: .9rem;
        margin-top: 10px;
        color: #E91E63;
    }

    .title-wrapper {
        margin-left: 15px;
    }

    .info {
        align-self: flex-end;
        width: 100%;
    }

    @media all and (min-width: $--md) {
        .wrapper {
            grid-column-start: 2;
            grid-template-columns: repeat(2, minmax(300px, 1fr));
        }
    }
</style>
