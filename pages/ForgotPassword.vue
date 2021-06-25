<template>
    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <div class="mb-4 text-sm text-gray-600">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
        </div>

        <div v-if="success" class="mb-4 font-medium text-sm text-green-600">
            {{ successMessage }}
        </div>

        <ValidationErrors :errors="getErrors" class="mb-4" />

        <form @submit.prevent="submit">
            <div>
                <Label for="email" value="Email" />
                <CustomInput
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autofocus
                />
            </div>

            <div class="flex items-center justify-end mt-4">
                <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Email Password Reset Link
                </Button>
            </div>
        </form>
    </AuthenticationCard>
</template>

<router>
{
  path: "/forgot-password",
  name: "forgotPassword"
}
</router>

<script>
import AuthenticationCard from '~/components/AuthenticationCard'
import AuthenticationCardLogo from '~/components/AuthenticationCardLogo'
import Button from '~/components/Button'
import CustomInput from '~/components/Input'
import Label from '~/components/Label'
import ValidationErrors from '~/components/ValidationErrors'

export default {
    components: {
        AuthenticationCard,
        AuthenticationCardLogo,
        Button,
        CustomInput,
        Label,
        ValidationErrors
    },

    layout: 'auth',
    auth: 'guest',

    data () {
        return {
            success: false,
            successMessage: '',
            form: {
                email: '',
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

    methods: {
        async submit () {
            this.form.processing = true

            await this.$axios.get('/sanctum/csrf-cookie').then(() => {
                this.$axios.post('/forgot-password', { ...this.form })
                    .then((response) => {
                        this.successMessage = response.data.message
                        this.success = true
                    })
                    .catch(({ response }) => {
                        if (response) {
                            this.errors = response.data.errors
                        }
                    })
                    .finally(() => {
                        this.form.processing = false
                        this.form.email = ''
                    })
            })
        }
    }
}
</script>
