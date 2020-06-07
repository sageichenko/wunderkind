<template>
    <div class="app-main grid">
        <router-view :key="key" />
    </div>
</template>

<script>
    export default {
        name: 'AppMain',
        computed: {
            key() {
                return this.$route.fullPath;
            },
        },
    };
</script>
<style lang="scss">
    @import '@front/styles/_variables';

    .app-main {
        padding-top: 2rem;
        padding-bottom: 5rem;
        margin-top: 5rem;
        margin-bottom: 10rem;
        background: $white;
        border-radius: 3rem;
    }
</style>
