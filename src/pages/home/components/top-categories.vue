<template>
    <div class="top-categories" v-loading="!items.length">
        <template>
            <router-link v-for="(item, index) in items" :key="index" :to="`/search?category=${item.id}`"
                         class="category">
                <el-card class="card">
                    <div><i :class="item.icon"></i></div>
                    <div class="name">{{item.name}}</div>
                </el-card>
            </router-link>
        </template>

        <template v-if="!items.length">
            <div v-for="i in 2" class="category" :key="i">
                <el-card class="card">
                    <div><i class="fas fa-question-circle"></i></div>
                    <div class="name">...</div>
                </el-card>
            </div>
        </template>
    </div>
</template>

<script>
    import {elCard} from '@/el';

    export default {
        components: {elCard},

        data() {
            return {
                items: []
            };
        },

        async created() {
            const response = await this.$fetch('categories').response();

            this.items = response.json();
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../../styles/var";

    .top-categories {
        display: grid;
        grid-template-columns: repeat(2 /*3*/
        , minmax(60px, 1fr));
        gap: 10px;
    }

    .category {
        text-decoration: none;
    }

    .card {
        transition: .2s linear;
        text-align: center;
        color: $--color-secondary;

        &:hover {
            background: $--color-secondary;
            color: #fff;
        }

        i {
            font-size: 2.5rem;
        }
    }

    .name {
        margin-top: 10px;
        font-size: 1.2rem;
        text-shadow: 0 0;
    }
</style>
