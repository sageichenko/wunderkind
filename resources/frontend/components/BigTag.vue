<template>
    <div class="big-tag" :class="`${options.active ? '_active' : ''} ${options.empty ? '_empty' : ''}`" @click="select">
        <span v-if="options.text" class="big-tag__text">{{ options.text }}</span>
        <span v-if="options.number" class="big-tag__number">{{ options.number }}</span>
        <div v-if="options.img || options.empty" class="big-tag__img-wrapper">
            <img v-if="options.img" :src="options.img" :alt="options.text" class="big-tag__img">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BigTag',
        props: {
            options: {
                type: Object,
                default: function() {
                    return {};
                },
            },
        },
        methods: {
            select() {
                if (this.options.empty) {
                    return;
                }
                this.$emit('select', this.options.id);
            },
        },
    };
</script>

<style lang="scss">
    @import "@front/styles/_variables.scss";
    @import "@front/styles/mixins/_typography.scss";

    .big-tag {
        display: inline-flex;
        align-items: center;
        height: 4.8rem;
        padding: 1.4rem 2.4rem;
        cursor: pointer;
        border-radius: 3rem;
        background-color: $light-grey;
        transition: background-color .3s;

        .dark & {
            background-color: $dark-grey;
            color: $white;
        }

        &:hover {
            background-color: $orange-yellow;
            color: $black;
        }

        &._empty {
            background-color: transparent;
            border: .1rem dashed $light-grey;
            color: $white;

            .dark & {
                border-color: $dark-grey;
            }
        }

        &._active {
            background-color: $yellow;
            color: $black !important;
        }

        &__text {
            @include font-bold(1.6rem, 144%);
            background: transparent;
            color: inherit;
        }

        &__number {
            width: 2.4rem;
            height: 2.4rem;
            margin-left: .8rem;
            @include font-bold(1.4rem, 2.4rem);
            text-align: center;
            background-color: $white;
            border-radius: 50%;
        }

        &__img-wrapper {
            display: flex;
            justify-content: center;
            width: 3.2rem;
            height: 3.2rem;
            margin-left: .8rem;
            border-radius: 50%;
            background: $light-grey;
            overflow: hidden;

            .dark & {
                background: $dark-grey;
            }
        }

        &__img {
            height: 100%;
        }
    }

</style>
