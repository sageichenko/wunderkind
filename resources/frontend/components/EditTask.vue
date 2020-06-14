<template>
    <div class="edit-task">
        <h2 class="edit-task__subtitle subtitle-lvl-4">
            На данной странице вы можете отредактировать упражнения в задании
        </h2>
        <div
            v-for="(exercise, index) in exercises"
            :key="(exercise, index)"
            class="edit-task__exercise-wrapper"
        >
            <edit-exercise
                :ref="index"
                :exercise="exercise"
                :num="index"
            />
        </div>

        <div class="edit-task__actions">
            <common-select
                :options="{selectOptions: {order: 'Расставить в правильном порядке', combination: 'Составить комбинацию'}}"
                class="edit-task__select"
                @change="updateNewExerciseType"
            />
            <div
                class="edit-task__button edit-task__add-button"
                @click="addExercise"
            >
                Добавить упражнение
            </div>
        </div>
    </div>
</template>
<script>
    import EditExercise from '@front/components/EditExercise';
    import CommonSelect from '@front/components/Select';

    export default {
        name: 'EditTask',
        props: ['exercises'],
        components: {
            EditExercise,
            CommonSelect,
        },
        data() {
            return {
                newExerciseType: 'order',
            };
        },
        methods: {
            addExercise() {
                this.$set(this.exercises, this.exercises.length, this.createExercise())
            },
            updateNewExerciseType(newType) {
                this.newExerciseType = newType;
            },
            createExercise() {
                return {
                    type: this.newExerciseType,
                    condition: '',
                    results: [],
                    inputs: [],
                }
            },
            getExercises() {
                const exercises = [];

                for (const index in this.$refs) {
                    if (!this.$refs.hasOwnProperty(index)) {
                        return;
                    }

                    exercises[index] = this.$refs[index][0].getExercise();
                }

                return exercises;
                //this.$store.dispatch('saveTask', )
            }
        },
    }
</script>
<style lang="scss">
    @import '@front/styles/_variables';
    @import '@front/styles/mixins/_typography';

    .edit-task {
        &__button {
            display: inline-block;
            padding: 2rem;
            @include font-semibold(2rem);
            color: $white;
            border-radius: 3rem;
            cursor: pointer;
            user-select: none;
        }

        &__add-button {
            background: $green;
        }

        &__actions {

        }

        &__select {
            max-width: 45rem;
            margin-bottom: 5rem;
        }
    }
</style>
