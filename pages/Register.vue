<template>
    <section class="flex flex-col md:flex-row h-screen items-center">
        <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
            <img src="https://source.unsplash.com/random" alt="" class="w-full h-full object-cover">
        </div>

        <div
            class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center"
        >
            <div class="w-full h-100">
                <AuthenticationCardLogo />

                <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">
                    Register your account
                </h1>

                <ValidationErrors :errors="getErrors" class="mb-4" />

                <form class="mt-6" method="POST" @submit.prevent="submit">
                    <div>
                        <label class="block text-gray-700">Name</label>
                        <input
                            id="name"
                            v-model="form.name"
                            name="name"
                            type="text"
                            placeholder="Enter Names"
                            class="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            autofocus
                            autocomplete="name"
                            required
                        >
                    </div>

                    <div class="mt-4">
                        <label class="block text-gray-700">Email Address</label>
                        <input
                            id="email"
                            v-model="form.email"
                            type="email"
                            name="email"
                            placeholder="Enter Email Address"
                            class="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            autofocus
                            autocomplete
                            required
                        >
                    </div>

                    <div class="mt-4">
                        <label class="block text-gray-700">Password</label>
                        <input
                            id="password"
                            v-model="form.password"
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            minlength="6"
                            class="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                            autocomplete="new-password"
                        >
                    </div>

                    <div class="mt-4">
                        <label class="block text-gray-700">Confirm Password</label>
                        <input
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            minlength="6"
                            class="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                            autocomplete="new-password"
                        >
                    </div>

                    <div class="mt-4">
                        <Label for="terms">
                            <div class="flex items-center">
                                <Checkbox id="terms" v-model:checked="form.terms" name="terms" />

                                <div class="ml-2">
                                    I agree to the <a target="_blank" href="/terms" class="underline text-sm text-gray-600 hover:text-gray-900">Terms of Service</a> and <a target="_blank" href="/policy" class="underline text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
                                </div>
                            </div>
                        </Label>
                    </div>

                    <button
                        type="submit"
                        class="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                    >
                        Register
                    </button>
                </form>

                <hr class="my-6 border-gray-300 w-full">

                <p class="mt-8">
                    <NuxtLink
                        :to="{ name: 'login' }"
                        class="text-blue-500 hover:text-blue-700 font-semibold"
                    >
                        Already registered?
                    </NuxtLink>
                </p>
            </div>
        </div>
    </section>
</template>

<router>
{
  path: "/register",
  name: "register"
}
</router>

<script>
import AuthenticationCardLogo from '~/components/AuthenticationCardLogo'
import Checkbox from '~/components/Checkbox'
import Label from '~/components/Label'
import ValidationErrors from '~/components/ValidationErrors'

export default {
    components: {
        AuthenticationCardLogo,
        Checkbox,
        Label,
        ValidationErrors
    },

    layout: 'auth',
    auth: 'guest',

    data () {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                terms: false,
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
                this.$axios.post('/register', { ...this.form })
                    .then((response) => {
                        this.$auth.setStrategy('laravelSanctum').then(() => {
                            this.$auth.setUserToken(true).then(() => {
                                this.$router.push({
                                    name: 'Home'
                                })
                            })
                        })
                    })
                    .catch(({ response }) => {
                        if (response) {
                            this.errors = response.data.errors
                        }
                    })
                    .finally(() => {
                        this.form.processing = false
                        this.form.password = ''
                        this.form.password_confirmation = ''
                    })
            })
        }
    }
}
</script>
