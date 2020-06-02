<template>
    <div class="task-page">
        <h1>Task Title</h1>
        <p>{{ $route.params.id }}</p>
        <component :is="userPage" />
    </div>
</template>
<script>
    import ChildPage from './components/child/index'

    export default {
        name: 'TasksPage',
        computed: {
            userPage() {
                return 'child-page';
            },
        },
    }
</script>
