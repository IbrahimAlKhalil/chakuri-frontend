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
                                    <el-button-group class="btn-group">
                                        <el-button icon="el-icon-setting">Profile</el-button>
                                        <el-button icon="fas fa-sign-out-alt">Logout</el-button>
                                    </el-button-group>
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

        &::-webkit-scrollbar {
            width: 0;
        }
    }

    .header {
        img {
            width: 100px;
        }
    }

    .btn-group button {
        width: auto;
    }

    .box-card {
        min-height: 100vh;
    }
</style>

<script>
    import menuItem from './menu-item'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                icons: {
                    user: require('../../assets/images/user.svg')
                },
                show: false
            }
        },

        computed: mapState({
            menu: 'menu'
        }),

        methods: {
            toggleNav(what) {
                this.show = what
            }
        },
        components: {menuItem}
    }
</script>
