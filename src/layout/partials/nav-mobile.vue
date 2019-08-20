<template>
    <div class="flex justify-center align-center menu-icon">
        <el-button icon="el-icon-menu" @click="showNav" circle/>

        <transition name="el-fade-in">
            <div class="back-drop" v-if="show"></div>
        </transition>

        <transition name="jump">
            <div class="wrapper" v-if="show" @click.self="hideNav">
                <div class="scroll">
                    <nav>
                        <el-card class="box-card h-100">
                            <div slot="header" class="header">
                                <template v-if="auth.user">
                                    <div class="flex flex-wrap justify-center">
                                        <img :src="auth.user.photo || auth.user.altPhoto" :alt="auth.user.name">
                                    </div>

                                    <el-divider/>
                                </template>
                                <div class="flex flex-wrap justify-center mt-1">
                                    <auth>
                                        <ul>
                                            <li class="el-dropdown-menu__item">
                                                <router-link to="/user/profile"><i class="el-icon-setting"></i> একাউন্ট
                                                </router-link>
                                            </li>
                                            <li class="el-dropdown-menu__item" @click="signOut">
                                                <i class="fas fa-sign-out-alt"></i> প্রস্থান
                                            </li>
                                        </ul>

                                        <el-button-group slot="else" class="btn-group">
                                            <router-link to="/sign-in"
                                                         class="el-button el-button--small el-button--primary btn">
                                                <i class="fas fa-sign-in-alt"></i>&nbsp; লগ-ইন
                                            </router-link>

                                            <router-link to="/sign-up" class="el-button el-button--small btn">
                                                <i class="fas fa-user-plus"></i>&nbsp; একাউন্ট তৈরি করুন
                                            </router-link>
                                        </el-button-group>
                                    </auth>
                                </div>
                            </div>
                            <div>
                                <div class="el-menu">
                                    <menu-item v-for="(item, index) in menu"
                                               :key="index" :index="index" :item="item"/>
                                </div>
                            </div>
                        </el-card>
                    </nav>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {elCard, elButton, elButtonGroup, elDivider} from '../../el'
    import menuItem from './menu-item'
    import {mapState} from 'vuex'

    export default {
        computed: {
            ...mapState({
                show: 'showMenu',
                auth: 'auth'
            }),

            menu() {
                const state = this.$store.state
                return state.layout === 'master' ? state.menu : state.dashboardMenu
            }
        },

        methods: {
            showNav() {
                this.$store.commit('toggleNavMenu', true)
            },

            hideNav() {
                this.$store.commit('toggleNavMenu', false)
            },

            async signOut() {
                this.hideNav()
                await this.$store.dispatch('signOut')
            }
        },
        components: {menuItem, elButtonGroup, elButton, elCard, elDivider}
    }
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    .el-menu {
        display: grid;
        border-right: 0;
    }

    .menu-icon {
        @media screen and (min-width: $--md) {
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
        border-radius: 0;
    }

    ul {
        padding: 0;
        margin: 0;
        width: 100%;

        a {
            text-decoration: none;
            color: inherit;
        }
    }
</style>
