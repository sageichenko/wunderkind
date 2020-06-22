<template>
    <div class="tasks-page">
        <tasks-list v-if="user._id" />
        <index v-else />
    </div>
</template>
<script>
    import TasksList from "@front/components/TasksList";
    import Index from "@front/views/index/index";

    export default {
        name: 'TasksPage',
        components: {
            TasksList,
            Index,
        },
        computed: {
            user() {
                return this.$store.getters.currentUser;
            }
        }
    }
</script>
