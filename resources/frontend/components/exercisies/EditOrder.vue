<template>
    <container
        group-name="edit-order"
        orientation="horizontal"
        :get-child-payload="itemIndex => getChildPayload('result', itemIndex)"
        @drop="onDrop('result', $event)"
        class="edit-order__inputs drag-container"
    >
        <draggable
            v-for="(input, index) in result"
            :key="(input, index)"
            class="edit-order__draggable-item drag-item"
        >
            <div class="edit-order__item-content" @dblclick="editInput(index, $event)">
                {{ input.content.text || '...' }}
            </div>
        </draggable>
        <div
            class="edit-order__add-input-button drag-item"
            @click="addInput"
        >
            <img src="/frontend/assets/images/icons/plus.png" alt="Добавить" class="edit-order__add-input-img">
        </div>
        <div v-if="result.length" class="edit-input" :class="`${isEditOpen ? '_open' : '' }`">
            <input
                v-model="result[currentEditableInputIndex].content.text"
                placeholder="Введите значение"
                type="text"
                class="edit-input__input">
            <div
                class="edit-input__remove-result-button"
                @click="closeEdit"
            >
                <img src="/frontend/assets/images/icons/ok.png"
                     alt="Ok"
                     class="edit-input__img-button">
            </div>
        </div>
    </container>
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
                result: [],
                currentEditableInputIndex: 0,
                isEditOpen: false,
            };
        },
        created() {
            this.result = [...this.inputs];
        },
        watch: {
            result() {
                this.$emit('result-update', this.result);
                //this.$emit('input-update', this.result);
            },
        },
        methods: {
            getChildPayload (containerId, itemIndex) {
                return this[containerId][itemIndex]
            },
            onDrop(containerId, dropResult) {
                this.$set(this, containerId, applyDrag(this[containerId], dropResult));
            },
            addInput() {
                this.result.push(this.createInput())
            },
            createInput() {
                return {
                    id: this.inputs.length,
                    content: {
                        image: '',
                        text: '',
                    }
                }
            },
            editInput(index) {
                this.currentEditableInputIndex = index;
                this.openEdit();
            },
            openEdit() {
                this.isEditOpen = true;
            },
            closeEdit() {
                this.$emit('input-update', this.result);
                this.isEditOpen = false;
            },
        },
    }
</script>
<style lang="scss">
    @import '@front/styles/_variables';
    @import '@front/styles/mixins/_typography';

    .edit-order {
        display: flex;
        flex-direction: column;
        align-content: center;

        &__item-content {
            @include font-bold(2.4rem);
        }

        &__comment {
            text-align: center;
            color: $muted-grey;
        }

        &__inputs &__item-content {
            cursor: text;
        }

        &__add-input-img {
            max-width: 2rem;
        }

        &__add-input-button {
            cursor: copy;
        }
    }

    .edit-input {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 0;
        padding: 0 3rem;
        overflow: hidden;
        background: $white;
        border-bottom-left-radius: 2rem;
        border-bottom-right-radius: 2rem;
        box-shadow:
            1rem 1rem 1rem -1rem rgba($black, 0.15),
            -1rem .5rem 1rem -1rem rgba($black, 0.15);
        transition: height .2s, padding .2s;

        &._open {
            height: 15rem;
            padding: 3rem;
        }

        &__input {
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

        &__remove-result-button {
            height: 3.2rem;
            cursor: pointer;
            user-select: none;
        }

        &__img-button {
            max-height: 100%;
            max-width: 100%;
        }
    }
</style>
