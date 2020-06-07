<template>
    <div class="exercise">
        <div class="exercise__condition">
            {{ exercise.condition }}
        </div>
        <component
            v-if="!exercise.done"
            :is="exerciseType"
            :inputs="exercise.inputs"
            @result-update="updateResult"
        />
        <div
            v-else
        >
            Ты уже решил эту задачу!
        </div>
        <div class="exercise__actions">
            <div
                class="exercise__button exercise__back-button"
                @click="returnBack"
            >
                Вернуться
            </div>
            <div
                v-if="!exercise.done"
                class="exercise__button exercise__answer-button"
                @click="confirmAnswer"
            >
                Ответить!
            </div>
            <div
                v-else
                class="exercise__button exercise__next-button"
                @click="next"
            >
                Дальше
            </div>
        </div>
    </div>
</template>
<script>
    import Order from '@front/components/exercisies/Order';
    import Combination from '@front/components/exercisies/Combination';
    import Find from '@front/components/exercisies/Find';

    export default {
        name: 'Exercise',
        props: ['exercise'],
        components: {
            Order,
            Combination,
            Find,
        },
        data() {
            return {
                result: [],
            };
        },
        created() {
            this.inputs = [...this.exercise.inputs];
        },
        computed: {
            exerciseType() {
                switch(this.exercise.type) {
                    case 'combination': return 'Combination';
                    case 'order': return 'Order';
                    case 'find': return 'Find';
                }
            },
        },
        methods: {
            confirmAnswer() {
                if (this.checkAnswer()) {
                    this.$set(this.exercise, 'answer', this.result)
                    this.$emit('right-answer');
                } else {
                    this.$emit('wrong-answer');
                }
            },
            updateResult(newResult) {
                this.result = [...newResult];
            },
            checkAnswer() {
                return this.exercise.results.some((result) => {
                    if (result.length !== this.result.length) return false;

                    return result.every((resultItem, index) => resultItem === this.result[index].id);
                });
            },
            returnBack() {
                this.$emit('back');
            },
            next() {
                this.$emit('next');
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '@front/styles/_variables';
    @import '@front/styles/mixins/_typography';

    .exercise {
        display: flex;
        flex-direction: column;
        align-content: center;

        &__condition {
            margin-bottom: 3rem;
            @include font-regular(1.6rem);
        }

        &__actions {
            display: flex;
            justify-content: space-between;
        }

        &__button {
            display: inline-block;
            padding: 2rem;
            @include font-semibold(2rem);
            color: $white;
            border-radius: 2rem;
            cursor: pointer;
            user-select: none;
        }

        &__answer-button,
        &__next-button {
            background: $green;
        }

        &__back-button {
            background: $red-orange;
        }
    }

</style>
