<template>
    <div class="login-page">
        <form ref="commonForm" class="form">
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
            };
        },

        methods: {
            sendForm() {
                //const data = new FormData(this.$refs.commonForm);

                this.axios.post(
                    '/api/login',
                    {
                        email: this.email,
                        password: this.password,
                    },
                ).then((response) => {
                    localStorage.setItem('usertoken', response.data.token)
                    this.email = ''
                    this.password = ''
                    this.$router.push({ name: 'TasksPage' })
                }).catch((err) => {
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
            border-radius: 3rem;
            cursor: pointer;
            user-select: none;
        }

        &__new-task-button {
            background: $green;
        }
    }

</style>
