<template>
    <section>
        <search :counts="counts"/>
        <div class="container">
            <aside class="sidebar-1">
                <banners :banners="banners" place="before-left-sidebar"/>
                <location/>
                <banners :banners="banners" place="after-left-sidebar" margin-top/>
            </aside>

            <section class="contents">
                <top-categories/>
                <banners :banners="banners" place="before-positions" margin-top/>
                <sub-categories/>
                <banners :banners="banners" place="after-positions" margin-top/>
            </section>

            <aside class="sidebar-2">
                <banners :banners="banners" place="before-right-sidebar"/>
                <special-jobs :jobs="specialJobs"/>
                <banners :banners="banners" place="after-right-sidebar" margin-top/>
            </aside>

            <jobs :jobs="jobs"/>
            <div></div>
            <banners :banners="banners" place="after-jobs" margin-top/>
        </div>
    </section>
</template>

<script>
    import search from './components/search';
    import location from './components/location';
    import specialJobs from './components/special-jobs';
    import topCategories from './components/top-categories';
    import subCategories from './components/sub-categories';
    import {elCard} from '@/el';
    import jobs from '@/components/jobs';
    import banners from '@pages/home/components/banners';

    export default {
        components: {banners, search, location, specialJobs, elCard, topCategories, subCategories, jobs},
        data() {
            return {
                jobs: [],
                specialJobs: [],
                perPage: window.innerWidth < 920 ? 6 : 10,
                counts: {
                    job: 0,
                    institute: 0,
                },
                banners: {}
            };
        },
        methods: {
            async loadJobs() {
                const responses = await Promise.all([
                    this.$fetch(`job-filter?perPage=${this.perPage}`).response(),
                    this.$fetch(`job-filter/special-jobs?perPage=8`).response(),
                ]);

                this.jobs = responses[0].json();

                const specialJobs = responses[1].json();

                this.specialJobs = specialJobs.length ? specialJobs : this.jobs;
            },
            async loadCounts() {
                const response = await this.$fetch('institute-jobs-count').response();

                this.counts = response.json();
            },
            async loadBanners() {
                const response = await this.$fetch('banners').response();

                const {banners} = this;

                response.json().forEach(banner => {
                    if (!banners.hasOwnProperty(banner.place)) {
                        this.$set(banners, banner.place, []);
                    }

                    banners[banner.place].push(banner);
                });
            }
        },
        async created() {
            await Promise.all([
                this.loadJobs(),
                this.loadCounts(),
                this.loadBanners()
            ]);
        },
    };
</script>

<style lang="scss" scoped>
    @import '../../styles/var';

    $division-line-height: 45px;

    .container {
        display: grid;
        gap: 10px;
        grid-template-columns: 1fr;
        grid-template-areas: "content" "sidebar-1" "sidebar-2" "jobs";
        margin: 10px;
        align-items: flex-start;
    }

    .sidebar-1 {
        grid-area: sidebar-1;
    }

    .sidebar-2 {
        grid-area: sidebar-2;
    }

    .contents {
        grid-area: content;
    }

    @media all and (min-width: $--md) {
        .container {
            grid-template-columns: min-content auto min-content;
            grid-template-areas: "sidebar-1 content sidebar-2" "sidebar-1 jobs sidebar-2";
        }

        aside {
            position: sticky;
            /*top: 70px;*/
            bottom: 10px;
            align-self: end;
            min-width: 250px;
        }

        .sidebar-2 {
            min-width: 350px;
        }
    }
</style>
