<template>
    <FormSection @submitted="updatePassword">
        <template #title>
            Update Password
        </template>

        <template #description>
            Ensure your account is using a long, random password to stay secure.
        </template>

        <template #form>
            <div class="col-span-6 sm:col-span-4">
                <Label for="current_password" value="Current Password" />
                <Input
                    id="current_password"
                    ref="current_password"
                    v-model="form.current_password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="current-password"
                />
                <InputError :message="form.errors.current_password" class="mt-2" />
            </div>

            <div class="col-span-6 sm:col-span-4">
                <Label for="password" value="New Password" />
                <Input
                    id="password"
                    ref="password"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                />
                <InputError :message="form.errors.password" class="mt-2" />
            </div>

            <div class="col-span-6 sm:col-span-4">
                <Label for="password_confirmation" value="Confirm Password" />
                <Input
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                />
                <InputError :message="form.errors.password_confirmation" class="mt-2" />
            </div>
        </template>

        <template #actions>
            <ActionMessage :on="form.recentlySuccessful" class="mr-3">
                Saved.
            </ActionMessage>

            <Button :class="{ 'opacity-25': form.processing }" :loading="form.processing">
                Save
            </Button>
        </template>
    </FormSection>
</template>

<script>
import ActionMessage from '~/components/ActionMessage'
import Button from '~/components/Button'
import FormSection from '~/components/FormSection'
import Input from '~/components/Input'
import InputError from '~/components/InputError'
import Label from '~/components/Label'

export default {
    components: {
        ActionMessage,
        Button,
        FormSection,
        Input,
        InputError,
        Label
    },

    data () {
        return {
            recentlySuccessfulTimeoutId: null,
            form: {
                current_password: '',
                password: '',
                password_confirmation: '',
                recentlySuccessful: false,
                errors: {}
            }
        }
    },

    methods: {
        async updatePassword () {
            this.form.processing = true
            this.form.errors = {}
            this.form.recentlySuccessful = false
            clearTimeout(this.recentlySuccessfulTimeoutId)

            await this.$axios.get('/sanctum/csrf-cookie').then(() => {
                this.$axios.put('/user/password', { ...this.form })
                    .then((response) => {
                        this.form.recentlySuccessful = true
                        this.form.processing = false
                        this.recentlySuccessfulTimeoutId = setTimeout(() => this.form.recentlySuccessful = false, 1000)
                    })
                    .catch(({ response }) => {
                        if (response) {
                            this.form.errors = response.data.errors

                            if (this.form.errors.password) {
                                this.form.password = ''
                                this.form.password_confirmation = ''
                                this.$refs.password.focus()
                            }

                            if (this.form.errors.current_password) {
                                this.form.current_password = ''
                                this.$refs.current_password.focus()
                            }
                        }
                        this.form.processing = false
                    })
                    .finally(() => {
                        this.form.processing = false
                        this.form.current_password = ''
                        this.form.password = ''
                        this.form.password_confirmation = ''
                    })
            })
        }
    }
}
</script>
