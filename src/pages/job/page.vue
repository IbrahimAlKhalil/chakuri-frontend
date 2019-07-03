<template>
    <section>
        <el-card>
            <h2>হাফেজ সাহেব</h2>
            <p>আল্‌-জামিয়াতুল আহ্‌লিয়া দারুল উলূম মুঈনুল ইসলাম (হাটহাজারী মাদ্রাসা)</p>
            <el-divider/>
        </el-card>
        <el-card>
            <div>

                <p class="org-info">
                    <span>কর্মখালিঃ</span>
                    <span>&nbsp;&nbsp; ১</span>
                </p>

                <p class="org-info">
                    <span>বয়সঃ</span>
                    <span>&nbsp;&nbsp; ২৬ - ৬২</span>
                </p>

                <p class="org-info">
                    <span>অভিজ্ঞতাঃ</span>
                    <span>&nbsp;&nbsp; ২ - ৩ বছর</span>
                </p>

                <p class="org-info">
                    <span>আবেদনের সময়সীমাঃ</span>
                    <span>&nbsp;&nbsp; ১৯ জুন ২০১৯</span>
                </p>
            </div>
        </el-card>
    </section>
</template>

<script>
    import {elCard, elDivider} from '../../el'

    export default {
        components: {elCard, elDivider}
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    section {
        padding: 15px;
        display: grid;
        grid-gap: 15px;
        align-items: start;

        @media all and (min-width: $--md) {
            grid-template-columns: 10fr 5fr;
        }
    }

    .title {
        font-size: 1.1rem;
        text-shadow: 0 0 0;
    }

    .org-info span:first-child {
        font-weight: bold;
    }
</style>
