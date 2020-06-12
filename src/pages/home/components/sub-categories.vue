<template>
    <el-card class="sub-categories">
        <div class="el-menu" v-loading="!subCategories.length">
            <template v-if="!subCategories.length">
                <div v-for="i in 9" :key="i" class="el-menu-item nav-arrow-right">
                    ...
                </div>
            </template>

            <router-link v-for="(subCategory, index) in subCategories" :key="index" class="el-menu-item nav-arrow-right"
                         :to="`/search?position=${subCategory.id}`">
                {{subCategory.name}}
            </router-link>
        </div>
    </el-card>
</template>

<script>
    import {elCard} from '@/el';

    export default {
        components: {elCard},
        data() {
            return {
                subCategories: []
            };
        },
        async created() {
            const response = await this.$fetch('positions').response();

            this.subCategories = response.json();
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../styles/var";

    .sub-categories {
        margin-top: 10px;
    }

    .el-menu {
        display: grid;
        grid-template-columns: none;
        grid-column-gap: 10px;
        border: 0;

        @media all and (min-width: $--md) {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .el-menu-item {
        display: flex;
        align-items: center;
        text-decoration: none;
        min-height: 45px;
        line-height: normal;
        font-size: .9rem;
        color: $--link-color;
        border-bottom: 1px solid $--border-color-lighter;
        order: -1;
        white-space: normal;

        &:before {
            margin-right: 15px;
            float: left;
        }
    }
</style>

<style lang="scss">
    @import "../../../styles/var";

    .sub-categories {
        .el-card__body {
            @media all and (max-width: $--md) {
                padding: 0;
            }
        }
    }
</style>
