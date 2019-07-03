<template>
    <section id="search-page">
        <div class="filters">
            <el-card>
                <label class="input">
                    <span class="label">কীওয়ার্ড</span>
                    <el-input prefix-icon="el-icon-search"></el-input>
                </label>

                <div class="input">
                    <span class="label">প্রতিষ্ঠান এর ধরন</span>
                    <span class="d-block">
                        <el-radio v-model="institutionType" label="masjid">মসজিদ</el-radio>
                        <el-radio v-model="institutionType" label="madrasa">মাদ্রাসা</el-radio>
                    </span>
                </div>
            </el-card>
        </div>

        <div class="jobs">

        </div>

        <div class="ads">

        </div>
    </section>
</template>

<script>
    import {elCard, elInput, elRadio, elRadioGroup} from '../../el'

    export default {
        data() {
            return {
                institutionType: 'masjid'
            }
        },
        components: {elCard, elInput, elRadioGroup, elRadio}
    }
</script>

<style lang="scss">
    #search-page {
        margin: 15px 10px;
        display: grid;
        grid-template-columns: 2fr 5fr 2fr;

        .input {
            display: block;
            margin-bottom: 20px;
        }

        .label {
            text-shadow: 0 0;
            margin-bottom: 10px;
            display: inline-block;
        }
    }
</style>

