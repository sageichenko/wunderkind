<template>
    <div class="tasks-page">
        <tasks-list />
    </div>
</template>
<script>
    import TasksList from "@front/components/TasksList";

    export default {
        name: 'TasksPage',
        components: {
            TasksList,
        }
    }
</script>
