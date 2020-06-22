<template>
    <div class="login-page">
        <form ref="commonForm" class="form">
            <div v-if="showNotice">
                Похоже, вы не правильно ввели данные, попробуйте еще раз
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
                        type="text"
                        name="password"
                        v-model="password"
                        class="text-input__field"
                        placeholder="Введите пароль"
                    >
                </div>
            </div>
            <div class="form__row">
                <div
                    class="form__button form__submit"
                    @click="sendForm"
                >
                    Войти
                </div>
            </div>
        </form>

    </div>
</template>
<script>
    export default {
        name: 'LoginPage',
        data() {
            return {
                email: '',
                password: '',
                showNotice: false,
            };
        },

        methods: {
            sendForm() {
                //const data = new FormData(this.$refs.commonForm);
                this.showNotice = false;
                this.axios.post(
                    '/api/login',
                    {
                        email: this.email,
                        password: this.password,
                    },
                ).then((response) => {
                    localStorage.setItem('usertoken', response.data.token)
                    this.$store.dispatch('setUser');
                    this.email = ''
                    this.password = ''
                    this.$router.push({ name: 'TasksPage' })
                }).catch((err) => {
                    this.showNotice = true;
                    this.email = ''
                    this.password = ''
                    console.log(err)
                });
            },
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
