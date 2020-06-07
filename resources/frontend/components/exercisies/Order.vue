<template>
    <div>
        <container
            group-name="order"
            orientation="horizontal"
            :get-child-payload="itemIndex => getChildPayload('inputs', itemIndex)"
            @drop="onDrop('inputs', $event)"
            class="order__inputs drag-container"
        >
            <draggable
                v-for="input in inputs"
                :key="input"
                class="order__draggable-item drag-item">
                <div class="order__item-content">
                    {{ input.content.text }}
                </div>
            </draggable>
        </container>
    </div>
</template>
<script>
    import { Container, Draggable } from 'vue-smooth-dnd'
    import { applyDrag } from '@front/utils/helpers'

    export default {
        name: 'Order',
        props: ['inputs'],
        components: {
            Container,
            Draggable,
        },
        data() {
            return {
                //inputs: [],
            };
        },
        watch: {
            inputs() {
                this.$emit('result-update', this.inputs);
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

    .order {
        display: flex;
        flex-direction: column;
        align-content: center;

        /*&__inputs {*/
        /*    display: flex !important;*/
        /*    flex-wrap: wrap;*/
        /*    flex-grow: 1;*/
        /*    padding: 4rem;*/
        /*    margin-bottom: 2rem;*/
        /*    border-radius: 4rem;*/
        //    box-shadow: inset 0 0 1rem rgba($black, .15);
        /*}*/

        &__inputs &__draggable-item {
            border-color: $pink-red;
        }

        /*&__draggable-item {*/
        /*    margin: 1rem;*/
        /*    padding: 2rem;*/
        /*    border-radius: 2rem;*/
        //    background: $white;
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
