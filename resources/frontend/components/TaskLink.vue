<template>
    <router-link
        :to="{name: 'TaskPage', params: {id: task.id, action: this.user.id === task.authorId ? 'edit' : 'solve'}}"
        class="task-link"
        :class="`${this.user.id === task.authorId ? '_my-task' : ''}`"
    >
        <div class="task-link__img-wrapper" :style="`background-image: url(${task.categoryImg})`" />
        <div class="task-link__title">
            {{ task.title }}
        </div>
    </router-link>
</template>
<script>
    export default {
        name: 'TaskLink',
        props: {
            task: {
                type: Object,
                required: true,
            }
        },
        computed: {
            user() {
                return this.$store.getters.currentUser;
            }
        }
    }
</script>
<style lang="scss">
    @import '@front/styles/_variables';
    @import '@front/styles/mixins/_typography';

    .task-link {
        display: inline-block;
        padding: 1rem;
        border-radius: 2rem;
        border: .3rem dashed $white;
        transition: border-color .3s;

        &:hover {
            border-color: $grey;
        }

        &__img-wrapper {
            height: 14rem;
            width: 14rem;
            margin-bottom: 1rem;
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 50%;
        }

        &._my-task &__img-wrapper {
            position: relative;

            &::after {
                content: '';
                position: absolute;
                left: 1.2rem;
                bottom: 0;
                height: 3rem;
                width: 3rem;
                background: url(/frontend/assets/images/icons/pencil.png) center center/contain;
            }
        }

        &__title {
            @include font-semibold(1.8rem);
            text-align: center;
        }
    }
</style>
