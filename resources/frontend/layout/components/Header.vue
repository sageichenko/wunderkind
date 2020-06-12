<template>
    <div class="header-container">
        <router-link to="/" class="logo">
            <img src="/frontend/assets/images/logo.png" alt="" class="logo__img">
            <h1 class="logo__site-name">
                Wunderkind
            </h1>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'SiteHeader',
        data() {
            return {

            };
        },

        methods: {

        },
    };
</script>

<style lang="scss">
    @import '@front/styles/_variables';
    @import '@front/styles/mixins/_typography';

    .header-container {
        height: 10rem;
        background: $orange-yellow;
        border-bottom-left-radius: 3rem;
        border-bottom-right-radius: 3rem;
    }

    .logo {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 3rem;

        &__img {
            max-height: 100%;
        }

        &__site-name {
            @include font-pacifico(5rem);
            color: $muted-orange-yellow;
        }
    }
</style>
