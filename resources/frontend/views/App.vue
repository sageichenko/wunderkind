<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'App',
    };
</script>
<style lang="scss">
    @import '@front/styles/_variables';
    @import '@front/styles/mixins/_typography';

    .drag-container {
        display: flex !important;
        flex-wrap: wrap;
        flex-grow: 1;
        padding: 4rem;
        margin-bottom: 2rem;
        border-radius: 4rem;
        box-shadow: inset 0 0 1rem rgba($black, .15);
    }

    .drag-item {
        margin: 1rem;
        padding: 2rem;
        border-radius: 2rem;
        background: $white;
        border-color: $orange-yellow;
        border-style: solid;
        border-width: .3rem;
        cursor: grab;
        user-select: none;

        &,
        & * {
            @include font-bold(2.4rem);
        }

        &:active {
            cursor: grabbing;
        }
    }
</style>
