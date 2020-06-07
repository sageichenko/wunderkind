<template>
    <div class="teacher-task-page">
        <div class="teacher-task-page__header">
            <span class="teacher-task-page__back-link" @click="returnBack">
                вернуться
            </span>
            <input v-model="task.title" class="teacher-task-page__title title" placeholder="Название задания">
        </div>
        <edit-task :exercises="task.exercises" />
    </div>
</template>
<script>
    import EditTask from '@front/components/EditTask';

    export default {
        name: 'TeacherTaskPage',
        props: ['task'],
        components: {
            EditTask,
        },
        methods: {
            returnBack() {
                this.$router.go(-1);
            },
        }
    }
</script>
<style lang="scss">
    @import '@front/styles/_variables';
    @import '@front/styles/mixins/_typography';

    .teacher-task-page {
        &__header {
            position: relative;
            text-align: center;
        }

        &__title {
            margin-bottom: 3rem;
            padding: 1rem;
            text-align: center;
            box-shadow: inset 0 0 1rem rgba($black, .15);
            border-radius: 1rem;
            border: none;
            outline: none;

            &::placeholder {
                color: $grey;
            }
        }

        &__back-link {
            position: absolute;
            top: 0;
            left: 0;
            padding-left: 2.4rem;
            @include font-regular(1.2rem);
            cursor: pointer;

            &::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                display: inline-block;
                height: 1.6rem;
                width: 1.6rem;
                background: url(/frontend/assets/images/icons/arrow_left_small.svg) center center/contain;
            }
        }
    }
</style>
