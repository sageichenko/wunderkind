<template>
    <div class="child-task-page">
        <div class="child-task-page__header">
            <span class="child-task-page__back-link" @click="returnBack">
                вернуться
            </span>
            <h1 class="child-task-page__title title">{{ task.title }}</h1>
        </div>
        <task :exercises="task.exercises" />
    </div>
</template>
<script>
    import Task from '@front/components/Task';

    export default {
        name: 'ChildTaskPage',
        props: ['task'],
        components: {
            Task,
        },
        methods: {
            returnBack() {
                this.$router.go(-1);
            },
        }
    }
</script>
<style lang="scss">
    @import '@front/styles/mixins/_typography';

    .child-task-page {
        &__header {
            position: relative;
            text-align: center;
        }

        &__title {
            text-align: center;
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
