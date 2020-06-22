<template>
    <div class="task">
        <div v-if="currentExerciseIndex === exercises.length - 1" class="task__notice subtitle-lvl-3">
            Это последнее задание, не забудь вернуться и прорешать пропущенные!
        </div>
        <exercise
            v-if="exercises[currentExerciseIndex]"
            :exercise="exercises[currentExerciseIndex]"
            :key="currentExerciseIndex"
            @back="returnBack"
            @next="setNextTask"
            @right-answer="onRightAnswer"
            @wrong-answer="onWrongAnswer"
        />
        <div
            v-else
            class="task__finish"
        >
            <p class="task__finish-text subtitle-lvl-3">Правильных ответов {{ rightExerciseQty }} из {{ exercises.length }}</p>
        </div>
    </div>
</template>
<script>
    import Exercise from '@front/components/Exercise';

    export default {
        name: 'Task',
        props: ['exercises'],
        components: {
            Exercise
        },
        data() {
            return {
                currentExerciseIndex: 0,
            };
        },
        computed: {
            rightExerciseQty() {
                return this.exercises.reduce((qty, exercise) => {
                    return exercise.right ? ++qty : qty;
                }, 0)
            },
        },
        methods: {
            returnBack() {
                if (this.currentExerciseIndex) {
                    this.setPreventTask();
                } else {
                    this.$router.go(-1)
                }
            },
            onRightAnswer() {
                this.$set(this.exercises[this.currentExerciseIndex], 'done', true)
                this.$set(this.exercises[this.currentExerciseIndex], 'right', true)
                this.setNextTask();
            },
            onWrongAnswer() {
                this.$set(this.exercises[this.currentExerciseIndex], 'done', true)
                this.$set(this.exercises[this.currentExerciseIndex], 'right', false)
                this.setNextTask();
            },
            setNextTask() {
                this.currentExerciseIndex++;
            },
            setPreventTask() {
                this.currentExerciseIndex--;
            },
        },
    }
</script>
