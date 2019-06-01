<template>
    <footer class="mt-auto">
        <div class="container">
            <div>
                <h3 class="title">আমাদের সম্পর্কে</h3>
                <ul class="menu">
                    <li v-for="i in 6" :key="i">
                        <router-link to="/">
                            Item Abcd Teds {{ i }}
                        </router-link>
                    </li>
                </ul>
            </div>

            <div>
                <h3 class="title">ব্যবহারকারীদের প্রশ্ন</h3>
                <ul class="menu">
                    <li v-for="i in 6" :key="i">
                        <router-link to="/">
                            Item Abcd Teds {{ i }}
                        </router-link>
                    </li>
                </ul>
            </div>

            <div>
                <h3 class="title text-center">টুলস ও মিডিয়া</h3>
                <div class="social-icons ml-auto mr-auto">
                    <a href="https://www.facebook.com">
                        <i class="fab fa-facebook-square"></i>
                    </a>

                    <a href="https://www.twitter.com">
                        <i class="fab fa-twitter-square"></i>
                    </a>

                    <a href="https://www.linkedin.com">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="https://www.youtube.com">
                        <i class="fab fa-youtube-square"></i>
                    </a>
                </div>


            </div>
        </div>
        <div class="small-footer mt-auto p-1">
            <small>&copy; Copyright SaharaIT&trade; all rights reserved</small>
        </div>
    </footer>
</template>

<script>
    export default {};
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
    }

    .social-icons {
        display: grid;
        grid-auto-flow: column;
        width: 210px;
        margin-top: 45px;

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

    .small-footer {
        margin-top: 25px;
        border-top: 1px groove #a8a8a8;
        text-align: center;
    }
</style>
