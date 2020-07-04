<template>
    <div v-show="messageText" class="message-box">
        <span class="message-box__text">{{ messageText }}</span>
        <div @click="$emit('clear')" class="message-box__ok">Ok</div>
    </div>
</template>

<script>
    export default {
        name: 'SmallTag',
        props: {
            messageText: {
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

    .message-box {
        position: fixed;
        bottom: 0;
        right: 0;
        max-width: 32rem;
        padding: .8rem 2rem;
        border-radius: .4rem;
        background-color: $light-grey;
        transition: background-color .3s;

        &__text {
            @include font-regular();
        }

        &__ok {
            background-color: $green;
            @include font-regular();
            color: $white;
        }
    }

</style>
