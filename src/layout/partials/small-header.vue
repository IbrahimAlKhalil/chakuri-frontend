<template>
    <div class="wrapper flex align-center justify-between">
        <div class="spacer"></div>

       <!--<el-popover placement="top-center" trigger="click" popper-class="popover" v-model="langPopoverVisible">
            <div slot="reference" class="pointer languages shadow">
                {{lang}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
            </div>
            <ul>
                <li v-for="(lang, index) in languages" :key="index" class="el-dropdown-menu__item"
                    @click="setLanguage(lang)">
                    {{lang.name}}
                </li>
            </ul>
        </el-popover>-->

        <div class="social-icons">
            <a href="https://www.facebook.com"><i class="fab fa-facebook-square"></i></a>
            <a href="https://www.twitter.com"><i class="fab fa-twitter-square"></i></a>
            <a href="https://www.youtube.com"><i class="fab fa-youtube-square"></i></a>
            <a href="https://www.linkedin.com"><i class="fab fa-linkedin"></i></a>
        </div>

        <div class="call shadow">
            <a href="tel:+8801923615789"><i class="fas fa-phone-square"></i>&nbsp;+8801923615789</a>
        </div>
    </div>
</template>

<!--<script>
    import {changeLanguage} from '@/i18n';
    import {elPopover} from '@/el';

    export default {
        data() {
            return {
                languages: [
                    {
                        code: 'bn',
                        name: 'বাংলা'
                    },

                    {
                        code: 'en',
                        name: 'English'
                    }
                ],

                lang: 'বাংলা',
                langPopoverVisible: false
            };
        },

        methods: {
            setLanguage(lang) {
                this.lang = lang.name;
                this.langPopoverVisible = false;
                changeLanguage(lang.code);
            }
        },

        components: {elPopover}
    }
</script>-->

<style lang="scss" scoped>
    @import "../../styles/var";

    .wrapper {
        background: $--color-secondary;
        height: 30px;
        color: #fff;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    .shadow {
        text-shadow: 0 0 1px #000;
    }

    .call {
        margin-right: 10px;
        font-size: .86rem;
    }

    .social-icons {
        font-size: 1.5rem;

        a {
            padding: 0 8px;

            &:hover {
                background: darken($--color-secondary, 10);
            }
        }
    }


    @media all and (min-width: $--md) {
        .spacer {
            margin-left: auto;
        }

        /*.languages {
            margin-right: 45px;
        }*/

        .social-icons {
            margin-right: 45px;
        }
    }
</style>
