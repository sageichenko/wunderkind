<template>
    <div class="index-page">
        <router-link :to="{name: 'Login'}" >
            Войти
        </router-link>

        <router-link :to="{name: 'Register'}" >
            Зарегистироваться
        </router-link>
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
