<template>
    <div class="top-categories">
        <router-link to="/" class="category">
            <el-card class="card">
                <div><i class="fas fa-mosque"></i></div>
                <div class="name">মসজিদ</div>
            </el-card>
        </router-link>


        <router-link to="/" class="category">
            <el-card class="card">
                <div><i class="fas fa-school"></i></div>
                <div class="name">মাদ্রাসা</div>
            </el-card>
        </router-link>

        <!--<router-link to="/" class="category">
            <el-card class="card">
                <div><i class="fas fa-chalkboard-teacher"></i></div>
                <div class="name">টিউশনি</div>
            </el-card>
        </router-link>-->
    </div>
</template>

<script>
    import {elCard} from '../../../el';
    export default {
        components: {elCard}
    };
</script>

<style lang="scss" scoped>
    @import "../../../styles/var";

    .top-categories {
        display: grid;
        grid-template-columns: repeat(2/*3*/, minmax(60px, 1fr));
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
