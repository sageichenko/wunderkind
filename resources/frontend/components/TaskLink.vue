<template>
    <router-link
        :to="{name: 'TaskPage', params: {id: task.id}}"
        class="task-link">
        <h1 class="task-link__title">
            {{ task.title }}
        </h1>
    </router-link>
</template>
<script>
    export default {
        name: 'TaskLink',
        props: {
            task: {
                type: Object,
                required: true,
            }
        }
    }
</script>
