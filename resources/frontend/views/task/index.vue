<template>
    <div class="task-page">
        <h1 class="task-page__title title">{{ task.title }}</h1>
        <component :task="task" :is="userPage" />
    </div>
</template>
<script>
    import ChildPage from './components/child/index'

    export default {
        name: 'TasksPage',
        props: ['id'],
        components: {
            ChildPage,
        },
        computed: {
            userPage() {
                return 'child-page';
            },
            task() {
                return this.$store.getters.task(this.id);
            }
        },
    }
</script>
<style lang="scss">
    .task-page {
        &__title {
            text-align: center;
        }
    }
</style>
