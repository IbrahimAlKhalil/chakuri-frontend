<template>
    <footer class="mt-auto">
        <div class="container">
            <div v-for="(menu, index) in menus" :key="index">
                <h3 class="title">{{menu.menuName}}</h3>
                <ul class="menu">
                    <li v-for="(item, index) in menu.items" :key="index">
                        <component :is="item.type==='page'?'router-link':'a'" v-bind="link(item)">
                            {{item.label}}
                        </component>
                    </li>
                </ul>
            </div>

            <div>
                <!--TODO: Make it dynamic-->
                <h3 class="title text-center">টুলস ও মিডিয়া</h3>
                <div class="social-icons ml-auto mr-auto">
                    <a class="google-play-link" href='https://play.google.com/store/apps/details?id=com.khidmatbd.mobile&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                        <img class="google-play-img"
                            alt='Get it on Google Play'
                            src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/>
                    </a>

                    <a target="_blank" href="https://www.facebook.com/Khidmat-BD-111721266951818/">
                        <i class="fab fa-facebook-square"/>
                    </a>

                    <a target="_blank" href="https://twitter.com/Khidmat18">
                        <i class="fab fa-twitter-square"/>
                    </a>

                    <a target="_blank" href="https://www.linkedin.com/in/khidmat-bd-92b952197/">
                        <i class="fab fa-linkedin"/>
                    </a>
                    <a target="_blank"
                       href="https://www.youtube.com/channel/UCO5Lv-izV4YTIKshb8ZxLcQ?view_as=subscriber">
                        <i class="fab fa-youtube-square"/>
                    </a>
                </div>


            </div>
        </div>
        <div class="small-footer mt-auto p-1">
            <small>{{copyright}}</small>
        </div>
    </footer>
</template>

<script>
    import {mapState} from 'vuex';
    import menuItem from '@/mixins/menu-item';

    export default {
        mixins: [menuItem],

        data() {
            return {
                copyright: ''
            };
        },

        computed: mapState({
            menus: state => ([state.menu['footer-1'], state.menu['footer-2']]),
        }),

        created() {
            this.$setting('copyright').then(text => {
                this.copyright = text;
            });
        }
    };
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    footer {
        background: $--color-secondary;
        color: #fff;
    }

    .container {
        display: grid;
        padding-top: 50px;
        justify-items: center;

        @media all and (min-width: $--md) {
            grid-template-columns: 3fr 3fr 4fr;
        }
    }

    .title {
        color: #fff;
        text-shadow: 0 0 1px #000;
    }

    .menu {
        padding: 0;
        list-style: none;

        a {
            display: inline-block;
            text-decoration: none;
            margin-top: 5px;
            color: #b2b2b2;
            text-shadow: 0 0 1px #000;
        }

        a:hover {
            color: #dedede;
        }
    }

    .social-icons {
        display: grid;
        grid-auto-flow: column;
        width: 210px;
        margin-top: 45px;
        grid-gap: 0 10px;
        justify-content: center;

        a {
            font-size: 2.8rem;
            text-align: center;

            &[href*="facebook.com"] {
                color: #3C5A99;
            }

            &[href*="twitter.com"] {
                color: #1DA1F2;
            }

            &[href*="linkedin.com"] {
                color: #0077B5;
            }

            &[href*="youtube.com"] {
                color: #FF0000;
            }
        }
    }

    .google-play-link {
        width: 160px;
    }

    .google-play-img {
        width: 100%;
    }

    .small-footer {
        margin-top: 25px;
        border-top: 1px groove #a8a8a8;
        text-align: center;
    }
</style>
