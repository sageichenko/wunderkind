<template>
    <div class="teacher-task-page">
        <div class="teacher-task-page__header">
            <span class="teacher-task-page__back-link" @click="returnBack">
                вернуться
            </span>
            <input v-model="task.title" class="teacher-task-page__title title" placeholder="Название задания">
        </div>
        <file-input @change="updateImg" />
        <div class="teacher-task-page__img-wrapper" :style="`background-image: url(${imageSrc || task.categoryImg || '/frontend/assets/images/tasks/1.jpg'})`" />
        <div class="teacher-task-page__actions">
            <div
                class="teacher-task-page__button teacher-task-page__delete-button"
                @click="deleteTask"
            >
                Удалить задание
            </div>
        </div>
        <div class="teacher-task-page__category">
            <p class="teacher-task-page__category-caption text">Категория: {{ categoryName }}</p>
            <common-select v-if="!categoryName"
                :options="{selectOptions: categoryOptions}"
                class="edit-task__select"
                @change="updateCategory"
            />
        </div>
        <edit-task :exercises="task.exercises" ref="edit" />
        <div class="teacher-task-page__actions">
            <div
                class="teacher-task-page__button teacher-task-page__save-button"
                @click="saveTask"
            >
                Сохранить задание
            </div>
        </div>
        <message :message-text="messageText" @clear="messageText=''" />
    </div>
</template>
<script>
    import EditTask from '@front/components/EditTask';
    import FileInput from '@front/components/FileInput';
    import CommonSelect from '@front/components/Select';
    import Message from '@front/components/Message';

    export default {
        name: 'TeacherTaskPage',
        props: ['task'],
        components: {
            EditTask,
            FileInput,
            CommonSelect,
            Message,
        },
        data() {
            return {
                image: null,
                imageSrc: '',
                messageText: ''
            };
        },
        watch: {
            serverResponse(newValue) {
                this.messageText = newValue;
            }
        },
        computed: {
            categoryName() {
                let category = '';

                if (this.task.categoryId) {
                    category = this.categories.reduce((name, item) => {
                        if (item.id === this.task.categoryId) {
                            name = item.title;
                        }

                        return name;
                    }, '')
                }

                return category;
            },

            categories() {
                return this.$store.getters.categories;
            },

            serverResponse() {
                return this.$store.getters.serverResponse;
            },

            categoryOptions() {
                return this.categories.reduce((options, item) => {
                    options[item.id] = item.title;

                    return options;
                }, {
                    default: 'Выберите категорию'
                })
            },

            isTasksFilled() {
                return this.task.exercises.every(function(exercise) {
                    return exercise.condition
                        && exercise.inputs
                        && exercise.results
                        && exercise.inputs.length
                        && exercise.results.length;
                });
            }
        },
        methods: {
            returnBack() {
                this.$router.go(-1);
            },
            getExercises() {
                return this.$refs.edit.getExercises();
            },
            saveTask() {
                if(!this.task.title) {
                    this.messageText = 'Введите название задания!';
                    return;
                }
                this.$set(this.task, 'exercises', this.getExercises());
                if(!this.task.exercises.length || !this.isTasksFilled) {
                    this.messageText = 'Настройте упражнения!';
                    return;
                }
                this.$store.dispatch('saveTask', { task: this.task, image: this.image});
            },
            deleteTask() {
                this.$store.dispatch('deleteTask', this.task.id);
            },
            updateImg(file) {
                this.readImage(file);
                this.image = file;
            },
            readImage(file) {
                // Check if the file is an image.
                if (file.type && file.type.indexOf('image') === -1) {
                    console.log('File is not an image.', file.type, file);
                    return;
                }

                const reader = new FileReader();
                reader.addEventListener('load', (event) => {
                    this.imageSrc = event.target.result;
                });
                reader.readAsDataURL(file);
            },
            updateCategory(id) {
                this.task.categoryId = id;
            }
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

        &__img-wrapper {
            height: 14rem;
            width: 14rem;
            margin-bottom: 1rem;
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            border-radius: 50%;
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

        &__button {
            display: inline-block;
            padding: 2rem;
            @include font-semibold(2rem);
            color: $white;
            border-radius: 3rem;
            cursor: pointer;
            user-select: none;
        }

        &__save-button {
            background: $green;
        }

        &__delete-button {
            background: $pink-red;
        }
    }
</style>
