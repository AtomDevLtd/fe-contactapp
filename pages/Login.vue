<template>
    <section class="flex flex-col md:flex-row h-screen items-center">
        <div class="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
            <img src="https://source.unsplash.com/random" alt="" class="w-full h-full object-cover">
        </div>

        <div
            class="
                bg-white
                w-full
                md:max-w-md
                lg:max-w-full
                md:mx-auto
                md:mx-0 md:w-1/2
                xl:w-1/3 h-screen
                px-6 lg:px-16
                xl:px-12
                flex items-center
                justify-center
            "
        >
            <div class="w-full h-100">
                <AuthenticationCardLogo />

                <h1 class="text-xl md:text-2xl font-bold leading-tight mt-12">
                    Log in to your account
                </h1>

                <ValidationErrors :errors="getErrors" class="mb-4" />

                <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
                    {{ status }}
                </div>

                <form class="mt-6" method="POST" @submit.prevent="submit">
                    <div>
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
                        <label class="block text-gray-700">
                            Password
                            <span class="float-right">
                                <NuxtLink
                                    v-if="canResetPassword"
                                    class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                                    :to="{ name: 'forgotPassword' }"
                                >
                                    Forgot your password?
                                </NuxtLink>
                            </span>
                        </label>
                        <input
                            id="password"
                            v-model="form.password"
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            minlength="6"
                            class="w-full px-4 py-3 rounded-lg bg-gray-100 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                            required
                            autocomplete="current-password"
                        >
                    </div>

                    <div class="mt-4">
                        <Label for="remember">
                            <div class="flex items-center">
                                <Checkbox id="remember" v-model:checked="form.remember" name="remember" />

                                <div class="ml-2">
                                    Remember me
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
                        Log In
                    </button>
                </form>

                <hr class="my-6 border-gray-300 w-full">

                <p class="mt-8">
                    Need an account?
                    <NuxtLink :to="{ name: 'register' }" class="text-blue-500 hover:text-blue-700 font-semibold">
                        Create an account
                    </NuxtLink>
                </p>
            </div>
        </div>
    </section>
</template>

<router>
{
  path: "/login",
  name: "login"
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

    props: {
        status: {
            type: String,
            default: null
        }
    },

    data () {
        return {
            canResetPassword: true,
            form: {
                email: '',
                password: '',
                processing: false,
                remember: false
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

            await this.$auth.loginWith('laravelSanctum', { data: this.form })
                .then((response) => {
                    this.$router.push({
                        name: 'Home'
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
                })
        }
    }
}
</script>
