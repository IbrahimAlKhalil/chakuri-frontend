<template>
    <sidebar-card title="স্পেশাল চাকুরী">
        <div class="special-jobs el-menu">
            <template v-for="(job, index) in jobs">
                <el-tooltip class="item" effect="dark" :content="job.institute" placement="left" :key="index"
                            :open-delay="500">
                    <router-link :index="index.toString()" class="flex el-menu-item" :to="`/jobs/${job.id}`">
                        <div v-if="job.logo">
                            <img :src="job.logo | fileUrl" :alt="job.institute">
                        </div>
                        <div class="wrapper">
                            <div class="title">{{job.institute}}</div>
                            <div class="name">{{job.position}}</div>
                        </div>
                        <div>

                        </div>
                    </router-link>
                </el-tooltip>
            </template>
        </div>
    </sidebar-card>
</template>

<script>
    import sidebarCard from './sidebar-card';
    import {elTooltip, elMenu} from '@/el';

    export default {
        components: {sidebarCard, elTooltip, elMenu},
        props: ['jobs']
    };
</script>

<style lang="scss" scoped>
    @import "../../../styles/var";

    .special-jobs {
        background: $bg-hot;

        .el-menu-item {
            overflow: hidden;
            height: auto;
            line-height: inherit;
            padding: 8px !important;
            text-decoration: none;
        }

        img {
            width: 50px;
            border-radius: $--border-radius-circle;
            box-shadow: $--box-shadow-base;
            background: #fff;
        }

        .name {
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: .8rem;
        }

        .wrapper {
            overflow: hidden;
            margin-left: 10px;
            display: grid;
        }
    }
</style>
