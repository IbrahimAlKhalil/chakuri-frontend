<template>
    <el-menu class="divisions">
        <el-menu-item v-for="(division, index) in divisions" :index="index.toString()">{{division}}<i
                class="el-icon-arrow-right"></i></el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        data() {
            return {
                divisions: ['ঢাকা', 'সিলেট', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'রংপুর', 'ময়মনসিংহ']
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/var";

    $division-line-height: 45px;

    .divisions {
        border-radius: $--border-radius-base;
        box-shadow: $--box-shadow-base;
        border: 0;

        li {
            border-bottom: 1px solid $--border-color-light;
            font-size: .9rem;
            height: $division-line-height;
            line-height: $division-line-height;
        }

        i[class*="el-icon"] {
            float: right;
            line-height: $division-line-height;
        }
    }
</style>
