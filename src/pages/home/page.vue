<template>
    <layout>
        <search/>
        <div class="container">
            <aside>
                <location/>
            </aside>

            <section class="contents">
                <top-categories/>
                <sub-categories/>
            </section>

            <aside>
                <special-jobs/>
            </aside>
        </div>

        <div class="jobs">
            Hello
        </div>
    </layout>
</template>

<script>
    import layout from '@layouts/master';
    import search from './components/search';
    import location from './components/location';
    import specialJobs from './components/special-jobs';
    import topCategories from './components/top-categories';
    import subCategories from './components/sub-categories';
    import {elCard} from '@/el';

    export default {
        data() {
            return {
                divisions: ['ঢাকা', 'সিলেট', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ']
            };
        },
        components: {layout, search, location, specialJobs, elCard, topCategories, subCategories}
    };
</script>

<style lang="scss" scoped>
    @import '../../styles/var';

    $division-line-height: 45px;

    .container {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: none;
        margin: 10px;

        @media all and (min-width: $--md) {
            grid-template-columns: 1fr 4fr 1.5fr;
        }
    }

    aside {
        min-width: 250px;
    }

    .contents {
        order: -1;

        @media all and (min-width: $--md) {
            order: 0;
        }
    }
</style>
