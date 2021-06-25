<template>
    <AuthenticationCard>
        <template #logo>
            <AuthenticationCardLogo />
        </template>

        <div class="mb-4 text-sm text-gray-600">
            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
        </div>

        <div v-if="verificationLinkSent" class="mb-4 font-medium text-sm text-green-600">
            A new verification link has been sent to the email address you provided during registration.
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between">
                <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Resend Verification Email
                </Button>

                <NuxtLink
                    to="/logout"
                    method="post"
                    as="button"
                    class="underline text-sm text-gray-600 hover:text-gray-900"
                >
                    Log Out
                </NuxtLink>
            </div>
        </form>
    </AuthenticationCard>
</template>

<script>
import AuthenticationCard from '~/components/AuthenticationCard'
import AuthenticationCardLogo from '~/components/AuthenticationCardLogo'
import Button from '~/components/Button'

export default {
    components: {
        AuthenticationCard,
        AuthenticationCardLogo,
        Button
    },

    props: {
        status: {
            type: String,
            default: null
        }
    },

    data () {
        return {
            form: this.$inertia.form()
        }
    },

    computed: {
        verificationLinkSent () {
            return this.status === 'verification-link-sent'
        }
    },

    methods: {
        submit () {
            this.form.post(this.route('verification.send'))
        }
    }
}
</script>
