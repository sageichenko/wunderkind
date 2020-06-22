<template>
    <div class="index-page">
        <h2 class="subtitle-lvl-4">Чтобы просматривать задания войдите в систему или зарегистрируйтесь</h2>
        <div class="index-page__links">
            <router-link class="button _enter" :to="{name: 'Login'}" >
                Войти
            </router-link>

            <router-link class="button _reg" :to="{name: 'Register'}" >
                Зарегистрироваться
            </router-link>
        </div>
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
<style lang="scss">
    @import '@front/styles/_variables';
    @import '@front/styles/mixins/_typography';

    .index-page {
        &__links {
            padding: 5rem 0;
        }
    }

    .button {
        display: inline-block;
        padding: 2rem;
        margin-right: 2rem;
        @include font-semibold(2rem);
        color: $white;
        border-radius: 3rem;
        cursor: pointer;
        user-select: none;

        &._enter {
            background: $green;
        }

        &._reg {
            background: $dark-grey-2;
        }
    }
</style>
