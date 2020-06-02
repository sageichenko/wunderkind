<template>
    <div class="exercise">

        <container
            group-name="exercise"
            orientation="horizontal"
            class="exercise__inputs"
            behaviour="copy"
            :get-child-payload="itemIndex => getChildPayload('inputs', itemIndex)"
            @drop="onDrop('inputs', $event)"
        >
            <draggable v-for="input in inputs" :key="input">
                <div class="exercise__draggable-item">
                    {{ input.content.text }}
                </div>
            </draggable>
        </container>
        <container
            group-name="exercise"
            orientation="horizontal"
            class="exercise__result"
            remove-on-drop-out="true"
            :get-child-payload="itemIndex => getChildPayload('result', itemIndex)"
            @drop="onDrop('result', $event)"
        >
            <draggable v-for="item in result" :key="item">
                <div class="exercise__draggable-item">
                    {{ item.content.text }}
                </div>
            </draggable>
        </container>
    </div>
</template>
<script>
    import { Container, Draggable } from 'vue-smooth-dnd'
    import { applyDrag, generateItems } from '../utils/helpers'

    export default {
        name: 'Exercise',
        props: ['exercise'],
        components: {
            Container,
            Draggable,
        },
        data() {
            return {
                inputs: [],
                result: [],
            };
        },
        created() {
            this.inputs = [...this.exercise.inputs];
        },
        methods: {
            getChildPayload (containerId, itemIndex) {
                return this[containerId][itemIndex]
            },

            onDrop(containerId, dropResult) {
                this.$set(this, containerId, applyDrag(this[containerId], dropResult));
                console.log(containerId, this);
            }
        }
    }
</script>
<style lang="scss">
    @import '@front/styles/_variables';

    .exercise {
        &__inputs,
        &__result {
            padding: 4rem;
            border-radius: 4rem;
            box-shadow: inset 0 0 .5rem rgba($black, .1);
        }

        &__draggable-item {
            margin: 1rem;
            padding: 2rem;
            border-radius: 2rem;
            border: .3rem solid $orange;
            font-size: 1.8rem;
        }
    }
</style>
