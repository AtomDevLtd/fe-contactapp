<template>
    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <ValidationErrors :errors="getErrors" class="mb-4" />

        <form v-if="! success" @submit.prevent="submit">
            <div>
                <Label for="email" value="Email" />
                <Input
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autofocus
                    disabled
                />
            </div>

            <div class="mt-4">
                <Label for="password" value="Password" />
                <Input
                    id="password"
                    ref="password"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="new-password"
                />
            </div>

            <div class="mt-4">
                <Label for="password_confirmation" value="Confirm Password" />
                <Input
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="new-password"
                />
            </div>

            <div class="flex items-center justify-end mt-4">
                <Button :class="{ 'opacity-25': form.processing }" :loading="form.processing">
                    Reset Password
                </Button>
            </div>
        </form>

        <div v-else>
            <h1 class="text-2xl text-center">
                {{ successMessage }}
            </h1>
            <div class="flex justify-center my-3">
                <BaseTimer
                    :should-timer-start="shouldTimerStart"
                    @timer-has-finished="onTimerHasFinished"
                />
            </div>
            <p class="text-center">
                You will be redirected to the
                <NuxtLink :to="{ name: 'login' }">
                    Login
                </NuxtLink>
                page soon
            </p>
        </div>
    </AuthenticationCard>
</template>

<router>
{
  path: "/reset-password/",
  name: "ResetPassword"
}
</router>

<script>
import AuthenticationCard from '~/components/AuthenticationCard'
import AuthenticationCardLogo from '~/components/AuthenticationCardLogo'
import Button from '~/components/Button'
import Input from '~/components/Input'
import Label from '~/components/Label'
import ValidationErrors from '~/components/ValidationErrors'
import BaseTimer from '~/components/BaseTimer'

export default {
    components: {
        AuthenticationCard,
        AuthenticationCardLogo,
        Button,
        Input,
        Label,
        ValidationErrors,
        BaseTimer
    },

    layout: 'auth',
    auth: 'guest',

    data () {
        return {
            success: false,
            successMessage: '',
            shouldTimerStart: false,
            form: {
                token: '',
                email: '',
                password: '',
                password_confirmation: '',
                processing: false
            },
            errors: {}
        }
    },

    computed: {
        getErrors () {
            return this.errors
        }
    },

    mounted () {
        if (this.$route.query.token && this.$route.query.email) {
            this.form.token = this.$route.query.token
            this.form.email = this.$route.query.email
        } else {
            alert('Missing required parameters')
            this.$router.push({
                name: 'login'
            })
        }
    },

    methods: {
        onTimerHasFinished () {
            this.$router.push({
                name: 'login'
            })
        },

        async submit () {
            this.form.processing = true

            await this.$axios.get('/sanctum/csrf-cookie').then(() => {
                this.$axios.post('/reset-password', { ...this.form })
                    .then((response) => {
                        this.successMessage = response.data.message
                        this.success = true
                        this.shouldTimerStart = true
                    })
                    .catch(({ response }) => {
                        if (response) {
                            this.errors = response.data.errors
                            this.form.password = ''
                            this.form.password_confirmation = ''
                            this.$refs.password.focus()
                        }
                    })
                    .finally(() => {
                        this.form.processing = false
                    })
            })
        }
    }
}
</script>
