<template>
    <footer class="flex justify-between">
        <router-link to="/" class="btn">
            <i class="el-icon-s-home"></i>
            <div>হোম</div>
        </router-link>

        <template v-if="!!$auth.user && $auth.user.type === 2">
            <router-link to="/dashboard/post-job" class="btn">
                <i class="el-icon-edit-outline"></i>
                <div>বিজ্ঞাপন দিন</div>
            </router-link>

            <router-link to="/dashboard/jobs" class="btn">
                <i class="el-icon-tickets"></i>
                <div>বিজ্ঞাপন সমূহ</div>
            </router-link>
        </template>

        <template v-else-if="!!$auth.user && $auth.user.type === 1">
            <router-link to="/dashboard/resume" class="btn">
                <i class="el-icon-document"></i>
                <div>জীবন বৃত্তান্ত</div>
            </router-link>

            <router-link to="/dashboard/favorites" class="btn">
                <i class="fa fa-heart"></i>
                <div>ফেভারিট</div>
            </router-link>
        </template>

        <router-link to="/dashboard/profile" class="btn">
            <i class="el-icon-user"></i>
            <div>প্রোফাইল</div>
        </router-link>
    </footer>
</template>

<script>
    import {elButton} from '@/el';

    export default {
        components: {elButton},
    };
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #fff;
        border-top: $--border-base;
    }

    .btn {
        padding: 5px 10px;
        text-align: center;
        text-decoration: none;
        font-size: 27px;
        color: $--icon-color;

        &:first-child {
            margin-left: 15px;
        }

        &:last-child {
            margin-right: 15px;
        }

        i {
            display: block;
        }

        div {
            font-size: .45em;
        }

        &.router-link-exact-active {
            color: $--color-primary;
        }
    }

</style>