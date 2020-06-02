<template>
    <div class="app-wrapper grid">
        <app-header />
        <app-main />
        <app-footer />
    </div>
</template>

<script>
    import { AppHeader, AppMain, AppFooter, SidePanel } from './components';

    export default {
        name: 'Layout',
        components: {
            AppHeader,
            AppMain,
            AppFooter,
            SidePanel,
        },
    };
</script>
