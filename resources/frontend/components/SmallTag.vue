<template>
    <div class="small-tag">
        <span class="small-tag__text">{{ tagText }}</span>
    </div>
</template>

<script>
    export default {
        name: 'SmallTag',
        props: {
            tagText: {
                type: String,
                default: '',
                required: true,
            },
        },
    };
</script>

<style lang="scss">
    @import "@front/styles/_variables.scss";
    @import "@front/styles/mixins/_typography.scss";

    .small-tag {
        display: inline-block;
        height: 3.6rem;
        padding: .8rem 2rem;
        text-align: center;
        border-radius: .4rem;
        background-color: $light-grey;
        transition: background-color .3s;

        &:hover {
            background-color: $orange-yellow;
        }

        &__text {
            @include font-regular();
        }
    }

</style>
