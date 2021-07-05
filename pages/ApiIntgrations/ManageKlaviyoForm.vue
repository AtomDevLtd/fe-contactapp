<template>
    <FormSection @submitted="manageKey">
        <template #title>
            Klaviyo Integration
        </template>

        <template #description>
            <p>
                Manage your account's Klaviyo API Key.
            </p>

            <SecondaryButton
                v-show="user.klaviyo_api_key"
                class="mt-5"
                :class="{ 'opacity-25': form.processing }"
                :loading="form.processing"
                @click.native.prevent="removeKey"
            >
                Remove key
            </SecondaryButton>

            <SecondaryButton
                v-show="user.klaviyo_api_key"
                class="mt-5"
                :class="{ 'opacity-25': form.processing }"
                :loading="form.processing"
                @click.native.prevent="testKey"
            >
                Test key
            </SecondaryButton>
        </template>

        <template #form>
            <!-- Name -->
            <div class="col-span-6 sm:col-span-4">
                <Label for="name" value="Klaviyo API Key" />
                <Input
                    id="name"
                    v-model="form.klaviyo_api_key"
                    type="text"
                    class="mt-1 block w-full"
                    placeholder="Example: pk_123cf41b0bb8efc1b4adb97995e43d72aa"
                />
                <InputError :message="form.errors.klaviyo_api_key" class="mt-2" />
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
import SecondaryButton from '~/components/SecondaryButton'
import Button from '~/components/Button'
import FormSection from '~/components/FormSection'
import Input from '~/components/Input'
import InputError from '~/components/InputError'
import Label from '~/components/Label'
import ActionMessage from '~/components/ActionMessage'

export default {
    components: {
        SecondaryButton,
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
                processing: false,
                klaviyo_api_key: this.user.klaviyo_api_key,
                recentlySuccessful: false,
                errors: {}
            }
        }
    },

    methods: {
        async manageKey () {
            this.form.processing = true
            this.form.errors = {}
            this.form.recentlySuccessful = false
            clearTimeout(this.recentlySuccessfulTimeoutId)

            await this.$axios.get('/sanctum/csrf-cookie').then(() => {
                this.$axios.put('/user/integrations/manage/klaviyo', { ...this.form })
                    .then((response) => {
                        this.form.recentlySuccessful = true
                        this.$auth.fetchUser()
                        this.form.processing = false
                        this.recentlySuccessfulTimeoutId = setTimeout(() => this.form.recentlySuccessful = false, 2000)
                    })
                    .catch(({ response }) => {
                        if (response) {
                            this.form.errors = response.data.errors
                        }
                        this.form.processing = false
                    })
                    .finally(() => {
                        this.form.processing = false
                    })
            })
        },
        async removeKey () {
            this.form.processing = true
            this.form.errors = {}

            await this.$axios.get('/sanctum/csrf-cookie').then(() => {
                this.$axios.delete('/user/integrations/manage/klaviyo')
                    .then((response) => {
                        this.$auth.fetchUser().then(() => {
                            this.form.klaviyo_api_key = null
                            this.form.processing = false
                            this.$toast.show({
                                type: 'success',
                                title: 'Hooray',
                                message: 'Your Klaviyo API key has been removed'
                            })
                        })
                    })
                    .catch(({ response }) => {
                        if (response) {
                            this.form.errors = response.data.errors
                        }
                        this.form.processing = false
                    })
                    .finally(() => {
                        this.form.processing = false
                    })
            })
        },
        async testKey () {
            this.form.processing = true
            this.form.errors = {}

            await this.$axios.get('/sanctum/csrf-cookie').then(() => {
                this.$axios.post('/user/integrations/manage/klaviyo/testKey', { ...this.form })
                    .then((response) => {
                        this.$auth.fetchUser().then(() => {
                            this.form.klaviyo_api_key = null
                            this.form.processing = false
                        })
                    })
                    .catch(({ response }) => {
                        if (response) {
                            this.form.errors = response.data.errors
                        }
                        this.form.processing = false
                    })
                    .finally(() => {
                        this.form.processing = false
                    })
            })
        }
    }
}
</script>
