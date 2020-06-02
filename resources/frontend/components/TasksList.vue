<template>
    <div class="tasks">
        <tabs :options="tabs" @change="updateTasks" />
        <div class="tasks-list">
            <div
                v-for="task in tasks"
                :key="task"
                class="task-list__link-wrapper">
                <task-link :task="task" />
            </div>
        </div>
    </div>
</template>
<script>
    import Tabs from '@front/components/Tabs';
    import TaskLink from '@front/components/TaskLink'

    export default {
        name: 'TasksList',
        components: {
            Tabs,
            TaskLink,
        },
        data() {
            return {
                tabs: {
                    'all': { text: 'Все', img: '/frontend/assets/images/offices/taganrog/mini.jpg', active: true },
                    'math': { text: 'Математика', img: '/frontend/assets/images/offices/rostov/mini.jpg', active: false },
                    'english': { text: 'Английский', img: '/frontend/assets/images/offices/rostov/mini.jpg', active: false },
                    'logic': { text: 'Логические', img: '/frontend/assets/images/offices/rostov/mini.jpg', active: false },
                },
            };
        },
        computed: {
            tasks() {
                return this.$store.getters.tasks;
            }
        },
        created() {
            this.getDefaultTasks()
        },
        methods: {
            updateTasks(categoryId) {
                // ajax
                if (categoryId === 'all') {
                    console.log(this.tasks)
                    this.getDefaultTasks();
                    console.log(this.tasks)
                    console.log(this.$store)
                } else {
                    this.$store.getters.tasksList(categoryId);
                }
            },
            getDefaultTasks() {
                this.$store.getters.allTasksList;
            },
        },
    }
</script>
<style lang="scss">

</style>
