<template>
    <section>
        <search :counts="counts"/>
        <div class="container">
            <aside class="sidebar-1">
                <location/>
            </aside>

            <section class="contents">
                <top-categories/>
                <sub-categories/>
            </section>

            <aside class="sidebar-2">
                <special-jobs :jobs="jobs"/>
            </aside>

            <jobs :jobs="jobs"/>
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
    import jobs from './components/jobs';

    export default {
        components: {search, location, specialJobs, elCard, topCategories, subCategories, jobs},
        data() {
            return {
                jobs: [],
                perPage: window.innerWidth < 920 ? 6 : 10,
                counts: {
                    job: 0,
                    institute: 0
                }
            };
        },
        methods: {
            async loadJobs() {
                const response = await this.$fetch(`job-filter?perPage=${this.perPage}`).response();

                this.jobs = response.json();
            }
        },
        async created() {
            this.loadJobs();

            const response = await this.$fetch('institute-jobs-count').response();

            this.counts = response.json();

            // TODO: Load special jobs
        }
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

    aside {
        min-width: 250px;
    }

    .sidebar-1 {
        grid-area: sidebar-1;
    }

    .sidebar-2 {
        grid-area: sidebar-2;
        min-width: 350px;
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
            top: 70px;
            /*bottom: 10px;*/
            /*align-self: end;*/
        }
    }
</style>
