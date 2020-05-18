<template>
    <el-header class="flex justify-between header">
        <nav-mobile/>
        <div v-if="!$store.state.isMobile" class="logo">
            <router-link to="/" class="logo-url d-block">
                <img :src="$store.state.logo | fileUrl" alt="name">
            </router-link>
        </div>
        <div v-if="$auth.user" class="auth-menu flex align-center">
            <el-popover popper-class="popover notification-popper">
                <el-badge slot="reference" :value="notification.unread | enToBn" :max="50" type="primary"
                          :hidden="notification.unread === 0">
                    <el-button icon="el-icon-message-solid" size="medium" @click="load"></el-button>
                </el-badge>

                <div>
                    <div class="items">
                        <div class="el-menu">
                            <notification v-for="(item, index) in notificationItems" :key="index"
                                          :item="item" small/>
                        </div>

                        <empty :empty="!notification.items.length" :loading="notification.loading" size="small"/>
                    </div>


                    <router-link class="el-button el-button--default no-underline w-100 d-block see-more"
                                 to="/dashboard/notifications">আরও
                        দেখুন
                    </router-link>
                </div>
            </el-popover>
        </div>
        <a v-else-if="$store.state.isMobile && !$store.state.isAndroid" class="google-play-link"
           href='https://play.google.com/store/apps/details?id=com.khidmatbd.mobile&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
            <img class="google-play-img"
                 alt='Get it on Google Play'
                 src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/>
        </a>
        <div class="flex align-center" v-else>
            <el-button type="primary" size="medium" @click="$router.push('/sign-in')">
                লগ-ইন
            </el-button>

            <el-button type="plain" size="medium" @click="$router.push('/sign-up')">
                একাউন্ট তৈরি করুন
            </el-button>
        </div>

        <nav-desktop/>
    </el-header>
</template>

<script>
    import empty from '@/components/empty';
    import {elHeader, elBadge, elButton, elPopover} from '@/el';
    import Notification from '@/layout/partials/notification';

    export default {
        components: {
            Notification,
            navDesktop: () => import('./nav-desktop'),
            navMobile: () => import('./nav-mobile'),
            elHeader,
            elBadge,
            elButton,
            elPopover,
            empty,
        },

        computed: {
            notification() {
                return this.$store.state.notification;
            },

            notificationItems() {
                return this.notification.items.slice(0, 6);
            }
        },

        methods: {
            async load() {
                const {dispatch} = this.$store;

                if (this.notification.page === 0) {
                    await dispatch('notification/loadItems');
                }

                dispatch('notification/hideCount');
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    .header {
        background: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, .1);
        position: sticky;
        top: 0;
        z-index: 1004;
        padding: 0 10px;
    }

    .logo {
        height: 100%;

        a {
            height: 100%;
            box-sizing: border-box;
            padding: 5px 0;
        }

        img {
            height: 100%;
        }
    }

    .auth-menu {
        margin-left: auto;
    }

    .items {
        width: 450px;
        max-width: calc(100vw - 60px);
    }

    .see-more {
        border-width: 0;
        border-top: 1px solid $--border-color-light;
    }

    .google-play-link {
        width: 155px;
        display: block;
    }

    .google-play-img {
        height: 100%;
    }

    @media screen and (min-width: $--md) {
        .auth-menu {
            margin-right: 20px;
        }
    }
</style>

<style>
    .notification-popper[x-placement^="bottom"] {
        margin-top: 22px !important;
    }
</style>
