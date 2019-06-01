<template>
    <div class="flex justify-center align-center menu-icon">
        <el-button icon="el-icon-menu" @click="toggleNav(true)" circle/>

        <transition name="fade">
            <div class="back-drop" v-if="show"></div>
        </transition>

        <transition name="slide">
            <div class="wrapper" v-if="show" @click.self="toggleNav(false)">
                <div class="scroll">
                    <nav>
                        <el-card class="box-card h-100">
                            <div slot="header" class="header">
                                <div class="flex flex-wrap justify-center">
                                    <img :src="icons.user" alt="User">
                                </div>

                                <div class="flex flex-wrap justify-center">
                                    <el-button-group class="btn-group" v-if="!auth.user">
                                        <router-link to="/sign-in"
                                                     class="el-button el-button--small el-button--primary btn">
                                            <i class="fas fa-sign-in-alt"></i>&nbsp; {{ $t('avatar.login') }}
                                        </router-link>

                                        <el-button class="btn" icon="fas fa-user-plus" size="small">
                                            {{ $t('avatar.signUp') }}
                                        </el-button>
                                    </el-button-group>

                                    <ul v-else>
                                        <li class="el-dropdown-menu__item">
                                            <i class="el-icon-setting"></i> {{ $t('avatar.profile') }}
                                        </li>
                                        <li class="el-dropdown-menu__item" @click="signOut">
                                            <i class="fas fa-sign-out-alt"></i> {{ $t('avatar.signOut') }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <el-menu default-active="0">
                                    <menu-item v-for="(item, index) in menu" :key="index" :index="index" :item="item"/>
                                </el-menu>
                            </div>
                        </el-card>
                    </nav>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {elCard, elMenu, elButton, elButtonGroup} from '@/el';
    import menuItem from './menu-item';
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                icons: {
                    user: require('@/assets/images/user.svg')
                },
                show: false
            };
        },

        computed: mapState({
            menu: 'menu',
            auth: 'auth'
        }),

        methods: {
            toggleNav(what) {
                this.show = what;
            },

            signOut() {
                this.$store.dispatch('signOut');
            }
        },
        components: {menuItem, elButtonGroup, elButton, elMenu, elCard}
    };
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    .menu {
        padding: 0;
        margin: 0;
    }

    .el-menu {
        border-right: 0;
    }

    .menu-icon {
        @media screen and (min-width: $__md) {
            display: none;
        }

        button {
            width: 44px;
        }
    }

    .back-drop, .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;

        @media screen and (min-width: $__md) {
            display: none;
        }
    }

    .back-drop {
        background: rgba(0, 0, 0, .2);
    }

    .scroll {
        width: 70%;
        height: 100%;
        overflow-y: auto;
    }

    .header {
        img {
            width: 100px;
        }
    }

    .btn-group button {
        width: auto;
    }

    .btn {
        text-decoration: none;
    }

    .box-card {
        min-height: 100vh;
    }

    ul {
        padding: 0;
        margin: 0;
        width: 100%;
    }
</style>
