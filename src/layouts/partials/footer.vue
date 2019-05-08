<template>
    <footer class="mt-auto flex flex-wrap">
        <div class="flex flex-wrap-md container w-100">
            <div class="w-100">
                <h3 class="title">
                    Menu 1 Title
                </h3>
                <ul class="menu">
                    <li v-for="i in 6" :key="i">
                        <router-link to="/">
                            Item Abcd Teds {{ i }}
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="w-100">
                <h3 class="title">
                    Menu 2 Title
                </h3>
                <ul class="menu">
                    <li v-for="i in 6" :key="i">
                        <router-link to="/">
                            Item Abcd Teds {{ i }}
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="w-100">
                <h3 class="title">
                    Follow Us
                </h3>
            </div>
        </div>
        <div class="small-footer w-100 mt-auto p-1">
            <small>&copy; Copyright SaharaIT&trade; all rights reserved</small>
        </div>
    </footer>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
    @import "../../styles/var";

    footer {
        background: $--color-secondary;
        color: #fff;
    }

    .container {
        @media screen and (min-width: $__md) {
            padding: 10px 300px 0;
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

    .small-footer {
        margin-top: 25px;
        border-top: 1px groove #a8a8a8;
        text-align: center;
    }
</style>
