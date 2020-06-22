<template>
    <div class="task-page">
        <component v-if="user._id" :task="task" :is="userPage" />
        <index v-else />
    </div>
</template>
<script>
    import ChildPage from './components/child/index';
    import TeacherPage from './components/teacher/index';
    import Index from "@front/views/index/index";

    export default {
        name: 'TasksPage',
        props: ['id', 'action'],
        components: {
            ChildPage,
            TeacherPage,
            Index
        },
        data() {
            return {
                newTaskTemplate: {
                    title: '',
                    categoryId: '',
                    categoryImg: '',
                    authorId: '',
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
                    this.$set(this.newTaskTemplate, 'authorId', this.user._id)
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
