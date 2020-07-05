<template>
    <div class="register-page">
        <form ref="commonForm" class="form">
            <div class="form__row">
                <div class="text-input">
                    <input
                        type="text"
                        name="name"
                        v-model="name"
                        class="text-input__field"
                        placeholder="Введите имя"
                    >
                </div>
            </div>
            <div class="form__row">
                <div class="text-input">
                    <input
                        type="email"
                        name="email"
                        v-model="email"
                        class="text-input__field"
                        placeholder="Введите email"
                    >
                </div>
            </div>
            <div class="form__row">
                <div class="text-input">
                    <input
                        type="password"
                        name="password"
                        v-model="password"
                        class="text-input__field"
                        placeholder="Введите пароль"
                    >
                </div>
            </div>
            <common-select
                :options="{selectOptions: {teacher: 'Преподаватель', child: 'Ученик'}}"
                class="edit-task__select"
                @change="updateAccess"
            />
            <div class="form__row">
                <div
                    class="form__button form__submit"
                    @click="sendForm"
                >
                    Зарегистироваться
                </div>
            </div>
        </form>

    </div>
</template>
<script>
    import CommonSelect from '@front/components/Select';

    export default {
        name: 'RegisterPage',
        components: {
            CommonSelect,
        },
        data() {
            return {
                name: '',
                email: '',
                password: '',
                teacher: true,
                selectOptions: {
                    teacher: 'Преподаватель',
                    child: 'Ученик',
                }
            };
        },

        methods: {
            sendForm() {
                //const data = new FormData(this.$refs.commonForm);

                this.axios.post(
                    '/api/register',
                    {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        teacher: this.teacher,
                    },
                ).then((response) => {
                    console.log(response)
                    this.$router.push({ name: 'Login' })
                }).catch((err) => {
                    console.log(err)
                });
            },
            updateAccess(newValue) {
                this.teacher = newValue === 'teacher';
            }
        },
    }
</script>
<style lang="scss" scoped>
    @import '@front/styles/_variables';
    @import '@front/styles/mixins/_typography';

    .form {
        &__row {
            width: 100%;
            margin-bottom: 1.6rem;
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

        &__submit {
            background: $green;
        }
    }

    .text-input {
        position: relative;
        min-width: 100%;
        min-height: 6rem;

        &__field {
            min-width: 100%;
            min-height: 100%;
            max-width: 100%;
            max-height: 11rem;
            padding: 3rem 2rem 1rem;
            @include font-regular();
            color: $black;
            border: .1rem solid $grey;
            border-radius: 2rem;
            transition: .3s ease border-color;

            &:focus {
                outline: none;
                border-color: $black;
            }
        }
    }

</style>
