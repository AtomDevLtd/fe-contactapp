<template>
    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <div class="mb-4 text-sm text-gray-600">
            This is a secure area of the application. Please confirm your password before continuing.
        </div>

        <ValidationErrors class="mb-4" />

        <form @submit.prevent="submit">
            <div>
                <Label for="password" value="Password" />
                <Input
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="current-password"
                    autofocus
                />
            </div>

            <div class="flex justify-end mt-4">
                <Button class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Confirm
                </Button>
            </div>
        </form>
    </AuthenticationCard>
</template>

<script>
import AuthenticationCard from '~/components/AuthenticationCard'
import AuthenticationCardLogo from '~/components/AuthenticationCardLogo'
import Button from '~/components/Button'
import Input from '~/components/Input'
import Label from '~/components/Label'
import ValidationErrors from '~/components/ValidationErrors'

export default {
    components: {
        AuthenticationCard,
        AuthenticationCardLogo,
        Button,
        Input,
        Label,
        ValidationErrors
    },

    data () {
        return {
            form: this.$inertia.form({
                password: ''
            })
        }
    },

    methods: {
        submit () {
            this.form.post(this.route('password.confirm'), {
                onFinish: () => this.form.reset()
            })
        }
    }
}
</script>
