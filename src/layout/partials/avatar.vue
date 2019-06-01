<template>
    <div class="flex align-center wrapper">
        <el-popover v-if="auth.user" placement="top-start" trigger="click" popper-class="popover">
            <div class="avatar" slot="reference">
                <img :src="icons.user" alt="User">
            </div>
            <ul>
                <li class="el-dropdown-menu__item">
                    <i class="el-icon-setting"></i> {{ $t('avatar.profile') }}
                </li>
                <li class="el-dropdown-menu__item" @click="signOut">
                    <i class="fas fa-sign-out-alt"></i> {{ $t('avatar.signOut') }}
                </li>
            </ul>
        </el-popover>

        <template v-else>
            <router-link to="/sign-in" class="el-button el-button--primary btn">
                <i class="fas fa-sign-in-alt"></i>&nbsp; {{ $t('avatar.login') }}
            </router-link>

            <el-button class="btn" icon="fas fa-user-plus" @click="open = true">
                {{ $t('avatar.signUp') }}
            </el-button>
        </template>
    </div>
</template>

<script>
    import {elPopover, elButton, elDialog} from '@/el';
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                icons: {
                    user: require('@assets/images/user.svg')
                },
                open: false
            };
        },

        computed: mapState({
            auth: 'auth'
        }),

        methods: {
            signOut() {
                this.$store.dispatch('signOut');
            }
        },

        components: {elButton, elPopover, elDialog}
    };
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    .wrapper > span:first-child {
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
        text-decoration: none;

        i {
            margin-right: 10px;
        }
    }
</style>
