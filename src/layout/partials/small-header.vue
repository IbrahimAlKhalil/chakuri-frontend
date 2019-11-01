<template>
    <div class="wrapper flex align-center justify-between">
        <div class="spacer"></div>

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

        .social-icons {
            margin-right: 45px;
        }
    }
</style>
