<template>
    <FormSection @submitted="updateProfileInformation">
        <template #title>
            Profile Information
        </template>

        <template #description>
            Update your account's profile information and email address.
        </template>

        <template #form>
            <!-- Name -->
            <div class="col-span-6 sm:col-span-4">
                <Label for="name" value="Name" />
                <Input id="name" v-model="form.name" type="text" class="mt-1 block w-full" autocomplete="name" />
                <InputError :message="form.errors.name" class="mt-2" />
            </div>

            <!-- Email -->
            <div class="col-span-6 sm:col-span-4">
                <Label for="email" value="Email" />
                <Input id="email" v-model="form.email" type="email" class="mt-1 block w-full" />
                <InputError :message="form.errors.email" class="mt-2" />
            </div>
        </template>

        <template #actions>
            <ActionMessage :on="form.recentlySuccessful" class="mr-3">
                Saved.
            </ActionMessage>

            <Button :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                Save
            </Button>
        </template>
    </FormSection>
</template>

<script>
import Button from '~/components/Button'
import FormSection from '~/components/FormSection'
import Input from '~/components/Input'
import InputError from '~/components/InputError'
import Label from '~/components/Label'
import ActionMessage from '~/components/ActionMessage'

export default {
    components: {
        ActionMessage,
        Button,
        FormSection,
        Input,
        InputError,
        Label
    },

    props: {
        user: {
            type: Object,
            default: null
        }
    },

    data () {
        return {
            recentlySuccessfulTimeoutId: null,
            form: {
                name: this.user.name,
                email: this.user.email,
                photo: null,
                recentlySuccessful: false,
                errors: {}
            },
            photoPreview: null
        }
    },

    methods: {
        async updateProfileInformation () {
            this.form.processing = true
            this.form.errors = {}
            this.form.recentlySuccessful = false
            clearTimeout(this.recentlySuccessfulTimeoutId)

            await this.$axios.get('/sanctum/csrf-cookie').then(() => {
                this.$axios.put('/user/profile-information', { ...this.form })
                    .then((response) => {
                        this.form.recentlySuccessful = true
                        this.$auth.fetchUser()
                        this.recentlySuccessfulTimeoutId = setTimeout(() => this.form.recentlySuccessful = false, 2000)
                    })
                    .catch(({ response }) => {
                        if (response) {
                            this.form.errors = response.data.errors
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
