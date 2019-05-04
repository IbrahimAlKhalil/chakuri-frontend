<template>
    <layout>
        <search/>
        <div class="container">
            <aside>
                <location/>
            </aside>

            <div>
                <center>Contents</center>
            </div>

            <aside>
                <special-jobs/>
            </aside>
        </div>
    </layout>
</template>

<script>
    import layout from '../../layouts/master'
    import search from './components/search'
    import location from './components/location'
    import specialJobs from './components/special-jobs'

    export default {
        data() {
            return {
                divisions: ['ঢাকা', 'সিলেট', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ']
            }
        },
        components: {layout, search, location, specialJobs}
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/var';

    $division-line-height: 45px;

    .container {
        display: grid;
        grid-gap: 10px;
        margin: 10px;
        grid-template-columns: none;

        @media all and (min-width: $--md) {
            grid-template-columns: 1fr 4fr 1.3fr;
        }
    }

    aside {
        min-width: 250px;
    }

</style>
