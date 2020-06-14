<template>
    <div class="task-page">
        <component :task="task" :is="userPage" />
    </div>
</template>
<script>
    import ChildPage from './components/child/index';
    import TeacherPage from './components/teacher/index';

    export default {
        name: 'TasksPage',
        props: ['id', 'action'],
        components: {
            ChildPage,
            TeacherPage
        },
        data() {
            return {
                newTaskTemplate: {
                    title: '',
                    categoryId: '5ee60dbc7221000058002598',
                    categoryImg: '',
                    authorId: '5ee37858eb0b00000b0008cb',
                    exercises: [],
                }
            };
        },
        computed: {
            userPage() {
                return this.action === 'edit' || this.action === 'create' ? 'teacher-page' : 'child-page';
            },
            task() {
                if (this.action !== 'create') {
                    return this.$store.getters.task;
                } else {
                    this.$set(this.newTaskTemplate, 'authorId', this.user.id)
                    return this.newTaskTemplate;
                }
            },
            user() {
                return this.$store.getters.currentUser;
            }
        },
        created() {
            if (this.action !== 'create') {
                this.getTask();
            }
        },
        methods: {
            getTask() {
                this.$store.dispatch('getTask', this.id);
            },
        },
    }
</script>
