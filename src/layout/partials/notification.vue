<template>
    <router-link :class="`el-menu-item flex align-center ${!item.seen?' unseen':''}`"
                 :to="link" @click.native="seen">
        <div class="pic" v-if="item.pic" :style="style">
        </div>

        <div class="flex justify-between align-center w-100">
            <div :class="`message${small?' small':''}`">
                <strong>{{item.title}}</strong> {{item.message}}
            </div>

            <!--<div class="blur"></div>-->

            <div>
                <i :class="iconClass"></i>
            </div>
        </div>
    </router-link>
</template>

<script>

    export default {
        props: {
            item: null,
            small: Boolean
        },

        computed: {
            iconClass() {
                const {item} = this.$props;

                return {
                    'far fa-envelope': !item.seen,
                    'far fa-envelope-open': item.seen,
                    mail: true
                };
            },

            style() {
                return {
                    background: `url(${this.$fileUrl(this.$props.item.pic)}) no-repeat center`,
                    backgroundSize: 'cover'
                };
            },

            link() {
                const link = JSON.parse(this.$props.item.link);

                switch (link.type) {
                    case 'job-approved':
                        return `/dashboard/jobs#j${link.id}`;
                    case 'job-rejected':
                        return `/dashboard/jobs#j${link.id}`;
                    case 'applied':
                        return `/dashboard/jobs/${link.id}`;
                    case 'page':
                        return `/pages/${link.id}`;
                    case 'new-job':
                        return `/dashboard/job-requests#j${link.id}`;
                }
            }
        },

        methods: {
            seen() {
                this.$store.dispatch('notification/seen', this.$props.item);
            }
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    $max-line: 3;
    $line-height: 1.4rem;

    a {
        text-decoration: none;
        border-bottom: 1px solid $--border-color-base;
        position: relative;

        &.unseen {
            background: transparentize($--color-primary, .92);
        }
    }

    .message {
        border: 10px solid transparent;
        overflow: hidden;
        color: #000;
        min-height: 35px;
        max-width: 300px;
        position: relative;
        line-height: 2em;
        white-space: normal;

        &.small {
            text-overflow: ellipsis;
            max-width: unset;
            white-space: nowrap;
        }
    }

    /*.blur {
        width: 74px;
        height: 36px;
        position: absolute;
        background: linear-gradient(285deg, #fff6a6, transparent);
        right: 0;
        bottom: 0;
    }*/

    .mail {
        color: $--color-primary;
        margin-right: 10px;
    }

    .fa-envelope-open {
        color: $--color-secondary;
    }

    .pic {
        min-width: 50px;
        max-width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;
        box-shadow: 0 0 1px rgba(0, 0, 0, .6);
        border: 2px solid white;
    }

    @media all and (max-width: $--md) {
        .el-menu-item {
            padding: 0;
        }
    }
</style>
