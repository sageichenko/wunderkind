<template>
    <div class="select-wrap">
        <div
            class="select"
            :class="{_filled: selectedOption, _open: isOpen}"
            @click="isOpen = !isOpen"
        >
            <div class="select__selected select__row">
                {{ selected }}
            </div>
            <div class="select__options">
                <div
                    v-for="(text, id) in enabledOptions"
                    :key="(text, id)"
                    class="select__option select__row"
                    @click="selectItem(id)"
                >
                    {{ text }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CommonSelect',
        props: {
            options: {
                type: Object,
                default: () => {},
            },
        },
        data() {
            return {
                selectedOption: this.options.selectOptions.default ? null : this.getNotDefaultOptions()[0],
                isOpen: false,
                defaultOptions: {
                    selectOptions: {
                        default: 'Нет доступных вариантов',
                        defaultIsEnabled: false,
                    },
                },
            };
        },
        computed: {
            selected() {
                return this.options.selectOptions[this.selectedOption] ||
                    this.options.selectOptions.default ||
                    this.options.selectOptions[this.getNotDefaultOptions()[0]];
            },
            enabledOptions() {
                const enabledOptions = {};

                for (const key in this.options.selectOptions) {
                    if (!this.options.selectOptions.hasOwnProperty(key)) {
                        return;
                    }

                    if (!this.selectedOption && key !== 'default' || this.selectedOption && key !== this.selectedOption) {
                        enabledOptions[key] = this.options.selectOptions[key];
                    }
                }

                return enabledOptions;
            },
        },
        created() {
            this.options = Object.assign(this.defaultOptions, this.options);
        },
        methods: {
            selectItem(optionId) {
                if (optionId !== 'default' || optionId === 'default' && this.options.defaultIsEnabled) {
                    this.selectedOption = optionId;
                    this.$emit('change', optionId);
                } else {
                    this.selectedOption = null;
                    this.$emit('change', '');
                }
            },
            getNotDefaultOptions() {
                return Object
                    .keys(this.options.selectOptions)
                    .filter((key) => key !== 'default');
            },
        },
    };
</script>

<style lang="scss">
    @import "@front/styles/_variables.scss";
    @import "@front/styles/mixins/_typography.scss";

    .select-wrap {
        position: relative;
        z-index: 100;
        height: 6rem;
        min-width: 28rem;

        @media #{$tablet} {
            min-width: 30rem;
        }
    }

    .select {
        position: absolute;
        min-height: 100%;
        width: 100%;
        background: $white;
        border-radius: 2rem;
        cursor: pointer;
        box-shadow: inset 0 0 1rem rgba($black, .15);
        transition: border-color .3s;

        &::after {
            content: '';
            position: absolute;
            top: 2rem;
            right: 1.6rem;
            height: 2.4rem;
            width: 2.4rem;
            transform: rotateZ(90deg);
            background-image: url(/frontend/assets/images/icons/chevron_right_small_grey.svg);
            background-position: center center;
            background-repeat: no-repeat;
        }

        &__options {
            height: 0;
            overflow: hidden;
        }

        &__row {
            padding-left: 2.4rem;
            padding-right: 5.6rem;
            @include font-regular();
            color: $dark-grey-2;
            transition: color .3s;
        }

        &__selected {
            padding-top: 2rem;
            padding-bottom: 2rem;
        }

        &__option {
            padding-top: 1rem;
            padding-bottom: 1rem;
        }

        &._filled &__row{
            color: $black;
        }

        @media #{$phone-strict},
        #{$tablet-strict} {
            &._open:after {
                transform: rotateZ(-90deg);
            }

            &._open &__options {
                height: auto;
                padding-top: 1rem;
                padding-bottom: 1rem;
            }

            &._open &__selected {
                border-bottom: .2rem solid $muted-grey;
            }

            &._open &__row {
                color: $black;
            }
        }

        @media #{$desktop} {
            &:hover {
                border-color: $black;
                &::after {
                    transform: rotateZ(-90deg);
                }
            }

            &:hover &__options {
                height: auto;
                padding-top: 1rem;
                padding-bottom: 1rem;
            }

            &:hover &__selected {
                border-bottom: .2rem solid $muted-grey;
            }

            &:hover &__row {
                color: $black;
            }
        }
    }

</style>
