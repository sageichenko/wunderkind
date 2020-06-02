<template>
    <div class="child-task-page">
        <exercise :exercise="task.exercises[0]" />
    </div>
</template>
<script>
    import Exercise from '@front/components/Exercise';

    export default {
        name: 'ChildTaskPage',
        props: ['task'],
        components: {
            Exercise,
        }
    }
</script>
