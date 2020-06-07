<template>
    <div class="combination">
        <container
            group-name="combination"
            orientation="horizontal"
            behaviour="copy"
            :get-child-payload="itemIndex => getChildPayload('inputs', itemIndex)"
            @drop="onDrop('inputs', $event)"
            class="combination__inputs drag-container"
        >
            <draggable v-for="input in inputs" :key="input" class="combination__draggable-item drag-item">
                <div class="combination__item-content">
                    {{ input.content.text }}
                </div>
            </draggable>
        </container>
        <container
            group-name="combination"
            orientation="horizontal"
            remove-on-drop-out="true"
            :get-child-payload="itemIndex => getChildPayload('result', itemIndex)"
            @drop="onDrop('result', $event)"
            class="combination__result drag-container"
        >
            <div
                v-if="!result.length"
                class="combination__comment subtitle-lvl-3"
            >
                {{ comment }}
            </div>
            <draggable
                v-else
                v-for="item in result"
                :key="item"
                class="combination__draggable-item drag-item"
            >
                <div class="combination__item-content">
                    {{ item.content.text }}
                </div>
            </draggable>
        </container>
    </div>
</template>
<script>
    import { Container, Draggable } from 'vue-smooth-dnd'
    import { applyDrag } from '@front/utils/helpers'

    export default {
        name: 'Combination',
        props: ['inputs'],
        components: {
            Container,
            Draggable,
        },
        data() {
            return {
                //inputs: [],
                result: [],
                comment: 'Перетащи сюда блоки',
            };
        },
        created() {
            //this.inputs = [...this.exercise.inputs];
        },
        watch: {
            result() {
                this.$emit('result-update', this.result);
            },
        },
        methods: {
            getChildPayload (containerId, itemIndex) {
                return this[containerId][itemIndex]
            },
            onDrop(containerId, dropResult) {
                this.$set(this, containerId, applyDrag(this[containerId], dropResult));
            },
        },
    }
</script>
<style lang="scss" scoped>
    @import '@front/styles/_variables';
    @import '@front/styles/mixins/_typography';

    .combination {
        display: flex;
        flex-direction: column;
        align-content: center;

        /*&__inputs,*/
        /*&__result {*/
        /*    display: flex !important;*/
        /*    flex-wrap: wrap;*/
        /*    flex-grow: 1;*/
        /*    padding: 4rem;*/
        /*    margin-bottom: 2rem;*/
        /*    border-radius: 4rem;*/
        /*  box-shadow: inset 0 0 1rem rgba($black, .15);*/
        /*}*/

        &__inputs &__draggable-item {
            border-color: $orange;
        }

        &__result &__draggable-item {
            border-color: $green;
        }

        /*&__draggable-item {*/
        /*    margin: 1rem;*/
        /*    padding: 2rem;*/
        /*    border-radius: 2rem;*/
        //   background: $white;
            /*border-style: solid;*/
            /*border-width: .3rem;*/
            /*cursor: grab;*/
            /*user-select: none;*/
            /**/
            /*&:active {*/
            /*    cursor: grabbing;*/
            /*}*/
        /*}*/

        &__item-content {
            @include font-bold(2.4rem);
        }

        &__comment {
            text-align: center;
            color: $muted-grey;
        }
    }
</style>
