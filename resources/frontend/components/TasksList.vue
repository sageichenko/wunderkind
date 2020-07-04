<template>
    <div class="tasks">
        <div
            v-if="user.teacher"
            class="tasks__actions">
<!--            <div-->
<!--                class="tasks__my-tasks-checkbox"-->
<!--                :class="`${onlyMyTask ? '_checked' : ''}`"-->
<!--                @click="onlyMyTask = !onlyMyTask"-->
<!--            >-->
<!--                Показывать только мои задания-->
<!--            </div>-->
            <div
                class="tasks__button tasks__new-task-button"
                @click="createTask"
            >
                Создать задание
            </div>
        </div>
        <tabs :options="tabs" @change="setCategoryId" />
        <div class="task-list">
            <div
                v-for="task in tasks"
                :key="task"
                class="task-list__link-wrapper">
                <task-link :task="task" />
            </div>
            <div class="task-list__error" v-if="!tasks.length">
                Таких заданий нет
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
                onlyMyTask: false,
                categoryId: null,
            };
        },
        computed: {
            user() {
                return this.$store.getters.currentUser;
            },
            tasks() {
                return this.$store.getters.tasks;
            },
            categories() {
                return this.$store.getters.categories;
            },
            tabs() {
                const tabs = {};

                tabs.all = { text: 'Все', img: '/frontend/assets/images/tasks/category.png', active: !this.categoryId || this.categoryId === 'all' }
                this.categories.forEach((category) => {
                    tabs[category.id] = {
                        text: category.title,
                        img: category.image,
                        active: this.categoryId && this.categoryId === category.id,
                    }
                });

                return tabs;
            },
        },
        created() {
            this.getCategories();
            this.getDefaultTasks();
        },
        watch: {
            onlyMyTask() {
                this.updateTasks();
            },
            categoryId() {
                this.updateTasks();
            }
        },
        methods: {
            updateTasks() {
                const options = {};

                this.categoryId && this.categoryId !== 'all' ? options.categoryId = this.categoryId : '';
                this.onlyMyTask ? options.authorId = this.user._id : '';

                if (!Object.keys(options).length) {
                    this.getDefaultTasks();
                } else {
                    // this.$store.getters.tasksList(categoryId);
                    this.$store.dispatch('getTasks', options);
                }
            },
            setCategoryId(id) {
                this.categoryId = id;
            },
            getDefaultTasks() {
                this.$store.dispatch('getAllTasks');
            },
            getCategories() {
                this.$store.dispatch('setCategories');
            },
            createTask() {
                this.$router.push({name: 'TaskPage', params: {action: 'create'}});
            },
            getTasks() {
                this.axios.get('/get-tasks')
                    .then(function (response) {
                        console.log('response', response.data);
                    })
                    .catch(function (error) {
                        console.log('error', error);
                    });
            }
        },
    }
</script>
<style lang="scss">
    @import '@front/styles/_variables';
    @import '@front/styles/mixins/_typography';

    .tasks {
        &__button {
            display: inline-block;
            padding: 2rem;
            @include font-semibold(2rem);
            color: $white;
            border-radius: 3rem;
            cursor: pointer;
            user-select: none;
        }

        &__new-task-button {
            background: $green;
        }

        &__error {
            @include font-regular(2rem, 144%);
        }

        &__my-tasks-checkbox {
            position: relative;
            padding-left: 3rem;
            margin-bottom: 1rem;
            @include font-bold(1.6rem, 144%);
            cursor: pointer;

            &::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                width: 1.8rem;
                height: 1.8rem;
                background-color: $white;
                border-width: .1rem;
                border-color: $grey;
                border-style: solid;
                border-radius: 50%;
                transition: background-color .3s;
            }

            &._checked {
                &::before {
                    background-color: $green;
                }
            }
        }

        &__action {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }

    .task-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        &__link-wrapper {
            margin: 1rem;
        }
    }
</style>
