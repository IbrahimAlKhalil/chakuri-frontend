<template>
    <transition-group tag="div" name="jump" class="wrapper">
        <div v-for="(job, index) in jobs" :key="`${index}-j`" class="job">
            <router-link class="job-inner" :to="`/jobs/${job.id}`">
                <div class="flex">
                    <div v-if="job.admin_job">
                        <img :src="logo" :alt="job.institute_name">
                    </div>
                    <div v-else-if="job.logo">
                        <img :src="job.logo | fileUrl" :alt="job.institute">
                    </div>
                    <div v-else>
                        <img :src="mosque" :alt="job.institute">
                    </div>

                    <div class="title-wrapper">
                        <div class="name" v-highlight="{keyword, sensitive: false}">
                            {{cutText(job.admin_job?job.institute_name:job.institute)}}
                        </div>
                        <div class="title" v-highlight="{keyword, sensitive: false}">{{job.position}}</div>
                    </div>
                </div>

                <div class="info mt-1">
                    <div class="row">
                        <div><i :class="showDeadline?'fas fa-clock':'fas fa-graduation-cap'"></i>&nbsp&nbsp;<span
                                class="requirement">{{showDeadline?deadline(job.deadline):(cutText(job.education, 33)||'শিক্ষাগত যোগ্যতা উল্লেখ করা হয়নি')}}</span>
                        </div>
                        <div><i class="fas fa-briefcase"></i>&nbsp&nbsp;<span class="requirement">{{rangeValue(job, 'experience', 'বছর (অভিজ্ঞতা)', 'অভিজ্ঞতা না থাকলেও চলবে')}}</span>
                        </div>
                    </div>

                    <div class="row">
                        <div><i class="fas fa-map-marked-alt"></i>&nbsp&nbsp;<span
                                class="requirement" v-highlight="{keyword, sensitive: false}">{{job.thana}}, {{job.district}}</span>
                        </div>
                        <div><b>৳</b>&nbsp&nbsp;<span
                                class="requirement">{{rangeValue(job, 'salary','টাকা (মাসিক)', 'আলোচনা সাপেক্ষে')}} {{job.negotiable &&
                    (job.salary_to ||
                    job.salary_from)?'(আলোচনা সাপেক্ষে)':''}}</span>
                        </div>
                    </div>
                </div>
            </router-link>
            <slot v-bind:item="job"/>
        </div>
    </transition-group>
</template>

<script>
    import logo from '@/assets/images/App logo SVG 512.svg';
    import mosque from '@/assets/images/islam.svg';

    export default {
        props: ['jobs', 'keyword', 'show-deadline'],
        data() {
            return {
                logo,
                mosque,
            };
        },
        methods: {
            rangeValue(job, name, append, unmentioned) {
                const fromValue = job[`${name}_from`];
                const toValue = job[`${name}_to`];

                const enToBn = this.$enToBn;

                if (!toValue && !fromValue) {
                    return unmentioned;
                }

                if (fromValue === toValue) {
                    return `${enToBn(fromValue)} ${append}`;
                }

                if (!toValue) {
                    return `নূন্যতম ${enToBn(fromValue)} ${append}`;
                }

                if (!fromValue) {
                    return `সর্বোচ্চ ${enToBn(toValue)} ${append}`;
                }

                return enToBn(`${fromValue} - ${toValue} ${append}`);
            },

            deadline(deadline) {
                const date = new Date(deadline);

                return this.$bnDate(date);
            },

            cutText(text, length = 100) {
                if (!text) {
                    return text;
                }

                if (text.length >= length) {
                    return `${text.slice(0, length)}...`;
                }

                return text;
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "../styles/var";

    .wrapper {
        display: grid;
        grid-template-columns: repeat(1, minmax(calc(100% - 10px), 1fr));
        grid-gap: 15px;
        grid-area: jobs;
    }

    img {
        width: 60px;
        border-radius: $--border-radius-circle;
        box-shadow: $--box-shadow-base;
        background: #fff;
    }

    .job {
        min-height: 140px;
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

    .job-inner {
        display: flex;
        flex-wrap: wrap;
        height: 100%;
        text-decoration: inherit;
        color: inherit;
    }

    .requirement {
        font-weight: bold;
    }

    .name {
        text-shadow: 0 0;
        font-size: 1.1em;
    }

    .title {
        font-size: 0.9em;
        margin-top: 10px;
        color: #52d0d3;
        font-weight: bold;
    }

    .title-wrapper {
        margin-left: 15px;
    }

    .info {
        align-self: flex-end;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 15px;
    }

    .row > div {
        margin-top: 8px;
    }

    .focused {
        border: 2px solid #32ff32;
    }

    @media all and (min-width: $--md) {
        .wrapper {
            grid-column-start: 2;
            grid-template-columns: repeat(2, minmax(300px, 1fr));
        }
    }
</style>
