<template>
    <sidebar-card title="জরুরি নিয়োগ">
        <div class="special-jobs el-menu">
            <template v-for="(job, index) in jobs">
                <el-tooltip class="item" effect="dark" :content="getName(job)"
                            placement="left" :key="index"
                            :open-delay="500">
                    <router-link :index="index.toString()" class="flex el-menu-item" :to="`/jobs/${job.id}`">
                        <div v-if="job.admin_job">
                            <img :src="logo" :alt="job.institute_name">
                        </div>
                        <div v-else-if="job.logo">
                            <img :src="job.logo | fileUrl" :alt="job.institute">
                        </div>
                        <div class="wrapper">
                            <div class="title">{{getName(job)}}</div>
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
    import {elMenu, elTooltip} from '@/el';
    import logo from '@/assets/images/App logo SVG 512.svg';

    export default {
        components: {sidebarCard, elTooltip, elMenu},
        props: ['jobs'],
        data() {
            return {
                logo,
            };
        },
        methods: {
            getName(job) {
                return job.admin_job ? job.institute_name : job.institute;
            },
        },
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
