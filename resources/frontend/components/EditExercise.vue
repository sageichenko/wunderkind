<template>
    <div class="edit-exercise">
        <h3 class="edit-exercise__subtitle subtitle-lvl-3">
            Упражнение {{ num+1 }}
        </h3>
        <div class="edit-exercise__condition-wrapper">
            <input
                v-model="exercise.condition"
                placeholder="Введите условие упражнения"
                type="text"
                class="edit-exercise__condition">
        </div>
        <component
            :is="exerciseType"
            :inputs="exercise.inputs"
            :result="currentResult"
            @result-update="updateResult"
            @input-update="updateInputs"
        />
        <div class="edit-exercise__actions">
            <div
                class="edit-exercise__button edit-exercise__add-result-button"
                @click="addResult"
            >
                Добавить ответ
            </div>
        </div>
        <div
            v-if="exercise.results.length"
            class="edit-exercise__comment subtitle-lvl-3"
            :class="`${isResultsOpen ? '_open' : ''}`"
            @click="toggleResults"
        >
            Возможные ответы
        </div>
        <div class="edit-exercise__results" :class="`${isResultsOpen ? '_open' : ''}`">
            <div
                v-for="(result, index) in exercise.results"
                :key="(result, index)"
                class="edit-exercise__result-wrapper">
                <container
                    group-name="results"
                    orientation="horizontal"
                    remove-on-drop-out="true"
                    :get-child-payload="itemIndex => getChildPayload(index, itemIndex)"
                    @drop="onDrop(index, $event)"
                    class="edit-exercise__result drag-container"
                >
                    <draggable
                        v-for="item in result"
                        :key="item"
                        class="edit-exercise__draggable-item drag-item"
                    >
                        <div class="edit-exercise__item-content">
                            {{ exercise.inputs[item].content.text || '...' }}
                        </div>
                    </draggable>
                </container>
                <div class="edit-exercise__result-actions">
                    <div
                        class="edit-exercise__button edit-exercise__remove-result-button"
                        @click="removeResult(index, $event)"
                    >
                        <img src="/frontend/assets/images/icons/delete.png"
                             alt="delete"
                             class="edit-exercise__img-button">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import EditOrder from '@front/components/exercisies/EditOrder';
    import EditCombination from '@front/components/exercisies/EditCombination';
    import EditFind from '@front/components/exercisies/EditFind';
    import { Container, Draggable } from 'vue-smooth-dnd';
    import { applyDrag } from '@front/utils/helpers';

    export default {
        name: 'EditExercise',
        props: ['exercise', 'num'],
        components: {
            EditOrder,
            EditCombination,
            EditFind,
            Container,
            Draggable,
        },
        data() {
            return {
                currentResult: [],
                relevantResult: [],
                resultsQty: 0,
                isResultsOpen: true,
            };
        },
        computed: {
            exerciseType() {
                switch(this.exercise.type) {
                    case 'combination': return 'EditCombination';
                    case 'order': return 'EditOrder';
                    case 'find': return 'EditFind';
                }
            },
        },
        methods: {
            addResult() {
                this.exercise.results.push(this.relevantResult);
                this.resultsQty++;
                this.currentResult = [];
                this.relevantResult = [];
            },
            removeResult(index) {
                this.exercise.results.splice(index, 1);
            },
            updateResult(result) {
                this.currentResult = result;
                this.relevantResult = [];
                this.currentResult.forEach((item) => {
                    this.relevantResult.push(item.id)
                });
            },
            updateInputs(inputs) {
                this.exercise.inputs = inputs;
            },
            toggleResults() {
                this.isResultsOpen = !this.isResultsOpen;
            },
            getChildPayload (containerId, itemIndex) {
                return this.exercise.results[containerId][itemIndex]
            },
            onDrop(containerId, dropResult) {
                this.$set(this.exercise.results, containerId, applyDrag(this.exercise.results[containerId], dropResult));
            },
            getExercise() {
                return this.exercise;
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import '@front/styles/_variables';
    @import '@front/styles/mixins/_typography';

    .edit-exercise {
        display: flex;
        flex-direction: column;
        align-content: center;
        margin: 3rem 0 5rem;
        padding-bottom: 3rem;
        border-bottom: .2rem solid $green;

        &__condition {
            width: 100%;
            padding: 1rem;
            margin-bottom: 3rem;
            @include font-regular(1.6rem);
            box-shadow: inset 0 0 1rem rgba($black, .15);
            border-radius: 1rem;
            border: none;
            outline: none;

            &::placeholder {
                color: $grey;
            }
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

        &__add-result-button {
            background: $green;
        }

        &__remove-result-button {
            position: absolute;
            top: -1.5rem;
            right: 4.5rem;
            padding: 0;
            width: 6rem;
        }

        &__img-button {
            max-width: 100%;
        }

        &__result-wrapper {
            position: relative;
        }

        &__results {
            height: 0;
            overflow: hidden;

            &._open {
                height: auto;
                overflow: visible;
            }
        }

        &__comment {
            display: inline-block;
            cursor: pointer;

            &::after {
                content: '';
                display: inline-block;
                height: 1rem;
                width: 1rem;
                transform: translateY(10%) rotate(45deg);
                border: .5rem solid $dark-grey-2;
                border-bottom-color: transparent;
                border-right-color: transparent;
            }

            &._open {
                &::after {
                    transform: translateY(-10%)  rotate(-135deg);
                }
            }
        }
    }

</style>
