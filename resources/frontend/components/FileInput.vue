<template>
    <div class="file-input" :class="validClass">
        <input
            id="file"
            name="file"
            type="file"
            class="file-input__field"
            @change="onInputChange"
            accept=".jpg, .jpeg, .png"
        >
        <label class="file-input__label" for="file">Прикрепить файл</label>
    </div>
</template>
<script>
    export default {
        name: 'FileInput',
        data() {
            return {
                fileLimitExhausted: false,
                errorMessage: '',
                validClass: '',
                attachedFiles: [],
                categoryImg: '',
            };
        },
        created() {
            this.files = [];
        },
        methods: {
            onInputChange(ev) {
                let file = ev.target.files[0];

                this.categoryImg = file.fileName;

                this.$emit('change', file);
            },
        },
    };
</script>
<style lang="scss">
    @import "@front/styles/_variables.scss";
    @import "@front/styles/mixins/_typography.scss";

    .file-input {
        position: relative;
        text-align: left;

        &__field {
            width: .01rem;
            height: .01rem;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
        }

        &__label {
            position: relative;
            display: inline-block;
            @include font-regular();
            cursor: pointer;
            border: .1rem solid $grey;
            padding: .8rem 2rem .8rem 4rem;
            border-radius: .4rem;
            background-color: $grey;
            background-image: url('/frontend/assets/images/icons/attach.svg');
            background-repeat: no-repeat;
            background-position: 1.2rem .9rem;
            background-size: 1.6rem;
            transition: .3s ease border-color;
        }

        &__file-container {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            align-items: center;
            margin-top: 1.6rem;
        }
    }

    .file-input-file {
        display: flex;
        align-items: center;
        width: 98%;
        margin-right: 2%;
        margin-bottom: .6rem;

        @media #{$phone475} {
            width: 46%;
        }

        &__remove-btn {
            flex-shrink: 0;
            width: 2.4rem;
            height: 2.4rem;
            background: url('/frontend/assets/images/icons/close_small_black.svg');
            margin-right: .6rem;
            cursor: pointer;
            border: none;
            text-decoration: none;
            -webkit-appearance: none;
            -moz-appearance: none;
        }

        &__name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 1.4rem;
        }
    }
</style>
