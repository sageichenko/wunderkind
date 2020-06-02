<template>
    <div class="index-page">
        <component :is="userPage" />
        <tasks-list />
        <test />
    </div>
</template>
<script>
    import Test from '@front/components/Test'
    import ChildPage from './components/Child/index'
    import TeacherPage from './components/Teacher/index'
    import TasksList from "@front/components/TasksList";

    export default {
        name: 'IndexPage',
        components: {
            Test,
            ChildPage,
            TeacherPage,
            TasksList,
        },
        computed: {
            userPage() {
                return 'ChildPage';
            },
        },
    }
</script>
