<template>
    <div class="flex align-center wrapper">
        <el-popover v-if="auth.user" placement="top-start" trigger="click" popper-class="popover"
                    class="avatar-wrapper">
            <div class="avatar" slot="reference">
                <img :src="icons.user" alt="User">
            </div>
            <ul>
                <li class="el-dropdown-menu__item">
                    <i class="el-icon-setting"></i> প্রোফাইল
                </li>
                <li class="el-dropdown-menu__item" @click="signOut">
                    <i class="fas fa-sign-out-alt"></i>
                    প্রস্থান
                </li>
            </ul>
        </el-popover>

        <template v-else>
            <router-link to="/sign-in" class="el-button el-button--primary btn">
                <i class="fas fa-sign-in-alt"></i>&nbsp; লগ-ইন
            </router-link>
            <router-link to="/sign-up" class="el-button btn">
                <i class="fas fa-user-plus"></i>&nbsp; একাউন্ট তৈরি করুন
            </router-link>
        </template>
    </div>
</template>

<script>
    import {elPopover, elButton, elDialog} from '@/el'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                icons: {
                    user: require('@assets/images/user.svg')
                },
                open: false
            }
        },

        computed: mapState({
            auth: 'auth'
        }),

        methods: {
            signOut() {
                this.$store.dispatch('signOut')
            }
        },

        components: {elButton, elPopover, elDialog}
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    .avatar-wrapper {
        height: 100%;
    }

    .avatar {
        height: 100%;
        border-radius: 50%;
        cursor: pointer;

        img {
            box-sizing: border-box;
            height: 100%;
            border-radius: 50%;
            border: 10px solid transparent;

            &:hover {
                border-color: $bg;
            }
        }
    }

    .btn {
        margin-right: 10px;
        text-decoration: none;

        i {
            margin-right: 10px;
        }
    }

    .user-types {
        padding: 10px 0;

        a {
            display: block;
            text-decoration: none;
            line-height: 50px;
        }
    }
</style>
